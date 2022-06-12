import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Alert,
  AlertColor,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import countryCodeList from "../src/countrycode.json";

export default () => {
  const [numberValid, setNumberValid] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>(
    countryCodeList[0].dial_code
  );
  const [phoneNumber, setNumber] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [loading, toggleLoading] = useState<boolean>(false);
  const [disabled, toggleDisabled] = useState<boolean>(true);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackStatus, setSnackStatus] = useState<{
    message: string;
    type: AlertColor;
  }>({
    message: "",
    type: "error",
  });

  const [values, setValues] = useState({
    countryCode: countryCode,
    countryName: "",
    operatorName: "",
    customerNumber: phoneNumber,
    customerName: customerName,
  });

  const validFormat = (number: string) => !isNaN(Number(number));
  const validLength = (number: string) => number.length === 10;
  const onChange = (number: string) => {
    if (!validFormat(number)) return;
    if (validLength(number)) {
      toggleDisabled(!disabled);
    } else {
      toggleDisabled(true);
    }
    setNumber(number);
  };

  const handleCustomerName = (name: string) => {
    if (!name) return;
    setCustomerName(name);
  };

  const handleSnackClose = () => {
    setSnackOpen(!snackOpen);
  };

  const checkValidity = () => {
    toggleLoading(!loading);
    try {
      let url = ` http://192.168.1.4:3000/validate?number=${
        countryCode + phoneNumber
      }`;
      //Make axios call
      axios.get(`${url}`).then((data) => {
        let response = data.data;
        console.log(response);
        const { country_name: countryName, carrier: operatorName } = response;
        setValues({
          ...values,
          countryName,
          operatorName,
        });
        toggleLoading(false);
        setNumberValid(true)
      }).catch ((error)=> {
        toggleLoading(false);
        setSnackStatus({ message: "Invalid number", type: "error" });
        setSnackOpen(!snackOpen);
      })
   
    } catch (error) {
      toggleLoading(false);
      setSnackStatus({ message: "Something went wrong", type: "error" });
      setSnackOpen(!snackOpen);
    }
  };

  const submitDetails = () => {
    const data = {
      ...values,
      customerNumber: phoneNumber,
      customerName: customerName,
    };
    let url = ` http://192.168.1.4:3000/users`;
    axios.post(`${url}`,data).then((data) => {
      if (data.data) {
        setValues({
          ...values,
          countryName: "",
          operatorName: "",
        });
        setCustomerName("")
        setNumber("")
      }
      setSnackStatus({ message: "Successfully created", type: "success" });
      setSnackOpen(!snackOpen);
    }).catch((error)=>{
      setSnackStatus({ message: "Internal server error", type: "error" });
      console.log("eroorrroo", error)
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box
        display="flex"
        width="100%"
        alignItems="end"
        justifyContent="space-between"
        mb={3}
      >
        <FormControl sx={{ flex: ".15" }} size="small">
          <Select
            variant="standard"
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={countryCode}
            onChange={(event: SelectChangeEvent) =>
              setCountryCode(event.target.value)
            }
            label="Country code"
            autoWidth
            disabled={loading}
          >
            {countryCodeList.map((cc) => (
              <MenuItem
                key={cc.dial_code + cc.code}
                value={cc.dial_code}
              >{`${cc.dial_code}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          placeholder="Enter 10 digit number"
          label="Phone Number"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          sx={{ flex: ".8" }}
          disabled={loading}
          fullWidth
        ></TextField>
      </Box>
      {!numberValid && (
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          disabled={disabled || loading}
          onClick={checkValidity}
        >
          Check
        </Button>
      )}
      {numberValid && (
        <TextField
          disabled={loading}
          variant="standard"
          label="Full Name"
          value={customerName}
          sx={{ flex: ".8", mb: "20px" }}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleCustomerName(e.target.value)
          }
        ></TextField>
      )}
      {numberValid && (
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          disabled={disabled || loading}
          onClick={submitDetails}
        >
          Submit
        </Button>
      )}
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={snackOpen}
        autoHideDuration={9000}
        onClose={handleSnackClose}
        message={snackStatus.message}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackStatus.type}
          sx={{ width: "100%" }}
        >
          {snackStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
