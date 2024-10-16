import Router from "./router/Router";
import Loading from "./components/loading/Loading";
import AlertBox from "./components/alertBox/AlertBox";
import DeleteModalBox from "./components/modalBox/DeleteModalBox";

import { deleteModalStore } from "./store/deleteModalStore";
import { Box } from "@mui/material";

const GlobalComponents = () => {
  const { open } = deleteModalStore();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
        }}
      >
        <Router />
        <AlertBox />
        <Loading />
        {open && <DeleteModalBox />}
      </Box>
    </>
  );
};

export default GlobalComponents;
