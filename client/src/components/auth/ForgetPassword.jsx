import React from "react";
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

const Register1 = () => {
  const theme = useTheme();
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
            Dont worry we got you covered with our easy account recovery
            options.
          </Typography>

          <TextField fullWidth type="email" label="Email" variant="outlined" />

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
            Submit
          </Button>

          <Divider sx={{ my: 0.5, color: "#94a3b8", fontSize: 12 }}>or</Divider>

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

export default Register1;
