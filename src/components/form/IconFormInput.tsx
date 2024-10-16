import { ChangeEvent, CSSProperties, FocusEvent, ReactNode } from "react";

import { FormControl, InputAdornment, TextField } from "@mui/material";

import RequiredStar from "./RequiredStar";

type IconFormInputProps = {
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

const IconFormInput = ({
  name,
  label,
  required = false,
  icon,
  onBlur,
  onChange,
  error,
  touch,
  sx,
}: IconFormInputProps) => {
  return (
    <FormControl fullWidth>
      <TextField
        variant="outlined"
        id={name}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#8B4513",
            },
            "&.Mui-error.Mui-focused fieldset": {
              borderColor: "#d32f2f",
            },
          },
          ".MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
            color: "#999",
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

export default IconFormInput;
