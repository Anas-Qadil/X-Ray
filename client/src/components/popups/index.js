import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Delete from "../../assets/delete1.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Model({open, setOpen, deleteThis, id}) {

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    deleteThis(id);
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "600px",
          height: "250px",
        }}>
          <img src={Delete} width={100} />
          <DialogTitle>{"Are You Sure You Want To Delete This Company?"}</DialogTitle>
          <DialogActions>
            <Button 
              sx={{ ':hover': { bgcolor: 'text.secondary', color: 'white' }, bgcolor: 'black' }} 
              style={{ color: "white", width: "200px" }} 
              onClick={handleClose}
              > Cancel
            </Button>
            <Button sx={{ ':hover': { bgcolor: '#940101', color: 'white' },bgcolor: 'error.main' }}
              style={{ color: "white",
                width: "200px",
              }}
             onClick={handleConfirm}
             >Delete</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
// #940101