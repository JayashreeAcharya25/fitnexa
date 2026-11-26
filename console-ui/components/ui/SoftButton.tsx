import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button, { type ButtonProps } from "@mui/material/Button";
import { alpha, type Theme } from "@mui/material/styles";

type Accent = { main: string; light: string; dark: string };

function toneFrom(theme: Theme, color: ButtonProps["color"]): Accent {
  if (color && color !== "inherit") {
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

function glassStyles(theme: Theme, tone: Accent, glow: boolean) {
  const glowShadow = `0 6px 28px ${alpha(tone.main, 0.55)}, 0 4px 6px ${alpha(tone.light, 0.4)}`;
  const hoverGlow = `0 18px 36px ${alpha(tone.main, 0.72)}, 0 0 20px ${alpha(tone.light, 0.5)}`;

  return {
    position: "relative",
    overflow: "visible",
    isolation: "isolate",
    borderRadius: 999,
    border: "1px solid rgba(255, 255, 255, 0.52)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    backgroundImage: "none",
    color: theme.palette.parchment.main,
    boxShadow: glow ? glowShadow : "none",
    transition: `transform ${lift}, box-shadow ${lift}, border-color ${lift}, background-color ${lift}`,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backgroundImage: "none",
      borderColor: "rgba(255, 255, 255, 0.92)",
      color: theme.palette.parchment.main,
      transform: "translateY(-3px)",
      boxShadow: glow ? hoverGlow : "0 10px 20px rgba(0, 0, 0, 0.28)",
    },
    "&:active": {
      transform: "translateY(-1px)",
      transitionDuration: "80ms",
    },
    "&.Mui-disabled": {
      transform: "none",
      boxShadow: "none",
      color: "rgba(242, 237, 235, 0.4)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      "&:hover, &:active": {
        transform: "none",
      },
    },
  };
}

export type SoftButtonProps = ButtonProps & {
  glow?: boolean;
  icon?: ReactNode;
};

export default function SoftButton({
  glow = false,
  icon,
  color = "primary",
  variant = "text",
  disableElevation = true,
  sx,
  startIcon,
  ...props
}: SoftButtonProps) {
  return (
    <Button
      variant={variant}
      disableElevation={disableElevation}
      color={color}
      startIcon={
        icon ? (
          <Box
            component="span"
            sx={(theme) => ({
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: toneFrom(theme, color).main,
              color: "#fff",
              boxShadow: glow ? `0 0 12px ${alpha(toneFrom(theme, color).main, 0.85)}` : "none",
            })}
          >
            {icon}
          </Box>
        ) : (
          startIcon
        )
      }
      sx={[
        (theme) => ({
          "&&": glassStyles(theme, toneFrom(theme, color), glow),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
}
