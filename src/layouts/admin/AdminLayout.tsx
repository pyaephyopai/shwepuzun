import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AdminNavbar from "./AdminNavbar";
import BreadCrumbs from "../../components/breadCrumbs/BreadCrumbs";

import { SortModelProvider } from "../../context/SortModel";

const AdminLayout = () => {
  return (
    <>
      <SortModelProvider>
        <Box sx={{ display: "flex" }}>
          <AdminNavbar />
          <Box
            component="main"
            sx={{
              p: 2,
              mt: 8,
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              position: "relative",
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                outline: "none !important",
              },
              "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
                {
                  outline: "none !important",
                },

              ".MuiDataGrid-footerContainer": {
                display: "block",

                ".MuiPagination-root": {
                  ".MuiPagination-ul": {
                    justifyContent: "end",
                    flexWrap: "nowrap",
                  },
                },
              },
            }}
          >
            <BreadCrumbs />
            <Outlet />
          </Box>
        </Box>
        <ReactQueryDevtools />
      </SortModelProvider>
    </>
  );
};

export default AdminLayout;
