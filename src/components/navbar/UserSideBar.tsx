import { Link } from "react-router-dom";

import {
  AppRegistrationRounded,
  CakeRounded,
  Diversity2Rounded,
  EmojiFoodBeverageRounded,
  ForestRounded,
  HeadsetMicRounded,
  HomeRounded,
  StorefrontRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { userStore } from "../../store/userStore";

type UserSideBarProps = {
  setOpen: (open: boolean) => void;
};

const sideBarList = [
  {
    id: 1,
    title: "Home",
    icon: HomeRounded,
    link: "/",
  },
  {
    id: 2,
    title: "Products",
    icon: EmojiFoodBeverageRounded,
    link: "/products",
  },
  {
    id: 3,
    title: "Services",
    icon: CakeRounded,
    link: "/services",
  },
  {
    id: 4,
    title: "Blogs",
    icon: AppRegistrationRounded,
    link: "/blogs",
  },
  {
    id: 5,
    title: "Shops",
    icon: StorefrontRounded,
    link: "/shops",
  },
  {
    id: 6,
    title: "Contact Us",
    icon: HeadsetMicRounded,
    link: "/contact-us",
  },
  {
    id: 7,
    title: "Agricultural",
    icon: ForestRounded,
    link: "/agricultural",
  },
  {
    id: 8,
    title: "About us",
    icon: Diversity2Rounded,
    link: "/about-us",
  },
];

const UserSideBar = ({ setOpen }: UserSideBarProps) => {
  const { logInUser } = userStore();
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(!open)}>
      <List>
        {sideBarList.map((list, i) => (
          <Link key={i} to={list.link}>
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <list.icon />
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}

        {logInUser && (
          <>
            <Divider />

            <Box padding="10px">
              <Link to="/login">
                <Button
                  variant="contained"
                  color="tertiary"
                  sx={{
                    margin: "10px auto",

                    width: "100%",

                    color: "#fff",

                    letterSpacing: "1px",
                    textTransform: "capitalize",
                    fontFamily: "Roboto Slab",
                    display: {
                      smx: "none",
                      xs: "block",
                    },
                  }}
                >
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="contained"
                  color="tertiary"
                  sx={{
                    width: "100%",

                    margin: "10px auto",

                    color: "#fff",

                    letterSpacing: "1px",
                    textTransform: "capitalize",
                    fontFamily: "Roboto Slab",
                    display: {
                      sm: "none",
                      xs: "block",
                    },
                  }}
                >
                  Register
                </Button>
              </Link>
            </Box>
          </>
        )}
      </List>
    </Box>
  );
};

export default UserSideBar;
