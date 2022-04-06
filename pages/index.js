import {
  Typography,
  TextField,
  Input,
  Grid,
  Box,
  IconButton,
  Button,
} from '@material-ui/core';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

import { useSnackbar } from 'notistack';

import db from '../utils/db';
import ScrambleGame from '../models/ScrambleGame';
import SuccessDialog from "../components/SuccessDialog";
import StatisticDialog from "../components/StatisticDialog";
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import BackspaceIcon from '@mui/icons-material/Backspace';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';




export default function Scramble(props) {

  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(Store);
  const [showModal, setShowModal] = useState(false);
  // const [showStatModal, setShowStatisticModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  //const [timer, setTimer] = useState();

  let timer = null;
  useEffect(() => {
    document.getElementById("0").focus();

    timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    //setTimer(timer);

    return () => {
      clearInterval(timer);
    };

  }, []);

  const { scrambleGame } = props;

  const word = Array.from(scrambleGame.clue);

  // const classes = useStyles();


  const rightAnswer = word.join("");
  const allValues = useRef([]);

  const newWord = Array.from(scrambleGame.scrambledClue);

  var shuffledWord_init = [];
  for (var i = 0; i < newWord.length; i++) {
    var item = { "id": 100 + i, "letter": newWord[i], "checked": false, "responseLetterId": -1 };
    shuffledWord_init.push(item);
  }
  const shuffledWord = shuffledWord_init;


  const saveStat = () => {
    const data = {
      gameDate: scrambleGame.gameNo, //moment().format("DD-MMM HH:mm"), //Date.now(),
      time: seconds,
    };
    dispatch({ type: 'SCRAMBLE_ADD_STAT', payload: data });
  };

  const successDialogHandler = () => {
    setShowModal(false);
  };

  // const statisticDialogHandler = () => {
  //   setShowStatisticModal(false);
  // };

  function disableAnswer() {

    for (var i = 0; i < newWord.length; i++) {
      var id = (i).toString();
      document.getElementById(id).disabled = true;
    }
  }

  function checkLetter(updatedAnswer) {
    shuffledWord.forEach((item) => {
      item.checked = false;
      item.responseLetterId = -1;
      document.getElementById((item.id).toString()).style.background = 'lightgrey';
      document.getElementById((item.id).toString()).style.color = 'black';
    });

    shuffledWord.forEach((item) => {
      for (let val in updatedAnswer) {
        if (item.letter === updatedAnswer[val]) {
          item.checked = true;
          item.responseLetterId = val;
          document.getElementById((item.id).toString()).style.background = '#00e600';
          document.getElementById((item.id).toString()).style.color = 'white';
        }
      }
    });

  }

  function updateAllValues() {

    const userAnswer = Array.from({ length: allValues.current.length }, () => "");

    allValues.current.map((item, index) => (
      userAnswer[index] = (item.value).toUpperCase()
    )
    );

    const updatedAnswer = userAnswer;

    checkLetter(updatedAnswer);
  }

  // function updateAllValues(val, index) {
  //   val = index < 0 ? "" : "";

  //   const userAnswer = Array.from({ length: allValues.current.length }, () => "");

  //   allValues.current.map((item, index) => (
  //     userAnswer[index] = (item.value).toUpperCase()
  //   )
  //   );

  //   const updatedAnswer = userAnswer;

  //   checkLetter(updatedAnswer);
  // }

  function checkAnswer() {
    const userAnswer = Array.from({ length: allValues.current.length }, () => "");

    allValues.current.map((item, index) => (userAnswer[index] = (item.value).toUpperCase()));
    const userResponse = userAnswer.join("");

    if (rightAnswer.localeCompare(userResponse.toUpperCase()) === 0) {
      clearInterval(timer);
      disableAnswer();
      const answerTime = (Math.floor(seconds / 60) < 10 ? "0" + (Math.floor(seconds / 60)).toString() : Math.floor(seconds / 60)) + ":" + (seconds % 60 < 10 ? "0" + (seconds % 60).toString() : seconds % 60);
      document.getElementById('clock').innerText = answerTime;
      const msg = "CORRECT !! " + seconds + " seconds";
      enqueueSnackbar(msg, { variant: 'success' });
      document.getElementById('message').innerText = "You got it !";
      saveStat();
      setShowModal(true);
    } else {
      enqueueSnackbar("wrong", { variant: 'error' });
    }
  }

  function clickBackspace() {
    let index = 0;
    let found = false;
    allValues.current.forEach((item) => {
      if (item.value === "" && !found && index > 0) {
        found = true;
        allValues.current[index-1].value = '';
        updateAllValues();
        allValues.current[index-1].focus();
        // e.target.style.background = '#00e600';
        // e.target.style.color = 'white';
      }
      else if(index === allValues.current.length - 1 && !found) {
        allValues.current[allValues.current.length - 1 ].value = '';
        updateAllValues();
        allValues.current[allValues.current.length - 1 ].focus();
      }
      index++;
    });
  };


  const ansChangeHandler = (e) => {
    const letterValue = (e.target.value).toUpperCase();

    const currentId = parseInt(e.target.id);

    if (!letterValue.match(/[A-Z]/)) {
      e.target.value = "";
      // updateAllValues(letterValue, currentId);
      updateAllValues();
    } else {
      if (currentId < word.length - 1) {
        document.getElementById((currentId + 1).toString()).focus();
      }
      // updateAllValues(letterValue, currentId);
      updateAllValues();
    }
  };

  const onClickShuffledWordHandler = (e) => {
    const letterValue = (e.target.value).toUpperCase();
    console.log("on click event: " + letterValue);

    // allValues.current.map((item, index) => (
    //   if (item.value === "") {
    //     document.getElementById((index).toString()).innerText = letterValue;
    //   }
    // )
    // )
    let index = 0;
    let found = false;

    allValues.current.forEach((item) => {
      if (item.value === "" && !found) {
        item.value = letterValue;
        e.target.style.background = '#00e600';
        e.target.style.color = 'white';
        found = true;
      }
      index++;

    });

  };

  const onKeyUpHandler = (e) => {
    // console.log("on key up event: " + event.which);
    if (event.which === 8) {
      const currentId = event.target.id;
      //checkLetter();
      event.target.value = "";
      const prevId = (currentId - 1).toString();
      if (currentId > 0) {
        //allValues.current[index-1].focus()
        document.getElementById(prevId).focus();
        //document.getElementById(prevId).select();
        // updateAllValues("", currentId);
        updateAllValues();

      } else if (currentId === 0) {
        console.log("backspae " + currentId + " " + allValues.current[currentId].value)
        // updateAllValues("", currentId);
        updateAllValues();

      }
    }
    else if (event.which === 13) {
      checkAnswer();
    }

  };


  // function shuffle(array) {
  //   var copy = [], n = array.length, i;

  //   // While there remain elements to shuffle…
  //   while (n) {

  //     // Pick a remaining element…
  //     i = Math.floor(Math.random() * array.length);

  //     // If not already shuffled, move it to the new array.
  //     if (i in array) {
  //       copy.push(array[i]);
  //       delete array[i];
  //       n--;
  //     }
  //   }
  //   return copy;
  // }

  return (
    <Layout title="Scramble">
      <Grid container justifyContent="center"
        alignItems="center"
        style={{ minHeight: "70vh" }}
      >
        <div>
          <SuccessDialog
            show={showModal}
            handler={successDialogHandler}
          >
          </SuccessDialog>
          {/* <StatisticDialog
            show={showStatModal}
            handler={statisticDialogHandler}
          >
          </StatisticDialog> */}
        </div>
        <Grid container
          // direction="row"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        // style={{ minHeight: "5vh" }}
        >
          {/* <Grid item>
            <IconButton
              aria-label="stat"
              onClick={() => setShowStatisticModal(true)}
            >
              <InsertChartOutlinedIcon />
            </IconButton>
          </Grid> */}
   
        </Grid>
        <Box
          component="form"
          sx={{
            p: 2, border: '1px solid grey',
            borderRadius: 10,
          }}
          noValidate
          autoComplete="off"
          bgcolor="white"
        >
          <Grid container spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            textAlign="center" >
            <Grid item >
              {shuffledWord &&
                shuffledWord.map((letter, index) => (
                  <Input
                    id={index.toString()}
                    key={index}
                    //defaultValue=""
                    inputRef={el => allValues.current[index] = el}
                    //ref={allValues[index]}
                    variant="outlined"
                    autoFocus
                    onChange={ansChangeHandler}
                    onKeyUp={onKeyUpHandler}
                    inputProps={{
                      readOnly: false,
                      maxLength: 1,
                      style: {
                        width: "2ch",
                        fontSize: 30,
                        background: "lightgrey",
                        color: "#470404",
                        fontWeight: "bold",
                        textAlign: "center",
                        // pl: 20,
                        textTransform: "uppercase",
                        pattern: "[a-z]",
                        border: "2px solid white",
                      }
                    }}
                  />
                ))}

            </Grid>
          </Grid>

          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "20vh" }}
          >
            <Grid item
            >
              <Typography variant='h4' fontFamily='Segoe UI'>{scrambleGame.category}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}
            direction="row"
            // width="100%"
            justifyContent="center"
            alignItems="center"
            textAlign="center" >
            <Grid item>
              {shuffledWord &&
                shuffledWord.map((item) => (
                  <Input
                    id={(item.id).toString()}
                    key={item.id}
                    defaultValue={item.letter}
                    variant="outlined"
                    onClick={onClickShuffledWordHandler}
                    inputProps={{
                      readOnly: true,
                      style: {
                        width: "2ch",
                        wrap: "nowrap",
                        fontSize: 30,
                        // background: "white",
                        background: "lightgrey",
                        color: "black",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "1px solid white",
                        // m: 2,
                        // p: 2,
                      }
                    }}
                  />

                ))}

            </Grid>
          </Grid>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "9vh" }}
          >
            <Grid item
            >
              <Typography id='clock' variant='h6' fontFamily='Segoe UI'>{Math.floor(seconds / 60) < 10 ? "0" + (Math.floor(seconds / 60)).toString() : Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" + (seconds % 60).toString() : seconds % 60}</Typography>
              {/* <Typography id='clock' ref={clockRef} variant='h6' fontFamily='Segoe UI'></Typography> */}
            </Grid>
            <Grid item
            >
              <Typography id='message' variant='h6' color='secondary' fontFamily='Segoe UI'></Typography>
            </Grid>
          </Grid>
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "9vh" }}
          >
            <Grid item xs style={{ display: "flex", justifyContent: "flex-start" }}
              onClick={checkAnswer}
            >
              <Button variant="contained" color="secondary" size="small" startIcon={<KeyboardReturnIcon />}>
                ENTER
              </Button>
            </Grid>
            <Grid item xs style={{ display: "flex", justifyContent: "flex-end" }}
              onClick={clickBackspace}
            >
              <Button variant="contained" color="secondary" size="small" startIcon={<BackspaceIcon />}>
                BKSP
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps() {
  //const { params } = context;
  //const gameDate = new Date("2022-03-14");
  const gameDate = moment().format("YYYY-MM-DD");

  await db.connect();
  const scrambleGame1 = await ScrambleGame.findOne({ gameDate }).lean();
  await db.disconnect();
  //candidate1.age = moment().diff(candidate1.birthDate, 'years'); // Output: 20

  // console.log("game: " + scrambleGame1);
  //candidate1.birthDate = moment(candidate1.birthDate).format('DD-MMM-YYYY');


  const scrambleGame = JSON.parse(JSON.stringify(scrambleGame1));
  return {
    props: {
      scrambleGame,
    },
  };
}

