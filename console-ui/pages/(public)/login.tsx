import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Activity, Eye, EyeOff, Flame, Footprints } from "lucide-react";
import SoftButton from "@/components/ui/SoftButton";
import SoftChip from "@/components/ui/SoftChip";

const week = [
  { label: "Mon", value: 46 },
  { label: "Tue", value: 62 },
  { label: "Wed", value: 54 },
  { label: "Thu", value: 78 },
  { label: "Fri", value: 96 },
  { label: "Sat", value: 70 },
  { label: "Sun", value: 40 },
];

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const started = Date.now();
    const minimumVisibleMs = 700;

    const finish = () => {
      const wait = Math.max(0, minimumVisibleMs - (Date.now() - started));
      window.setTimeout(() => {
        if (active) setLoading(false);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      active = false;
      window.removeEventListener("load", finish);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email";
    }

    if (!password) {
      nextErrors.password = "Enter your password";
    } else if (password.length < 8) {
      nextErrors.password = "Use at least 8 characters";
    }

    setErrors(nextErrors);
  }

  return (
    <>
      <Head>
        <title>Sign in · Fitnexa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {loading ? (
        <Box
          className="position-fixed top-0 start-0 d-flex align-items-center justify-content-center"
          role="status"
          aria-live="polite"
          aria-label="Loading FitNexa"
          sx={{
            zIndex: 2000,
            width: "100vw",
            height: "100vh",
            bgcolor: "shadowGrey.dark",
          }}
        >
          <Box
            component="img"
            src="/loader/loader.gif"
            alt=""
            sx={{ width: 112, height: 112 }}
          />
        </Box>
      ) : null}

      <Box
        className="min-vh-100"
        sx={{
          bgcolor: "shadowGrey.dark",
          color: "parchment.main",
        }}
      >
        <Grid container className="min-vh-100">
          <Grid
            size={{ xs: 12, lg: 7 }}
            className="flex-column justify-content-between position-relative overflow-hidden p-4 p-xl-5"
            sx={{ minWidth: 0, display: { xs: "none", lg: "flex" } }}
          >
            <Box
              className="position-absolute rounded-circle"
              sx={{
                width: 340,
                height: 340,
                top: -120,
                left: -40,
                bgcolor: "shamrock.main",
                opacity: 0.22,
                filter: "blur(28px)",
                pointerEvents: "none",
              }}
            />

            <Box className="d-flex align-items-center justify-content-between gap-3 position-relative">
              <BrandMark />
              <SoftChip label="Gym console" color="primary" size="small" glow />
            </Box>

            <Box className="position-relative py-3 w-100" sx={{ maxWidth: "100%" }}>
              <Typography variant="overline" sx={{ color: "shamrock.light" }}>
                Today at the gym
              </Typography>
              <Typography variant="h1" className="mt-2 mb-3">
                See the floor, the members, and the week in one place.
              </Typography>
              <Typography variant="body" sx={{ color: "parchment.dark", maxWidth: 520 }}>
                Sign in to check classes, attendance, and how the gym is moving today.
              </Typography>

              <Grid container spacing={2} className="mt-2">
                <Grid size={{ xs: 12, md: 7 }}>
                  <Paper
                    className="p-3 p-xl-4 h-100"
                    elevation={0}
                    sx={{
                      bgcolor: "shadowGrey.light",
                      color: "parchment.main",
                      border: "1px solid rgba(242, 237, 235, 0.08)",
                    }}
                  >
                    <Box className="d-flex align-items-center justify-content-between gap-2 mb-3">
                      <Typography variant="subtitle1">Weekly activity</Typography>
                      <SoftChip label="+12%" color="primary" size="small" glow />
                    </Box>
                    <Box className="d-flex align-items-end justify-content-between gap-2" sx={{ height: 120 }}>
                      {week.map((day) => (
                        <Box key={day.label} className="d-flex flex-column align-items-center gap-2 h-100">
                          <Box className="d-flex align-items-end justify-content-center flex-fill">
                            <Box
                              className="rounded-pill"
                              sx={{
                                width: 14,
                                height: `${day.value}%`,
                                bgcolor: day.value > 90 ? "shamrock.main" : "rgba(242, 237, 235, 0.16)",
                              }}
                            />
                          </Box>
                          <Typography variant="caption" sx={{ color: "parchment.dark" }}>
                            {day.label}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                  <Box className="d-flex flex-column gap-3 h-100">
                    <StatCard
                      icon={<Activity size={18} />}
                      label="Active min"
                      value="45"
                      meter={75}
                    />
                    <Box className="d-flex gap-3">
                      <MiniStat icon={<Flame size={16} />} label="Calories" value="1,258" />
                      <MiniStat icon={<Footprints size={16} />} label="Daily steps" value="8,432" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box className="d-flex flex-wrap align-items-center gap-2 position-relative">
              <SoftChip label="Members" />
              <SoftChip label="Classes" />
              <SoftChip label="Trainers" />
              <SoftChip icon={<BarbellIcon />} label="Floor is open" color="primary" glow />
            </Box>
          </Grid>

          <Grid
            size={{ xs: 12, lg: 5 }}
            className="d-flex align-items-center justify-content-center p-3 p-md-4 p-lg-5"
            sx={{ minWidth: 0 }}
          >
            <Box className="w-100" sx={{ maxWidth: 460 }}>
              <Box
                className="align-items-center justify-content-between gap-2 mb-3"
                sx={{ display: { xs: "flex", lg: "none" } }}
              >
                <BrandMark />
                <SoftChip label="Gym console" color="primary" size="small" glow />
              </Box>

              <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={0}
                className="p-3 p-sm-4 p-md-5"
                sx={{
                  bgcolor: "shadowGrey.light",
                  color: "parchment.main",
                  border: "1px solid rgba(242, 237, 235, 0.08)",
                  "& .MuiInputLabel-root": { color: "rgba(242, 237, 235, 0.72)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "shamrock.light" },
                  "& .MuiOutlinedInput-root": {
                    color: "parchment.main",
                    backgroundColor: "rgba(242, 237, 235, 0.04)",
                    "& fieldset": { borderColor: "rgba(242, 237, 235, 0.16)" },
                    "&:hover fieldset": { borderColor: "rgba(22, 152, 115, 0.85)" },
                    "&.Mui-focused fieldset": { borderColor: "shamrock.main" },
                  },
                  "& .MuiFormHelperText-root": { color: "rgba(242, 237, 235, 0.62)" },
                  "& .MuiFormHelperText-root.Mui-error": { color: "#ff8d8d" },
                  "& .MuiCheckbox-root": { color: "rgba(242, 237, 235, 0.7)" },
                  "& .MuiFormControlLabel-label": { color: "parchment.main" },
                }}
              >
                <Typography variant="h3" className="mb-1">
                  Welcome back
                </Typography>
                <Typography variant="body2" className="mb-4" sx={{ color: "parchment.dark" }}>
                  Sign in to the Fitnexa console.
                </Typography>

                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email || " "}
                  fullWidth
                  className="mb-1"
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password || " "}
                  fullWidth
                  className="mb-1"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword((current) => !current)}
                            edge="end"
                            sx={{ color: "parchment.main" }}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Box className="d-flex align-items-center justify-content-between gap-2 mb-3">
                  <FormControlLabel
                    className="m-0"
                    control={
                      <Checkbox
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body2">Remember me</Typography>}
                  />
                  <Link
                    component={NextLink}
                    href="/(public)/forgot-password"
                    underline="hover"
                    variant="subtitle2"
                    sx={{ color: "shamrock.light" }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <SoftButton type="submit" color="primary" size="large" fullWidth glow className="py-2">
                  Sign in
                </SoftButton>

                <Typography variant="body2" className="text-center mt-4 mb-0">
                  New to Fitnexa?{" "}
                  <Link
                    component={NextLink}
                    href="/(public)/register"
                    underline="hover"
                    sx={{ color: "shamrock.light", fontWeight: 700 }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </Paper>

              <Box className="gap-2 mt-3" sx={{ display: { xs: "flex", lg: "none" } }}>
                <MiniStat icon={<Activity size={16} />} label="Active min" value="45" />
                <MiniStat icon={<Flame size={16} />} label="Calories" value="1,258" />
                <MiniStat icon={<Footprints size={16} />} label="Steps" value="8,432" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

function BarbellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 8.5v7M3.5 10v4M17.5 8.5v7M20.5 10v4M6.5 12h11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrandMark() {
  return (
    <Image
      src="/logo/logo-fit-nexa-dark.png"
      alt="FitNexa"
      width={2400}
      height={980}
      priority
      style={{ height: 60, width: "auto" }}
    />
  );
}

function StatCard({
  icon,
  label,
  value,
  meter,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  meter: number;
}) {
  return (
    <Paper
      className="p-3 d-flex align-items-center gap-3"
      elevation={0}
      sx={{
        bgcolor: "shadowGrey.light",
        color: "parchment.main",
        border: "1px solid rgba(242, 237, 235, 0.08)",
      }}
    >
      <Box className="position-relative d-flex align-items-center justify-content-center">
        <CircularProgress
          variant="determinate"
          value={100}
          size={72}
          thickness={4}
          sx={{ color: "rgba(242, 237, 235, 0.12)", position: "absolute" }}
        />
        <CircularProgress
          variant="determinate"
          value={meter}
          size={72}
          thickness={4}
          sx={{ color: "shamrock.main" }}
        />
        <Typography variant="subtitle2" className="position-absolute">
          {value}
        </Typography>
      </Box>
      <Box>
        <Box className="d-flex align-items-center gap-2 mb-1" sx={{ color: "shamrock.light" }}>
          {icon}
          <Typography variant="caption">{label}</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "parchment.dark" }}>
          On pace for today
        </Typography>
      </Box>
    </Paper>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Paper
      className="p-3 flex-fill"
      elevation={0}
      sx={{
        bgcolor: "shadowGrey.light",
        color: "parchment.main",
        border: "1px solid rgba(242, 237, 235, 0.08)",
      }}
    >
      <Box className="d-flex align-items-center gap-2 mb-2" sx={{ color: "shamrock.light" }}>
        {icon}
        <Typography variant="caption">{label}</Typography>
      </Box>
      <Typography variant="h5">{value}</Typography>
    </Paper>
  );
}
