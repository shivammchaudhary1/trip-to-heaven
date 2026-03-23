import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import BedIcon from "@mui/icons-material/Bed";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DirectionsTransitFilledIcon from "@mui/icons-material/DirectionsTransitFilled";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SailingIcon from "@mui/icons-material/Sailing";
import ContactsIcon from "@mui/icons-material/Contacts";

export const navLinks = [
  { name: "Flights", path: "/flights", icon: AirplanemodeActiveIcon },
  { name: "Hotels", path: "/hotels", icon: BedIcon },
  { name: "Packages", path: "/car-rentals", icon: Inventory2Icon },
  { name: "Cruises", path: "/cruises", icon: SailingIcon },
  { name: "Trains", path: "/trains", icon: DirectionsTransitFilledIcon },
  { name: "Bus", path: "/bus", icon: DirectionsBusIcon },
  { name: "Contact Us", path: "/contact", icon: ContactsIcon },
];

export const userSettings = [
  { name: "Profile", path: "/profile" },
  //   { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "/logout" },
  //   { name: "Login", path: "/login" },
];
