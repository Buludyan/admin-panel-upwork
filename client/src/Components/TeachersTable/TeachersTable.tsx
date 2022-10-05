import React, { useEffect, useState } from "react";
import "./TeachersTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Card,
  CardMedia,
  TablePagination,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../Hooks/Selector";
import { ITeacher } from "../../Interfaces/Interfaces";
import { useActions } from "../../Hooks/Actions";
import { TeacherMW } from "../ModalWindows/TeachersMW/TeachersMW";

export const TeachersTable = () => {
  const { setActiveAddTeacher, setActiveEditTeacher } = useActions();
  const { teachers } = useAppSelector((state) => state.details);
  const [rows, setRows] = useState<ITeacher[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);

  function createData(
    name: string,
    designation: string,
    photo: string,
    qualification: string,
    description: string,
    papers: string,
    books: string
  ) {
    return {
      name,
      designation,
      photo,
      qualification,
      description,
      papers,
      books,
    };
  }

  useEffect(() => {
    const newRows: ITeacher[] = [];
    teachers.map((teacher) => newRows.push(createData(...teacher)));
    setRows(newRows);
  }, [teachers]);

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
    <div className="teachers">
      <div className="teachers__inner">
        <Typography sx={{ m: "40px 10px 10px" }}>Teachers details:</Typography>
        <TableContainer
          component={Paper}
          sx={{ borderTop: "1px solid black", borderRadius: 0 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Designation</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Qualification</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Papers</TableCell>
                <TableCell align="center">Books</TableCell>
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
                    <TableCell align="center">{row.designation}</TableCell>
                    <TableCell align="center" sx={{ width: "60px" }}>
                      <Card sx={{ textAlign: "center" }}>
                        <CardMedia
                          component="img"
                          alt="img"
                          height="60"
                          image={row.photo}
                        />
                      </Card>
                    </TableCell>
                    <TableCell align="center">{row.qualification}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.papers}</TableCell>
                    <TableCell align="center">{row.books}</TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      align="center"
                      onClick={() =>
                        setActiveEditTeacher({
                          name: row.name,
                          designation: row.designation,
                          photo: row.photo,
                          qualification: row.qualification,
                          description: row.description,
                          papers: row.papers,
                          books: row.books,
                          id: index + "",
                        })
                      }
                    >
                      Edit
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
        <div className="teachers__footer">
          <TablePagination
            rowsPerPageOptions={[100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button onClick={() => setActiveAddTeacher()}>Add new</Button>
        </div>
      </div>
      <TeacherMW />
    </div>
  );
};
