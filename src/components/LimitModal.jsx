import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const LimitModal = ({
  limit,
  setLimit,
  open,
  onClose,
  onDecline,
  onConfirm,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleInput = (event) => {
    const input = event.target.value;
    setLimit(input);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          p: 4,
          minWidth: 300,
          textAlign: "center",
          boxShadow: theme.shadows[5],
        }}
      >
        <Typography variant="h6" id="modal-title" sx={{ mb: 2 }}>
          Enter Limit
        </Typography>
        <TextField
          label="Limit Amount"
          type="text"
          onInput={handleInput}
          variant="outlined"
          value={limit}
          selected
          // error={sharesError}
          sx={{
            mb: 2,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  theme.palette.mode === "light" ? "black" : colors.grey[400],
              },
              "&:hover fieldset": {
                borderColor:
                  theme.palette.mode === "light" ? "black" : colors.grey[600],
              },
            },
            color: theme.palette.mode === "light" ? "black" : colors.grey[400],
          }}
        />
        <Button
          variant="contained"
          sx={{
            mr: 2,
            backgroundColor: "#684fa5",
            color: theme.palette.success.contrastText,
          }}
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button variant="contained" color="error" onClick={onDecline}>
          Decline
        </Button>
      </Box>
    </Modal>
  );
};

export default LimitModal;
