import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../app/slices/notify.slice";
import {
  registerUser,
  selectIsAuthenticated,
} from "../../app/slices/auth.slice";

const Register = () => {
  const theme = useTheme();
  const dispatchToRedux = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  console.log("selectIsAuthenticated", isAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., API call)

    if (!registerData.firstName || !registerData.lastName) {
      dispatchToRedux(
        notify({
          type: "warning",
          message: "Please Enter Your First Name and Last Name",
        }),
      );
    } else if (!registerData.email) {
      dispatchToRedux(
        notify({
          type: "warning",
          message: "Please Enter Your Email",
        }),
      );
    } else if (!registerData.password) {
      dispatchToRedux(
        notify({
          type: "warning",
          message: "Please Enter Your Password",
        }),
      );
    }

    let userData = {
      name: `${registerData.firstName} ${registerData.lastName}`,
      email: registerData.email,
      password: registerData.password,
    };

    try {
      dispatchToRedux(registerUser(userData));
      dispatchToRedux(
        notify({
          type: "success",
          message: "Registration successful!",
        }),
      );
      // Optionally, you can reset the form here
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      dispatchToRedux(
        notify({
          type: "failure",
          message: error?.message || "Registration failed",
        }),
      );

      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f3f6fb",
      }}
    >
      <Box
        sx={{
          width: { xs: "0%", md: "50%" },
          display: { xs: "none", md: "block" },
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${assets.backgroundAuthImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100%",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 48,
            right: 48,
            bottom: 64,
            color: "#ffffff",
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.h2.fontSize,
              fontWeight: theme.typography.h2.fontWeight,
              lineHeight: 1.2,
              color: theme.palette.text.default,
            }}
          >
            "Every journey begins with one confident step."
          </Typography>
          <Typography
            sx={{
              mt: 2,
              opacity: 0.85,
              fontSize: theme.typography.body1.fontSize,
              color: theme.palette.text.default,
            }}
          >
            Create your account and start planning your next unforgettable trip.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 3, sm: 5, md: 7 },
          position: "relative",
          bgcolor: "#ffffff",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ position: "absolute", top: 28, right: { xs: 24, sm: 32 } }}
        >
          <Link to="/">
            <Box
              component="img"
              src={assets.Logo}
              alt="Trip To Heaven"
              sx={{
                width: 100,
                height: 100,
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Link>
        </Stack>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 430,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{ color: "#0f172a", fontSize: "2rem", fontWeight: 700 }}
          >
            Get Ready To Fly
          </Typography>
          <Typography sx={{ color: "#64748b", mb: 1 }}>
            Join now and unlock seamless bookings for flights, hotels, and
            buses.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={registerData.firstName}
              onChange={(e) =>
                setRegisterData({ ...registerData, firstName: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={registerData.lastName}
              onChange={(e) =>
                setRegisterData({ ...registerData, lastName: e.target.value })
              }
            />
          </Stack>

          <TextField
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              py: 1.2,
              bgcolor: "#0f172a",
              "&:hover": { bgcolor: "#1e293b" },
            }}
          >
            Register
          </Button>

          <Divider sx={{ my: 0.5, color: "#94a3b8", fontSize: 12 }}>or</Divider>
          <Button
            variant="outlined"
            size="large"
            sx={{
              mt: 1,
              textTransform: "none",
              borderColor: "#d1d5db",
              color: "#111827",
              fontWeight: 600,
              py: 1.2,
            }}
          >
            Register with Google
          </Button>
          <Box sx={{ textAlign: "right" }}>
            <Typography>
              Already have an account?
              <Link
                to="/login"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: theme.typography.h2.fontWeight,
                }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
