import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default () => {
  const [open, setOpen] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [phoneNumber, setNumber] = useState<string>("");
  const [loading, toggleLoading] = useState<boolean>(false);
  const [disabled, toggleDisabled] = useState<boolean>(true);

  const [values, setValues] = useState({
    countryCode: "",
    countryName: "",
    operatorName: "",
    customerNumber: "",
    customerName: "",
    userId: "",
  });
  const onChange = (number: string) => {
    if (!number) {
      toggleDisabled(true);
    } else {
      toggleDisabled(false);
    }
    setNumber(number);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const handleSnackClose = () => {
    setSnackOpen(!snackOpen);
  };

  const SearchUser = () => {
    const url = ` http://192.168.1.4:3000/users/${phoneNumber}`;
    //Make axios call
    axios
      .get(`${url}`)
      .then((data) => {
        let response = data.data;
        const {
          countryCode,
          countryName,
          customerName,
          customerNumber,
          operatorName,
          userId,
        } = response;
        setValues({
          ...values,
          countryCode,
          countryName,
          customerName,
          customerNumber,
          operatorName,
          userId,
        });
        setOpen(true)
      })
      .catch((error) => {});
  };

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <TextField
        variant="standard"
        placeholder="Enter user ID"
        label="Search by Number or ID"
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        sx={{ flex: "1", marginBottom: "25px" }}
        disabled={loading}
        fullWidth
      ></TextField>
      <Button
        variant="outlined"
        sx={{ textTransform: "none" }}
        disabled={disabled || loading}
        onClick={SearchUser}
      >
        Search
      </Button>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message="Note archived"
      >
        <Alert
          onClose={handleSnackClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {"Number not found!"}
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ mt: 2 }}  >
            Name: {values.customerName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Phone: {values.customerNumber}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            CountryCode: {values.countryCode}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Country: {values.countryName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Carrier: {values.operatorName}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
