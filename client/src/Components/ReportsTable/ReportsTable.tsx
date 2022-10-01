import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

function createData(name: string, date: string, link: string, image: string) {
  return {
    name,
    date,
    link,
    image,
  };
}

const rows = [
  createData("Name Surname", "Decembr 10, 1999", "icon", "Bsc"),
  createData("Name Surname", "Decembr 10, 1999", "icon", "Bsc"),
  createData("Name Surname", "Decembr 10, 1999", "icon", "Bsc"),
  createData("Name Surname", "Decembr 10, 1999", "icon", "Bsc"),
];

export const ReportsTable = () => {
  return (
    <div className="respone">
      <div className="response__inner">
        <Typography sx={{ m: "40px 10px" }}>Reports:</Typography>
        <TableContainer
          component={Paper}
          sx={{ borderTop: "1px solid black", borderRadius: 0 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Links</TableCell>
                <TableCell align="center">Images</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.link}</TableCell>
                  <TableCell align="center">{row.image}</TableCell>
                  <TableCell align="center">
                    <NavLink to={`/`} style={{ textDecoration: "none" }}>
                      Edit
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
