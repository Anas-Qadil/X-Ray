import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

const List = ({data}) => {

  if (!data || data.length === 0) {
    return ( 
      <div className="table">
        <h1>No data found</h1>
      </div>
    );
  }

  const result = data.slice(data.length - 5,  data.length);

  let rows = [];
  console.log(result[0].service.equipment)
  result.map((item, index) => {
    rows.push({
      id: index,
      date: moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
      cin: item.patient.cin,
      service: item.service.name,
      examen: item.service.examen,
      equipement: item.service.equipment,
      hospital: item.service.hospital.name,
      dose: item.dose,
    });
  })

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">CIN</TableCell>
            <TableCell className="tableCell">Service</TableCell>
            <TableCell className="tableCell">Examen</TableCell>
            <TableCell className="tableCell">Equipement</TableCell>
            <TableCell className="tableCell">Hospital</TableCell>
            <TableCell className="tableCell">Dose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">
                  {row.cin}
              </TableCell>
              <TableCell className="tableCell">{row.service}</TableCell>
              <TableCell className="tableCell">{row.examen}</TableCell>
              <TableCell className="tableCell">{row.equipement}</TableCell>
              <TableCell className="tableCell">{row.hospital}</TableCell>
              <TableCell className="tableCell">
                {row.dose}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
