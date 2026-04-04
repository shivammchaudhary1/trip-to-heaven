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
import { loginUser } from "../../app/slices/auth.slice";

const Login = () => {
  const dispatchToRedux = useDispatch();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password };
    console.log("Login Form Data:", formData);

    setIsLoading(true);

    try {
      // loginUser returns a promise, so we need to await it
      const result = await dispatchToRedux(loginUser(formData));

      // Check if login was successful
      if (result.payload) {
        dispatchToRedux(
          notify({ type: "success", message: "Login successful!" }),
        );
        // Reset form
        setEmail("");
        setPassword("");
        // Redirect can be done here or in a useEffect watching isAuthenticated
      } else if (result.error) {
        dispatchToRedux(
          notify({
            type: "failure",
            message: result.error.message || "Login failed",
          }),
        );
      }
    } catch (error) {
      dispatchToRedux(
        notify({
          type: "failure",
          message: error?.message || "Login failed - check console",
        }),
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
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
