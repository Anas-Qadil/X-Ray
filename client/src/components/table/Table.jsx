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
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const List = ({data, labels, DataLoading}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const paths = location.pathname.split("/");
  const userRDX = useSelector(state => state?.data?.data?.user);
  // console.log(data);

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
          {(paths[paths.length - 1] === "companies" || paths[paths.length - 1] === "patients" || paths[paths.length - 1] === "persons" || paths[paths.length - 1] === "hospitals") ? (
            data?.map((row) => (
              <TableRow className="tableRowHover" key={row?.id} >
                {Object?.keys(row)?.map((key, index) => {
                    if (key === "_id" || key === "_company" || key === "_hospital")
                      return ;
                    return (<TableCell 
                      className="tableCell" 
                      key={index}
                      onClick={key == "action" ? undefined 
                        : () => {
                        const obj = {};
                        if (paths[paths.length - 1] === "companies") {
                          obj._id = row?._id;
                          obj.designation = row?.designation;
                          obj.email = row?.email;
                          obj.phone = row?.phone;
                          obj.region = row?.region;
                          obj.ville = row?.ville;
                          obj.role = userRDX.role;
                          obj.OwnRole = "company";
                        } else if (paths[paths.length - 1] === "patients") {
                          obj._id = row?._id;
                          obj.address = row?.address;
                          obj.age = row?.age;
                          obj.birthDate = row?.birthDate;
                          obj.cin = row?.cin;
                          obj.createdAt = row?.createdAt;
                          obj.email = row?.email;
                          obj.firstName = row?.firstName;
                          obj.gender = row?.gender;
                          obj.lastName = row?.lastName;
                          obj.phone = row?.phone;
                          obj.poids = row?.poids;
                          obj.role = userRDX.role;
                          obj.OwnRole = "patient";
                        } else if (paths[paths.length - 1] === "persons") {
                          obj._id = row?._id;
                          obj.address = row?.address;
                          obj.age = row?.age;
                          obj.birthDate = row?.birthDate;
                          obj.cin = row?.cin;
                          obj.createdAt = row?.createdAt;
                          obj.email = row?.email;
                          obj.firstName = row?.firstName;
                          obj.gender = row?.gender;
                          obj.lastName = row?.lastName;
                          obj.phone = row?.phone;
                          obj.poids = row?.poids;
                          obj.secteur = row?.secteur;
                          obj.type = row?.type;
                          obj.fonction = row?.fonction;
                          obj.role = userRDX.role;
                          obj.OwnRole = "person";
                          if (row?._company) {
                            
                            obj.company = row?._company;
                          } else if (row?._hospital) {
                            obj.hospital = row?._hospital;
                          }
                        } else if (paths[paths.length - 1] === "hospitals") {
                          obj._id = row?._id;
                          obj.designation = row?.designation;
                          obj.email = row?.email;
                          obj.phone = row?.phone;
                          obj.region = row?.region;
                          obj.ville = row?.ville;
                          obj.name = row?.name;
                          obj.statut = row?.statut;
                          obj.role = userRDX.role;
                          obj.OwnRole = "hospital";
                        }
                        navigate("/profile", {state: {data: obj}});
                      }
                    }
                    >{row[key]}</TableCell>)
                  }
                )}
              </TableRow>
            ))) : (
            data?.map((row) => (
              <TableRow key={row?.id}>
                {Object?.keys(row)?.map((key, index) => {
                    if (key === "_id")
                      return ;
                    return <TableCell className="tableCell" key={index}>{row[key]}</TableCell>
                  }
                )}
              </TableRow>
            ))
          )}
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
