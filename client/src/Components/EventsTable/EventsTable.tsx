import React, { useEffect, useState } from "react";
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
import "./EventsTable.scss";
import { EventMW } from "../ModalWindows/EventMW/EventMW";
import { useActions } from "../../Hooks/Actions";
import { useAppSelector } from "../../Hooks/Selector";
import { IIvent } from "../../Interfaces/Interfaces";

export const EventsTable = () => {
  const { setActiveAddEvent, setActiveEditEvent } = useActions();
  const { events } = useAppSelector((state) => state.details);
  const [rows, setRows] = useState<IIvent[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);

  const createData = (
    title: string,
    date: string,
    link: string,
    image: string
  ) => {
    return {
      title,
      date,
      link,
      image,
    };
  };

  useEffect(() => {
    const newRows: IIvent[] = [];
    events.map((event) => newRows.push(createData(...event)));
    setRows(newRows);
  }, [events]);

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
    <div className="events">
      <div className="events__inner">
        <Typography sx={{ m: "40px 10px 10px" }}>Events:</Typography>
        <TableContainer
          component={Paper}
          sx={{ borderTop: "1px solid black", borderRadius: 0 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
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
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.link}</TableCell>
                    <TableCell align="center" sx={{ width: "60px" }}>
                      <Card sx={{ textAlign: "center" }}>
                        <CardMedia
                          component="img"
                          alt="img"
                          height="60"
                          image={row.image}
                        />
                      </Card>
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      align="center"
                      onClick={() =>
                        setActiveEditEvent({
                          title: row.title,
                          date: row.date,
                          link: row.link,
                          image: row.image,
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
        <div className="events__footer">
          <TablePagination
            rowsPerPageOptions={[100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button onClick={() => setActiveAddEvent()}>Add new</Button>
        </div>
      </div>
      <EventMW />
    </div>
  );
};
