import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Chip, { type ChipProps } from "@mui/material/Chip";
import { alpha, type Theme } from "@mui/material/styles";

type Accent = { main: string; light: string; dark: string };

function toneFrom(theme: Theme, color: ChipProps["color"]): Accent {
  if (color && color !== "default") {
    const palette = theme.palette[color];
    if (
      palette &&
      typeof palette === "object" &&
      "main" in palette &&
      "light" in palette &&
      "dark" in palette
    ) {
      return palette;
    }
  }
  return theme.palette.primary;
}

const lift = "220ms cubic-bezier(0.22, 1, 0.36, 1)";

function glassStyles(theme: Theme, tone: Accent, glow: boolean, small: boolean) {
  const glowShadow = `0 4px 10px ${alpha(tone.main, 0.22)}`;
  const hoverGlow = `0 6px 14px ${alpha(tone.main, 0.32)}`;

  return {
    overflow: "visible",
    width: "fit-content",
    maxWidth: "100%",
    height: "auto",
    alignItems: "center",
    borderRadius: 999,
    border: "1px solid rgba(255, 255, 255, 0.22)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: theme.palette.parchment.main,
    boxShadow: glow ? glowShadow : "none",
    paddingLeft: "5px",
    transition: `transform ${lift}, box-shadow ${lift}, border-color ${lift}, background-color ${lift}`,
    "& .MuiChip-icon": {
      marginLeft: "2px",
      marginRight: "6px",
      width: 24,
      height: 24,
      minWidth: 24,
      color: "#fff",
      overflow: "visible",
    },
    "& .MuiChip-icon svg": {
      width: 14,
      height: 14,
      display: "block",
      overflow: "visible",
    },
    "& .MuiChip-label": {
      color: "inherit",
      paddingLeft: "8px",
      paddingRight: small ? "10px" : "12px",
      paddingBlock: small ? "5px" : "7px",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.92)",
      transform: "translateY(-2px)",
      boxShadow: glow ? hoverGlow : "0 8px 16px rgba(0, 0, 0, 0.28)",
    },
    "&:active": {
      transform: "translateY(0)",
      transitionDuration: "80ms",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      "&:hover, &:active": {
        transform: "none",
      },
    },
  };
}

function AccentIcon({
  color,
  className,
  children,
}: {
  color: ChipProps["color"];
  className?: string;
  children: ReactNode;
}) {
  return (
    <Box
      component="span"
      className={className}
      sx={(theme) => {
        const tone = toneFrom(theme, color);
        return {
          width: 24,
          height: 24,
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          bgcolor: tone.main,
          color: "#fff",
          overflow: "visible",
        };
      }}
    >
      {children}
    </Box>
  );
}

export type SoftChipProps = ChipProps & {
  glow?: boolean;
};

export default function SoftChip({
  glow = false,
  color = "primary",
  size = "medium",
  icon,
  sx,
  ...props
}: SoftChipProps) {
  return (
    <Chip
      color={color}
      size={size}
      icon={icon ? <AccentIcon color={color}>{icon}</AccentIcon> : undefined}
      sx={[
        (theme) => ({
          "&&": glassStyles(theme, toneFrom(theme, color), glow, size === "small"),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
}
