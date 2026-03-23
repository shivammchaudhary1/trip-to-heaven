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
  Grid,
  useTheme,
  Stack,
} from "@mui/material";
import { notify } from "../../app/slices/notify.slice";
import { registerUser } from "../../app/slices/auth.slice";

const Register = () => {
  const dispatchToRedux = useDispatch();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      dispatchToRedux(
        notify({ type: "failure", message: "Passwords do not match" }),
      );
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      dispatchToRedux(
        notify({ type: "failure", message: "All fields are required" }),
      );
      return;
    }

    const formData = {
      name: `${firstName} ${lastName}`,
      email,
      password,
    };

    console.log("Register Form Data:", formData);
    setIsLoading(true);

    try {
      // registerUser returns a promise, so we need to await it
      const result = await dispatchToRedux(registerUser(formData));

      // Check if registration was successful
      if (result.payload) {
        dispatchToRedux(
          notify({ type: "success", message: "Registration successful!" }),
        );
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // Redirect can be done here or in a useEffect watching isAuthenticated
      } else if (result.error) {
        dispatchToRedux(
          notify({
            type: "failure",
            message: result.error.message || "Registration failed",
          }),
        );
      }
    } catch (error) {
      dispatchToRedux(
        notify({
          type: "failure",
          message: error?.message || "Registration failed",
        }),
      );
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
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
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}15 100%)`,
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
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <Link
                href="/login"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Stack>

          {/* Form */}
          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              {/* Name fields */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>

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
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

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
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, #0284C7)`,
                  "&:hover": {
                    background: `linear-gradient(45deg, #06B6D4, #0284C7)`,
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
                    <span style={{ marginLeft: "8px" }}>Creating...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
