import { Link, useLocation } from "react-router-dom";

import {
  AppRegistrationRounded,
  CategoryRounded,
  ContactMail,
  EmojiFoodBeverageRounded,
  PeopleAlt,
  TaskRounded,
} from "@mui/icons-material";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { userStore } from "../../store/userStore";

type AdminSideBarProps = {
  open: boolean;
};

const AdminSideBar = ({ open }: AdminSideBarProps) => {
  const location = useLocation();

  const { role } = userStore();

  const MenuList = [
    {
      id: 1,
      text: "Users",
      link: "/dashboard/users",
      icon: PeopleAlt,
      role: ["Admin"],
    },
    {
      id: 2,
      text: "Blogs",
      link: "/dashboard/blogs",
      icon: AppRegistrationRounded,
      role: ["Admin"],
    },
    {
      id: 3,
      text: "Categories",
      link: "/dashboard/categories",
      icon: CategoryRounded,
      role: ["Admin"],
    },
    {
      id: 4,
      text: "Products",
      link: "/dashboard/products",
      icon: EmojiFoodBeverageRounded,
      role: ["Admin"],
    },
    {
      id: 5,
      text: "Orders",
      link: "/dashboard/orders",
      icon: TaskRounded,
      role: ["Admin"],
    },
    {
      id: 6,
      text: "Contacts",
      link: "/dashboard/contacts",
      icon: ContactMail,
      role: ["Admin"],
    },
  ];

  return (
    <>
      {MenuList.filter((list) => list.role.includes(role)).map((list, i) => (
        <ListItem key={i} disablePadding sx={{ display: "block" }}>
          <Link to={list.link}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,

                bgcolor:
                  list.id ===
                  MenuList.find((item) => location.pathname.includes(item.link))
                    ?.id
                    ? "tertiary.main"
                    : "transparent",

                ":hover": {
                  bgcolor: "tertiary.dark",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <list.icon />
              </ListItemIcon>
              <ListItemText
                primary={list.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </>
  );
};

export default AdminSideBar;
