import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { NavigateNext } from "@mui/icons-material";

import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";

const BreadCrumbs = () => {
  const location = useLocation();

  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    const pathList = location.pathname.split("/").filter(Boolean);
    setPath(pathList);
  }, [location.pathname]);

  const fontStyle = {
    fontFamily: "Roboto Slab",
    fontWeight: 700,
    fontSize: "14px",
  };

  return (
    <Box
      sx={{
        borderRadius: "8px",
      }}
    >
      <Stack spacing={2} sx={{ marginTop: "4px" }}>
        <Breadcrumbs
          className="capitalize relative"
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          {path.map((crumb, index) => {
            const link = `/${path.slice(0, index + 1).join("/")}`;

            if (index === path.length - 1 || !isNaN(parseInt(crumb))) {
              return (
                <Typography key={index} component="p" sx={fontStyle}>
                  {crumb}
                </Typography>
              );
            }

            return (
              <Link key={index} color="inherit" to={link}>
                <Typography component="p" sx={fontStyle}>
                  {crumb}
                </Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      </Stack>
    </Box>
  );
};

export default BreadCrumbs;
