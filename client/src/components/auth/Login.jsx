// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   Container,
//   Box,
//   Card,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   CircularProgress,
//   useTheme,
//   Stack,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { notify } from "../../app/slices/notify.slice";
// import { loginUser } from "../../app/slices/auth.slice";

// const Login = () => {
//   const dispatchToRedux = useDispatch();
//   const theme = useTheme();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = { email, password };
//     console.log("Login Form Data:", formData);

//     setIsLoading(true);

//     try {
//       // loginUser returns a promise, so we need to await it
//       const result = await dispatchToRedux(loginUser(formData));

//       // Check if login was successful
//       if (result.payload) {
//         dispatchToRedux(
//           notify({ type: "success", message: "Login successful!" }),
//         );
//         // Reset form
//         setEmail("");
//         setPassword("");
//         // Redirect can be done here or in a useEffect watching isAuthenticated
//       } else if (result.error) {
//         dispatchToRedux(
//           notify({
//             type: "failure",
//             message: result.error.message || "Login failed",
//           }),
//         );
//       }
//     } catch (error) {
//       dispatchToRedux(
//         notify({
//           type: "failure",
//           message: error?.message || "Login failed - check console",
//         }),
//       );
//       console.error("Login error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           py: 4,
//         }}
//       >
//         <Card
//           sx={{
//             width: "100%",
//             p: 4,
//             boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//             borderRadius: 3,
//             background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.secondary.main}15 100%)`,
//           }}
//         >
//           {/* Header */}
//           <Stack spacing={1} sx={{ mb: 4 }}>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//                 color: theme.palette.text.primary,
//                 mb: 1,
//               }}
//             >
//               Welcome Back
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Don't have an account?{" "}
//               <Link
//                 href="/register"
//                 sx={{
//                   color: theme.palette.primary.main,
//                   textDecoration: "none",
//                   fontWeight: 600,
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//               >
//                 Create one
//               </Link>
//             </Typography>
//           </Stack>

//           {/* Form */}
//           <form onSubmit={onSubmit}>
//             <Stack spacing={3}>
//               {/* Email */}
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 variant="outlined"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />

//               {/* Password */}
//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 variant="outlined"
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />

//               {/* Forgot Password Link */}
//               <Box sx={{ textAlign: "right", mt: 1 }}>
//                 <Link
//                   href="/forgot-password"
//                   sx={{
//                     color: theme.palette.primary.main,
//                     textDecoration: "none",
//                     fontSize: "14px",
//                     fontWeight: 500,
//                     "&:hover": { textDecoration: "underline" },
//                   }}
//                 >
//                   Forgot password?
//                 </Link>
//               </Box>

//               {/* Submit Button */}
//               <Button
//                 fullWidth
//                 variant="contained"
//                 size="large"
//                 disabled={isLoading}
//                 onClick={onSubmit}
//                 sx={{
//                   py: 1.5,
//                   fontSize: "16px",
//                   fontWeight: 600,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   background: `linear-gradient(45deg, ${theme.palette.secondary.main}, #0891B2)`,
//                   "&:hover": {
//                     background: `linear-gradient(45deg, #06B6D4, #0891B2)`,
//                   },
//                   "&:disabled": {
//                     background: theme.palette.action.disabledBackground,
//                   },
//                   position: "relative",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 {isLoading ? (
//                   <>
//                     <CircularProgress size={20} color="inherit" />
//                     <span style={{ marginLeft: "8px" }}>Signing in...</span>
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>
//             </Stack>
//           </form>
//         </Card>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

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
            Login and unlock seamless bookings for flights, hotels, and buses.
          </Typography>

          {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField fullWidth label="First Name" variant="outlined" />
            <TextField fullWidth label="Last Name" variant="outlined" />
          </Stack> */}

          <TextField fullWidth type="email" label="Email" variant="outlined" />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
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
            Login
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
            Login with Google
          </Button>
          <Stack sx={{ mt: 1, alignItems: "flex-end", gap: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                Don&apos;t have an account?
              </Typography>
              <Link
                to="/register"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Register
              </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                Forgot password?
              </Typography>
              <Link
                to="/forget-password"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Recover
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
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
    </Box>
  );
};

export default Register1;
