import React, { useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { TextField, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Statistics = ({role}) => {

  const navigate = useNavigate();

  const [hospital, setHospital] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [service, setService] = React.useState('');
  const [startDate, setStartDate] = React.useState(moment().subtract(1, 'year').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = React.useState(moment().format('YYYY-MM-DD'));


	return (
    <div className="home">
      <Sidebar role={role} />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          [{role}]
          <div className="listTitleContainer">
            <TextField id="standard-basic" label="Search" variant="standard" />
            <FormControl variant="standard" sx={{ mb: 2, ml: 5, minWidth: 220 }}>
              <InputLabel id="demo-select-small">Hospital</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                label="Hospital"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2, ml: 5, minWidth: 220 }}>
              <InputLabel id="demo-select-small">Region</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                label="Region"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2, ml: 5, minWidth: 220 }}>
              <InputLabel id="demo-select-small">Service</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={service}
                onChange={(e) => setService(e.target.value)}
                label="Service"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2, ml: 5, minWidth: 220 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  onChange={(e) => setStartDate(e.format('YYYY-MM-DD'))}
                  renderInput={(params) => <TextField {...params} />}
                />
                </Stack>
              </LocalizationProvider>
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 1, ml: 5, minWidth: 220 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  onChange={(e) => setEndDate(e.format('YYYY-MM-DD'))}
                  renderInput={(params) => <TextField {...params} />}
                />
                </Stack>
              </LocalizationProvider>
            </FormControl>
          </div>
          <br />
          <hr />
          <Table data={[]} />
        </div>
      </div>
    </div>
  );
}

export default Statistics;