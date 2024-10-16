import { cloneElement, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";

import { ShoppingCartRounded, MenuRounded } from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  Stack,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  useScrollTrigger,
} from "@mui/material";

import { logo } from "../utils/image";
import { userStore } from "../store/userStore";
import ContainerWrapper from "./wrapper/ContainerWrapper";
import ProfileMenu from "../components/navbar/ProfileMenu";
import UserSideBar from "../components/navbar/UserSideBar";
import { useProductCartStore } from "../store/productCartStore";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

export const ElevationScroll = (props: Props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const Navbar = () => {
  const { logInUser, userData } = userStore();
  const { products } = useProductCartStore();

  const [profileMenuOpen, setProfileMenuOpen] = useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleMenuClose = () => {
    setProfileMenuOpen(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <ElevationScroll>
        <AppBar
          sx={{
            bgcolor: "primary.main",
            color: "#000",
            zIndex: "50",
          }}
        >
          <ContainerWrapper
            component="section"
            sx={{
              paddingY: "5px",
            }}
          >
            <Toolbar disableGutters>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
              >
                <MenuRounded />
              </IconButton>
              <Link to="/">
                <Box
                  display="flex"
                  gap="5px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    src={logo.logo5}
                    alt="This is Logo Image"
                    sx={{
                      height: "50px",
                    }}
                  />
                  <Stack>
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
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ fontSize: "14px" }}
                    >
                      Cafeteria and Bakery House
                    </Typography>
                  </Stack>
                </Box>
              </Link>

              <Box sx={{ flexGrow: 1 }} />
              {logInUser ? (
                <>
                  <Box>
                    <Link to="/add-to-cart">
                      <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                      >
                        <Badge badgeContent={products.length} color="error">
                          <ShoppingCartRounded id="cart-icon" />
                        </Badge>
                      </IconButton>
                    </Link>
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
                  </Box>
                </>
              ) : (
                <Stack direction="row" gap="5px">
                  <Link to="/login">
                    <Button
                      variant="contained"
                      sx={{
                        color: "#fff",
                        bgcolor: "#3a506b",

                        letterSpacing: "1px",
                        textTransform: "capitalize",
                        fontFamily: "Roboto Slab",
                        display: {
                          smx: "block",
                          xs: "none",
                        },
                      }}
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="contained"
                      sx={{
                        color: "#fff",
                        bgcolor: "#3a506b",

                        letterSpacing: "1px",
                        textTransform: "capitalize",
                        fontFamily: "Roboto Slab",
                        display: {
                          sm: "block",
                          xs: "none",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                </Stack>
              )}
            </Toolbar>
          </ContainerWrapper>
        </AppBar>
      </ElevationScroll>

      <ProfileMenu
        anchorEl={profileMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <UserSideBar setOpen={setOpen} />
      </Drawer>
    </Box>
  );
};

export default Navbar;
