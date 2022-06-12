import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";

interface User {
  countryCode: string;
  countryName: string;
  operatorName: string;
  customerNumber: string;
  customerName: string;
  userId: string;
}

export default () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getValidUsers = () => {
    setLoading(true);
    try {
      const url = ` http://192.168.1.4:3000/users`;
      axios.get(`${url}`).then((data) => {
        let response = data.data;
        setUserList(response);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getValidUsers();
  }, []);

  const handleDelete = (userId: string) => {
    setLoading(true);
    try {
      const url = ` http://192.168.1.4:3000/users/${userId}`;
      axios.delete(`${url}`).then((data) => {
        let response = data.data;
        getValidUsers();
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" size="small">
                  Name
                </TableCell>
                <TableCell align="center" size="small">
                  Number
                </TableCell>
                <TableCell align="center" size="small">
                  Operator
                </TableCell>
                <TableCell align="center" size="small">
                  Country
                </TableCell>
                <TableCell align="center" size="small">
                  Code
                </TableCell>
                <TableCell align="center" size="small">
                  Id
                </TableCell>

                <TableCell align="center" size="small">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((data) => (
                <TableRow
                  key={data.customerName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.customerName}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {data.customerNumber}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {data.operatorName}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {data.countryName}
                  </TableCell>

                  <TableCell align="center" size="small">
                    {data.countryCode}
                  </TableCell>

                  <TableCell align="center" size="small">
                    {data.userId}
                  </TableCell>

                  <TableCell align="center" size="small">
                    <IconButton
                      onClick={() => {
                        const result = prompt("Are you sure?");
                        if (result?.toLowerCase() !== "yes") return;
                        handleDelete(data.userId);
                      }}
                      disableFocusRipple
                      disableRipple
                      edge="end"
                      aria-label="comments"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
