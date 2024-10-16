import { Link, useNavigate } from "react-router-dom";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";

import {
  AccountCircle,
  Dashboard,
  HomeRounded,
  LocalMallRounded,
  LogoutRounded,
  SettingsRounded,
  SvgIconComponent,
} from "@mui/icons-material";

import { userStore } from "../../store/userStore";
import { useProductCartStore } from "../../store/productCartStore";

type ProfileMenuProps = {
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
};

type MenuList = {
  id: number;
  title: string;
  icon: SvgIconComponent;
  link: string;
};

const ProfileMenu = ({ anchorEl, handleMenuClose }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const { logInUser, logOut, role, userData } = userStore();

  const { setProduct } = useProductCartStore();

  const path = location.pathname.split(/\//g);

  const menuList: MenuList[] = [
    {
      id: 1,
      title: "Profile",
      icon: AccountCircle,
      link: `/profile/${userData?.id}`,
    },
    {
      id: 2,
      title: "Order",
      icon: LocalMallRounded,
      link: "/orders",
    },
    {
      id: 3,
      title: "Settings",
      icon: SettingsRounded,
      link: "/settings/security",
    },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {logInUser && !path.includes("dashboard") && role === "Admin" ? (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <ListItemIcon>
              <Dashboard
                sx={{
                  minWidth: "40px",
                  fontSize: "27px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Admin Dashboard" />
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <HomeRounded
                sx={{
                  minWidth: "40px",
                  fontSize: "27px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Go Home Page" />
          </ListItemButton>
        </ListItem>
      )}

      {menuList.map((list) => (
        <Link key={list.id} to={list.link}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <list.icon
                  sx={{
                    minWidth: "40px",
                    fontSize: "27px",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={list.title} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            handleMenuClose();
            logOut();
            navigate("/");
            setProduct([], new Date().getTime());
          }}
        >
          <ListItemIcon>
            <LogoutRounded
              sx={{
                minWidth: "40px",
                fontSize: "27px",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </ListItem>
    </Menu>
  );
};

export default ProfileMenu;
