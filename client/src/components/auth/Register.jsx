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
  FormHelperText,
  CircularProgress,
  Grid,
  useTheme,
  Stack,
} from "@mui/material";
import { notify } from "../../app/slices/notify.slice";

const Register = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = { firstName, lastName, email, password };
    console.log("Register Form Data:", formData);

    setIsLoading(true);
    dispatch(
      notify({ type: "info", message: "Form submitted - check console" }),
    );

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
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
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
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
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
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
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
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
