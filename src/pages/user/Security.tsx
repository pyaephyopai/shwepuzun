import { Paper, Typography } from "@mui/material";
import NormalButton from "../../components/button/NormalButton";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 1.5,
      }}
    >
      <Typography component="h2" variant="h4" marginBottom={2}>
        Password
      </Typography>
      <NormalButton
        type="contained"
        text="Change Password"
        sx={{
          textTransform: "Capitalize",
        }}
        onClick={() => navigate("/settings/security/change-password")}
      />
    </Paper>
  );
};

export default Security;
