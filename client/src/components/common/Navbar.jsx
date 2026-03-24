import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { assets } from "../../assets/assets";
import { navLinks, userSettings } from "../../utility/constants/nav";
import { Link } from "react-router-dom";
import { selectIsAuthenticated } from "../../app/slices/auth.slice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/slices/auth.slice";

function Navbar() {
  const appTheme = useTheme();
  const navigate = useNavigate();
  const dispatchToRedux = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: appTheme.palette.background.gray,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={assets.Logo} alt="Trip to heaven Logo" width={100} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: "#FFFFFF" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiMenu-paper": {
                  backgroundColor: appTheme.palette.background.paper,
                  boxShadow: appTheme.shadows[3],
                },
              }}
            >
              {navLinks?.map((page) => {
                const IconComponent = page.icon;
                return (
                  <MenuItem
                    key={page.name}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.path);
                    }}
                    sx={{
                      padding: "16px 20px",
                      "&:hover": {
                        backgroundColor: appTheme.palette.action.hover,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 24,
                          color: appTheme.palette.primary.main,
                        }}
                      />
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: appTheme.palette.text.primary,
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {page.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#FFFFFF",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            <Avatar alt="Trip to heaven Logo" src={assets.Logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              justifyContent: "center",
            }}
          >
            {navLinks?.map((page) => {
              const IconComponent = page.icon;
              return (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.3,
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "none",
                    padding: "8px 12px",
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "#FFFFFF",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <IconComponent sx={{ fontSize: 28 }} />
                  <span>{page.name}</span>
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isAuthenticated ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: appTheme.palette.text.default }}>
                    Login
                  </Button>
                </Link>
              )}
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                "& .MuiMenu-paper": {
                  backgroundColor: appTheme.palette.background.paper,
                  boxShadow: appTheme.shadows[3],
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings?.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting.name.toLowerCase() === "logout") {
                      dispatchToRedux(logout());
                      navigate("/");
                    } else {
                      navigate(setting.path);
                    }
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: appTheme.palette.action.hover,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: appTheme.palette.text.primary,
                      fontWeight: 500,
                    }}
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
