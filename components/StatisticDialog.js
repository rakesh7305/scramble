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
  Paper,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import {
  Chart,
  BarSeries,
  // Series,
  Title,
  ArgumentAxis,
  ValueAxis,
  // ConstantLine,
  // Label,
  // Tick,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { scaleBand, scaleLinear } from '@devexpress/dx-chart-core';
import { ArgumentScale, ValueScale } from '@devexpress/dx-react-chart';

//import { scaleLinear, scaleTime } from 'd3-scale';


export default function StatisticDialog(props) {
  // const [open, setOpen] = Rea  ct.useState(props.show);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // console.log(props);

  //console.log("in StatModal " + JSON.stringify(props));
  //const chartData = [{ "gameDate": "March 1", "time": 59 }, { "gameDate": "March 2", "time": 6 }];
  const chartData = Cookies.get('scrambleStat') ? JSON.parse(Cookies.get('scrambleStat')) : [{ "gameDate": "", "time": 0 }];

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
          {"Scramble Stats"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Paper minWidth="1000px" maxHeight='20vh'>
              <Chart
                data={chartData}
                height={300}
                width={600}
              // rotated={true}
              >
                <ArgumentScale factory={scaleBand} />
                <ValueScale factory={scaleLinear} />
                <ArgumentAxis />
                {/* <ValueAxis maxValueMargin={0.01}> */}
                <ValueAxis>
                  {/* <ConstantLine
                    width={2}
                    value={45}
                    color="#8c8cff"
                    dashStyle="dash"
                  >
                    <Label text="Low Average" />
                  </ConstantLine> */}
                  {/* <Label visible={true} /> */}
                </ValueAxis>

                <BarSeries
                  valueField="time"
                  argumentField="gameDate"
                  barWidth={0.1}
                ></BarSeries>
                {/* <Series
                  valueField="time"
                  argumentField="gameDate"
                  type="bar"
                  color="#79cac4"
                >
                  <Label visible={true} backgroundColor="#c18e92" />
                </Series> */}
                <Title text="Your Record" />
                <Animation />
              </Chart>
            </Paper>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handler}>close</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}