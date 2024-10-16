import {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  ReactNode,
  useState,
} from "react";

import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";

import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import RequiredStar from "./RequiredStar";

type IconFormInputPasswordProps = {
  name: string;
  label: string;
  required: boolean;
  icon: ReactNode;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touch?: boolean;
  sx?: CSSProperties;
};

const IconFormInputPassword = ({
  name,
  label,
  required = false,
  icon,
  onBlur,
  onChange,
  error,
  touch,
  sx,
}: IconFormInputPasswordProps) => {
  const [show, setShow] = useState(false);

  return (
    <FormControl fullWidth>
      <TextField
        variant="outlined"
        id={name}
        type={show ? "text" : "password"}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused.Mui-error fieldset": {
              borderColor: "error",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#8B4513",
            },
          },

          ".MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
            color: "#000",
          },
          ...sx,
        }}
        label={
          <>
            {label}
            {required && <RequiredStar />}
          </>
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
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
    </FormControl>
  );
};

export default IconFormInputPassword;
