import { ReactNode } from "react";

import { Avatar, Box, Stack, Typography } from "@mui/material";

type ContactInfoProps = {
  icon: ReactNode;
  text: string;
};

const ContactInfo = ({ icon, text }: ContactInfoProps) => {
  return (
    <Box display="flex" gap="10px" alignItems="center" marginBottom="10px">
      <Avatar
        sx={{
          bgcolor: "#fff",
        }}
      >
        {icon}
      </Avatar>
      <Stack>
        <Typography
          variant="body2"
          component="p"
          sx={{
            fontSize: "16px",
          }}
        >
          {text}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ContactInfo;
