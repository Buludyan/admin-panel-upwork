import React, { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useAppSelector } from "../../Hooks/Selector";
import { NavLink } from "react-router-dom";
import { ICollege, ITime } from "../../Interfaces/Interfaces";
import { useActions } from "../../Hooks/Actions";

interface Data {
  name: string;
  category: string;
  status: string;
  lastModified: ITime;
}

function EnhancedTableHead() {
  const { setOrder } = useActions();
  const { order } = useAppSelector((state) => state.colleges);

  return (
    <TableHead>
      <TableRow>
        <TableCell>Сollege name</TableCell>
        <TableCell align="center">Category</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">
          <TableSortLabel onClick={() => setOrder(order)} direction={order}>
            Last Modified
            <Box component="span" sx={visuallyHidden}></Box>
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Colleges
      </Typography>
    </Toolbar>
  );
};

export const CollegesList: FC = () => {
  const { collegesData } = useAppSelector((state) => state.colleges);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [rows, setRows] = useState<Data[]>([]);

  const { order } = useAppSelector((state) => state.colleges);

  useEffect(() => {
    const rowsData: Data[] = [];
    collegesData &&
      collegesData.map((college: ICollege) =>
        rowsData.push({
          name: college.collegename,
          category: college.SpecialisedIn,
          status: college.status ? college.status : "No status yet",
          lastModified: college.lastModified
            ? college.lastModified
            : { timeToShow: "Not modified yet", ms: 0 },
        })
      );
    setRows([...rowsData]);
  }, [collegesData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCollegeId = (name: string): string => {
    const id = name.slice(name.indexOf("Id:") + 4, name.indexOf(")"));
    return id;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead />
            <TableBody>
              {rows
                .slice()
                .sort((a, b) =>
                  order === "desc"
                    ? b.lastModified.ms - a.lastModified.ms
                    : a.lastModified.ms - b.lastModified.ms
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        {row.lastModified.timeToShow}
                      </TableCell>
                      <TableCell align="center">
                        <NavLink
                          to={`/${getCollegeId(row.name)}`}
                          style={{ textDecoration: "none" }}
                        >
                          Edit
                        </NavLink>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53,
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
      </Paper>
    </Box>
  );
};
