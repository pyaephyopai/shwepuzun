import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

type FooterLinkProps = {
  link: string;
  text: string;
};

const FooterLink = ({ link, text }: FooterLinkProps) => {
  return (
    <Link to={link}>
      <Typography
        sx={{
          fontFamily: "Roboto Slab",
          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
    </Link>
  );
};

export default FooterLink;
