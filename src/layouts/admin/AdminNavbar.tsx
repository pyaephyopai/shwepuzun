import { MouseEvent, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";

import { ChevronLeft, MenuRounded } from "@mui/icons-material";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import {
  Avatar,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  Box,
} from "@mui/material";

import ProfileMenu from "../../components/navbar/ProfileMenu";
import AdminSideBar from "../../components/navbar/AdminSideBar";

import { userStore } from "../../store/userStore";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function AdminNavbar() {
  const { userData } = userStore();

  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<null | HTMLElement>(
    null
  );

  const handleMenuClose = () => {
    setProfileMenuOpen(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          zIndex: "50",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuRounded />
          </IconButton>
          <Link to="/dashboard">
            {" "}
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontFamily: "Roboto Slab",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              Shwe Pu Zun
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={(event: MouseEvent<HTMLElement>) =>
              setProfileMenuOpen(event.currentTarget)
            }
            color="inherit"
          >
            <Avatar>{userData?.name.charAt(0)}</Avatar>
          </IconButton>
        </Toolbar>
        <ProfileMenu
          anchorEl={profileMenuOpen}
          handleMenuClose={handleMenuClose}
        />
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          zIndex: "40",
        }}
      >
        <DrawerHeader>
          <Typography
            component="h1"
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: 700,
              fontFamily: "Roboto Slab",
            }}
          >
            Admin Dashboard
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <AdminSideBar open={open} />
        </List>
      </Drawer>
    </>
  );
}

export default AdminNavbar;
