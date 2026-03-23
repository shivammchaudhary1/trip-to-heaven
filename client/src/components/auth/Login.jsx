import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  useTheme,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { notify } from "../../app/slices/notify.slice";

const Login = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = { email, password };
    console.log("Login Form Data:", formData);

    setIsLoading(true);
    dispatch(
      notify({ type: "info", message: "Form submitted - check console" }),
    );

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            p: 4,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.main}15 100%)`,
          }}
        >
          {/* Header */}
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1,
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Link
                href="/register"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create one
              </Link>
            </Typography>
          </Stack>

          {/* Form */}
          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              {/* Email */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              {/* Forgot Password Link */}
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Link
                  href="/forgot-password"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                onClick={onSubmit}
                sx={{
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, #0891B2)`,
                  "&:hover": {
                    background: `linear-gradient(45deg, #06B6D4, #0891B2)`,
                  },
                  "&:disabled": {
                    background: theme.palette.action.disabledBackground,
                  },
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    <span style={{ marginLeft: "8px" }}>Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
