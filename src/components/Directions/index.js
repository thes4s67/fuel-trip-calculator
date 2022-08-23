import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

const columns = [
  { id: "step", label: "Step", minWidth: 170 },
  { id: "distance", label: "Distance", minWidth: 100 },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
    align: "right",
    format: (value) => value,
  },
  {
    id: "fuelCost",
    label: "Fuel Cost",
    minWidth: 170,
    align: "right",
    format: (value) => value,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const Directions = ({ directions, price, combined }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {directions ? (
              directions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`d-${i}`}>
                      <TableCell key={`c-${i}-1`} align={columns[0].align}>
                        {row.instruction}
                      </TableCell>
                      <TableCell key={`c-${i}-2`} align={columns[1].align}>
                        {row.distance.toFixed(2)} mi
                      </TableCell>
                      <TableCell key={`c-${i}-3`} align={columns[2].align}>
                        {(row.duration / 60).toFixed(2)} mins
                      </TableCell>
                      <TableCell key={`c-${i}-4`} align={columns[3].align}>
                        {((row.distance / combined) * price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <Typography
                variant="h5"
                sx={{ textAlign: "center", mt: 2, mb: 2 }}
              >
                No data
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={directions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Directions;
