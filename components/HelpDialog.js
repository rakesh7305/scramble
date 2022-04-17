import * as React from 'react';
import {
  // List,
  // ListItem,
  // Typography,
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


export default function HelpDialog(props) {
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
          {"How to play MELCRABS?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click the letters at the bottom of the board to type in your answer.
            <p>Click ENTER to submit.</p>
            <p>MELCRABS is the perfect mix of logic, word vocabulary, and bragging to your friends! In fact, we love scrambling so much, our name is an anagram!</p>
            <p>MELCRABS=SCRAMBLE</p>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={props.handler}>close</Button> */}
          <Button autoFocus variant="contained" color="secondary" size="small" onClick={props.handler}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
