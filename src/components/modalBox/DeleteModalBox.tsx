import { Stack, Box, Modal, Typography } from "@mui/material";

import { deleteModalStore } from "../../store/deleteModalStore";
import CancelButton from "../button/CancelButton";
import NormalButton from "../button/NormalButton";

const DeleteModalBox = () => {
  const { open, setOpen, setIsConfirm } = deleteModalStore();

  const modalBoxStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "fit-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontSize={30}
          fontWeight={700}
        >
          Delete
        </Typography>
        <Typography id="modal-modal-description">
          Are you sure you want to delete this ?
        </Typography>
        <Stack mt={3.25} gap={2} flexDirection={"row"} justifyContent={"end"}>
          <CancelButton type="contained" onClick={() => setOpen(false)} />
          <NormalButton
            type="contained"
            text="Delete"
            onClick={() => (setIsConfirm(true), setOpen(false))}
          />
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteModalBox;
