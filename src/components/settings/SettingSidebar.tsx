import { Link } from "react-router-dom";

import { SecurityRounded } from "@mui/icons-material";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const SettingSidebar = () => {
  const navbarList = [
    {
      id: 1,
      title: "Privacy & Security",
      icon: SecurityRounded,
      link: "/settings/security",
    },
  ];

  return (
    <List>
      {navbarList.map((list, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{
            display: "block",
          }}
        >
          <Link to={list.link}>
            <ListItemButton
              sx={{
                padding: "10px 8px",
              }}
            >
              <ListItemIcon
                sx={{
                  "&.MuiListItemIcon-root": {
                    minWidth: "40px",
                  },
                }}
              >
                <list.icon />
              </ListItemIcon>
              <ListItemText primary={list.title} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default SettingSidebar;
