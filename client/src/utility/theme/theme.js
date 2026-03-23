import { createTheme } from "@mui/material/styles";
import typography from "./typography";

const theme = createTheme({
  typography,
  palette: {
    mode: "light",
    primary: {
      main: "#0EA5E9", // sky blue (travel vibe)
    },
    secondary: {
      main: "#14B8A6", // teal (nature feel)
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
      gray: "#808080",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
      default: "#F8FAFC",
    },
    divider: "#E2E8F0",
    action: {
      hover: "#F1F5F9",
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 8,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #0EA5E9, #0284C7)",
          color: "#fff",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#0F172A",
          boxShadow: "none",
          borderBottom: "1px solid #eee",
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

export default theme;
