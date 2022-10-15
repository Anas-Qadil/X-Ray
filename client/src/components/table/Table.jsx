import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import LineLoader from "../loader/lineLoader";
import NoData from "../../assets/No data-amico.png";

const List = ({data, labels, DataLoading}) => {
  return ( 
    <TableContainer component={Paper} className="table"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {labels?.map((label, index) => (
              <TableCell className="tableCell" key={index}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row?.id}>
              {Object?.keys(row)?.map((key, index) => (
                <TableCell className="tableCell" key={index}>{row[key]}</TableCell>
              ))}
            </TableRow>
          )) 
          }
        </TableBody>
      </Table>
      {DataLoading && <LineLoader />}
      {!DataLoading && data.length === 0 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
          }}>
            <img src={NoData} width="50%" style={{
              height: "100%",
              marginTop: "-100px",
            }} />
          </div>
      )}
    </TableContainer>
  );
};

export default List;
