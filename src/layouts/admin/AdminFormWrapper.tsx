import { ReactNode } from "react";

import { Grid, Paper } from "@mui/material";

import AdminTitle from "../../components/typography/AdminTitle";

type AdminFormWrapperProps = {
  children: ReactNode;
  title: string;
};

const AdminFormWrapper = ({ children, title }: AdminFormWrapperProps) => {
  return (
    <>
      <AdminTitle text={title} />
      <Paper
        elevation={16}
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Grid container justifyContent="space-between">
          {children}
        </Grid>
      </Paper>
    </>
  );
};

export default AdminFormWrapper;
