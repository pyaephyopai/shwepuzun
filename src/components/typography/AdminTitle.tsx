import { Typography } from "@mui/material";

type AdminTitleProps = {
  text: string;
};

const AdminTitle = ({ text }: AdminTitleProps) => {
  return (
    <Typography
      component="p"
      sx={{
        marginBottom: "20px",

        textTransform: "capitalize",
        fontFamily: "Roboto Slab",
        fontWeight: 700,
        fontSize: "28px",
      }}
    >
      {text}
    </Typography>
  );
};

export default AdminTitle;
