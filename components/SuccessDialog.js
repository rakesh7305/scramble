import * as React from 'react';
import {
  // List,
  // ListItem,
  Typography,
  // TextField,
  Button,
  // Link,
  // Grid,
  // Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Share from '../components/Share'


export default function SuccessDialog(props) {
  // const [open, setOpen] = React.useState(props.show);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // console.log(props);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.show}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Congratulations!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component={'span'}>
            <Typography variant='h6' >
              You unscrambled in {props.seconds} seconds! Click the stats icon to track your success.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Share shuffledWord={props.newWord} seconds={props.seconds} ></Share>
          <Button autoFocus variant="contained" color="secondary" size="small" onClick={props.handler}>
            Close
          </Button>
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
