import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { assets } from "../../assets/assets";

const Footer = () => {
  const footerSections = [
    {
      title: "Resources",
      links: [
        { label: "Flowbite", href: "https://flowbite.com/" },
        { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
      ],
    },
    {
      title: "Follow us",
      links: [
        { label: "Github", href: "https://github.com/themesberg/flowbite" },
        { label: "Discord", href: "https://discord.gg/4eeurUVvTy" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms & Conditions", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, href: "#", label: "Facebook page" },
    { icon: <InstagramIcon />, href: "#", label: "Instagram page" },
    { icon: <TwitterIcon />, href: "#", label: "Twitter page" },
    { icon: <LinkedInIcon />, href: "#", label: "LinkedIn page" },
    { icon: <GitHubIcon />, href: "#", label: "GitHub account" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(120deg, #f6f7f9 0%, #ecf3f2 100%)",
        borderTop: "1px solid #d9e5e2",
        py: { xs: 5, lg: 7 },
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: { xs: 4, md: 2 },
            mb: 4,
          }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                component="img"
                src={assets.Logo}
                alt="Trip to Heaven Logo"
                sx={{ height: 150, width: 150 }}
              />
              {/* <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  color: "#122620",
                }}
              >
                Trip to Heaven
              </Typography> */}
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: "#4a5a56", maxWidth: 340 }}
            >
              Thoughtfully designed UI resources for modern products and fast
              teams.
            </Typography>
          </Stack>

          <Grid container spacing={3} sx={{ maxWidth: 640 }}>
            {footerSections.map((section) => (
              <Grid size={{ xs: 6, sm: 4 }} key={section.title}>
                <Typography
                  sx={{
                    mb: 1.5,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#233934",
                  }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={1.2}>
                  {section.links.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      underline="hover"
                      color="inherit"
                      sx={{ fontWeight: 500, color: "#435753" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ borderColor: "#cfddd8", my: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#556662" }}>
            © {new Date().getFullYear()} Flowbite. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={1}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                aria-label={social.label}
                href={social.href}
                sx={{
                  color: "#2f4741",
                  border: "1px solid #cad8d4",
                  backgroundColor: "#fdfefe",
                  "&:hover": {
                    backgroundColor: "#e8f0ee",
                    color: "#18312b",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
