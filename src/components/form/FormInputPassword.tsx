import { ChangeEvent, CSSProperties, FocusEvent, useState } from "react";

import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";

import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";

import RequiredStar from "./RequiredStar";

type FormInputPasswordProps = {
  name: string;
  label: string;
  required: boolean;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touch?: boolean;
  sx?: CSSProperties;
};

const FormInputPassword = ({
  name,
  label,
  required = false,
  onBlur,
  onChange,
  error,
  touch,
  sx,
}: FormInputPasswordProps) => {
  const [show, setShow] = useState(false);

  return (
    <Box>
      <InputLabel className="mb-1">
        {label}
        {required && <RequiredStar />}
      </InputLabel>
      <TextField
        variant="outlined"
        id={name}
        size="small"
        color="secondary"
        type={show ? "text" : "password"}
        sx={{
          width: "100%",
          ...sx,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOffRounded /> : <VisibilityRounded />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        autoComplete="off"
        name={name}
        placeholder={`Enter your ${label}`}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error && touch}
        helperText={touch && error ? error : ""}
      />
    </Box>
  );
};

export default FormInputPassword;
