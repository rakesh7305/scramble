import * as React from 'react';
import {
  // List,
  // ListItem,
  Typography,
  // TextField,
  Button,
  // Link,
  // Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  LinearProgress,
} from '@mui/material';
import Cookies from 'js-cookie';

import { Box } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Store } from '../utils/Store';
import { useContext } from 'react';



export default function StatisticDialog(props) {
  const { state } = useContext(Store);
  
  const chartData = Cookies.get('scrambleStat') ? JSON.parse(Cookies.get('scrambleStat')) : [{ "gameNo": "", "time": 0 }];
  const colorMode = state.darkMode;
  // bgcolor={colorMode ? 'black' : 'white'}
  // color: colorMode ? 'white' : '#470404',


  let average = 0, sum = 0;
  function findAvg () {
    chartData.map((item) => ( sum += (item.time)));
    average = sum / chartData.length
    return average;
  }
  return (
    <div>

      <Dialog
        open={props.show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Scramble Stats"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Box minWidth="400px" maxHeight='100vh'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="stat table">
                  <TableHead>
                    <TableRow key="1">
                      <TableCell width="30%">Game No.</TableCell>
                      <TableCell width="60%" align="left">Chart</TableCell>
                      <TableCell width="10%" align="left">Seconds</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chartData.map((row) => (
                      <TableRow key="2"
                      >
                        <TableCell component="th" scope="row">
                          {row.gameNo}
                        </TableCell>
                        <TableCell align="right">
                          <LinearProgress
                            width="100%"
                            variant="determinate"
                            value={row.time}
                            sx={{
                              height: 20,
                              }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h8" color={colorMode ? 'white' : '#470404'}>Average = {findAvg()} seconds</Typography>
            </Box>

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
