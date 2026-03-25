import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import TrainRoundedIcon from "@mui/icons-material/TrainRounded";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";

const serviceTabs = [
  { label: "Flight", icon: <FlightTakeoffRoundedIcon fontSize="small" /> },
  { label: "Hotel", icon: <HotelRoundedIcon fontSize="small" /> },
  { label: "Home Style", icon: <HomeWorkRoundedIcon fontSize="small" /> },
  { label: "Train", icon: <TrainRoundedIcon fontSize="small" /> },
  { label: "Bus", icon: <DirectionsBusRoundedIcon fontSize="small" /> },
  { label: "Car", icon: <DirectionsCarRoundedIcon fontSize="small" /> },
  { label: "Forex", icon: <CurrencyExchangeRoundedIcon fontSize="small" /> },
  { label: "Charter Plane", icon: <AirRoundedIcon fontSize="small" /> },
];

const fareTypes = [
  "Regular Fares",
  "Armed Forces Fares",
  "Student Fares",
  "Senior Citizen Fares",
  "Doctor & Nurse Fares",
  "Double Seat Fares",
];

const quickLinks = [
  { title: "Where2Go", icon: <TravelExploreRoundedIcon /> },
  { title: "TripMoney", icon: <CurrencyExchangeRoundedIcon /> },
  { title: "Explore International Flights", icon: <LanguageRoundedIcon /> },
  { title: "MICE", icon: <Groups2RoundedIcon /> },
  { title: "Gift Cards", icon: <CardGiftcardRoundedIcon /> },
];

const cellSx = {
  p: { xs: 1.5, md: 2 },
  borderRight: { md: "1px solid #dde1e8" },
  borderBottom: { xs: "1px solid #dde1e8", md: "none" },
};

const Home = () => {
  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "#eef1f5" }}>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #031a3f 0%, #0b3c77 56%, #1d528f 100%)",
          pt: { xs: 7, md: 9 },
          pb: { xs: 16, md: 20 },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          <Paper
            elevation={8}
            sx={{
              position: "absolute",
              top: { xs: -18, md: -28 },
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "96%", md: "88%" },
              borderRadius: 2,
              px: { xs: 1.5, md: 2.5 },
              py: 1.2,
              zIndex: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              spacing={{ xs: 1.6, md: 3 }}
              sx={{ overflowX: "auto", py: 0.2 }}
            >
              {serviceTabs.map((tab) => (
                <Stack
                  key={tab.label}
                  alignItems="center"
                  spacing={0.6}
                  sx={{ minWidth: "fit-content", color: "#1f2632" }}
                >
                  {tab.icon}
                  <Typography
                    sx={{ fontSize: { xs: 12, md: 15 }, whiteSpace: "nowrap" }}
                  >
                    {tab.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              mt: { xs: 3, md: 5 },
              borderRadius: 2,
              backgroundColor: "#f8f9fb",
              px: { xs: 2, md: 3 },
              pt: { xs: 7, md: 7.5 },
              pb: { xs: 5.5, md: 6.5 },
              position: "relative",
            }}
          >
            <Stack spacing={2.4}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={1}
              >
                <Stack direction="row" spacing={1.6} flexWrap="wrap" useFlexGap>
                  <Stack direction="row" alignItems="center" spacing={0.2}>
                    <Radio size="small" />
                    <Typography
                      sx={{ fontWeight: 700, fontSize: { xs: 14, md: 24 } }}
                    >
                      ONE WAY
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.2}>
                    <Radio size="small" checked />
                    <Typography
                      sx={{ fontWeight: 700, fontSize: { xs: 14, md: 24 } }}
                    >
                      ROUND TRIP
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.2}>
                    <Radio size="small" />
                    <Typography
                      sx={{ fontWeight: 700, fontSize: { xs: 14, md: 24 } }}
                    >
                      MULTI CITY
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  sx={{
                    fontSize: { xs: 15, md: 24 },
                    color: "#232a37",
                    fontWeight: 500,
                  }}
                >
                  Book International and Domestic Flights
                </Typography>
              </Stack>

              <Box
                sx={{
                  border: "1px solid #dde1e8",
                  bgcolor: "#ffffff",
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1.4fr 56px 1.4fr 1fr 1fr 1fr",
                  },
                }}
              >
                <Box sx={cellSx}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "#3a4658",
                    }}
                  >
                    FROM
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.6,
                      fontSize: { xs: 30, md: 40 },
                      lineHeight: 1.1,
                      fontWeight: 700,
                      color: "#1d2431",
                    }}
                  >
                    Delhi
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid #dde1e8",
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      bgcolor: "#f1f4f8",
                      border: "1px solid #d7dde7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#303a4b",
                    }}
                  >
                    <CompareArrowsRoundedIcon fontSize="small" />
                  </Box>
                </Box>

                <Box sx={cellSx}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "#3a4658",
                    }}
                  >
                    TO
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.6,
                      fontSize: { xs: 30, md: 40 },
                      lineHeight: 1.1,
                      fontWeight: 700,
                      color: "#1d2431",
                    }}
                  >
                    Bengaluru
                  </Typography>
                </Box>

                <Box sx={cellSx}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "#3a4658",
                    }}
                  >
                    DEPARTURE
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 0.8 }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: 20, md: 28 }, color: "#1f2938" }}
                    >
                      dd/mm/yyyy
                    </Typography>
                    <CalendarMonthRoundedIcon sx={{ color: "#2d3646" }} />
                  </Stack>
                </Box>

                <Box sx={cellSx}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "#3a4658",
                    }}
                  >
                    RETURN
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 0.8 }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: 20, md: 28 }, color: "#1f2938" }}
                    >
                      dd/mm/yyyy
                    </Typography>
                    <CalendarMonthRoundedIcon sx={{ color: "#2d3646" }} />
                  </Stack>
                </Box>

                <Box sx={{ p: { xs: 1.5, md: 2 } }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "#3a4658",
                    }}
                  >
                    TRAVELLERS & CLASS
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.6,
                      fontSize: { xs: 24, md: 34 },
                      lineHeight: 1.1,
                      color: "#1d2431",
                    }}
                  >
                    1
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1.2fr repeat(6, 1fr)",
                  },
                  border: "1px solid #dde1e8",
                  borderTop: "none",
                }}
              >
                <Box
                  sx={{
                    p: 1.4,
                    bgcolor: "#ffffff",
                    borderRight: { md: "1px solid #dde1e8" },
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 500, color: "#2c3443" }}
                  >
                    Select A Fare Type:
                  </Typography>
                </Box>
                {fareTypes.map((fare) => (
                  <Stack
                    key={fare}
                    direction="row"
                    alignItems="center"
                    spacing={0.3}
                    sx={{
                      p: 1,
                      bgcolor: "#f1f3f6",
                      borderLeft: { md: "1px solid #dde1e8" },
                      borderTop: { xs: "1px solid #dde1e8", md: "none" },
                    }}
                  >
                    <Radio size="small" />
                    <Typography sx={{ fontSize: 13, color: "#2f3746" }}>
                      {fare}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>

            <Button
              variant="contained"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: -20,
                height: 42,
                minWidth: 200,
                borderRadius: 999,
                textTransform: "none",
                fontSize: 20,
                fontWeight: 700,
                background: "linear-gradient(90deg, #58abf1 0%, #1f74e7 100%)",
                boxShadow: "none",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #4f9de0 0%, #1a68ce 100%)",
                  boxShadow: "none",
                },
              }}
            >
              Search
            </Button>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: { xs: -9, md: -7 }, pb: 5 }}>
        <Paper
          elevation={5}
          sx={{
            maxWidth: 1080,
            mx: "auto",
            borderRadius: 999,
            overflow: "hidden",
            bgcolor: "#fafbfc",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(5, 1fr)",
              },
            }}
          >
            {quickLinks.map((item, index) => (
              <Stack
                key={item.title}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  px: 2,
                  py: 1.3,
                  borderRight: {
                    md:
                      index !== quickLinks.length - 1
                        ? "1px solid #d8dde5"
                        : "none",
                  },
                  borderTop: {
                    xs: index > 0 ? "1px solid #e2e6ec" : "none",
                    md: "none",
                  },
                  color: "#2283ff",
                }}
              >
                {item.icon}
                <Typography sx={{ fontSize: 16, color: "#2d3544" }}>
                  {item.title}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
