import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';


export default function DatePicker({endDate, startDate, setEndDate, setStartDate}) {
 
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <div>
          <DesktopDatePicker
          label="Start Date"
          inputFormat="MM/DD/YYYY"
          value={startDate}
          onChange={(e) => setStartDate(moment(e.$d).format('YYYY-MM-DD'))}
          renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="End desktop"
            inputFormat="MM/DD/YYYY"
            value={endDate}
            onChange={(e) => setEndDate(moment(e.$d).format('YYYY-MM-DD'))}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </Stack>
    </LocalizationProvider>
  );
}
