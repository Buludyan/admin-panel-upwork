import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { TablePagination, Typography } from "@mui/material";

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
  createData("Na Surna", "Decembr 10, 1999", "icon", "Bsc"),
  createData("Na Surname", "Decembr 10, 1999", "icon", "Bsc"),
  createData("Name Surname", "Decembr 10, 1999", "icon", "Bsc"),
  createData("Na Surna", "Decembr 10, 1999", "icon", "Bsc"),
];

export const ReportsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className="respone">
      <div className="response__inner">
        <Typography sx={{ m: "40px 10px 10px" }}>Reports:</Typography>
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
              {rows
                .slice()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
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
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};
