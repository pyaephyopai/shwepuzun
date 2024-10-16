import { Box, Drawer, Paper, styled } from "@mui/material";

const drawerWidth = 210;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

import { Outlet } from "react-router-dom";
import SettingSidebar from "../components/settings/SettingSidebar";
import ContainerWrapper from "./wrapper/ContainerWrapper";

const SettingLayout = () => {
  return (
    <ContainerWrapper>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
        ></Drawer>

        <Main
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              width: "30%",
            }}
          >
            <Paper>
              <SettingSidebar />
            </Paper>
          </Box>
          <Box
            sx={{
              width: "70%",
            }}
          >
            <Outlet />
          </Box>
        </Main>
      </Box>
    </ContainerWrapper>
  );
};

export default SettingLayout;
