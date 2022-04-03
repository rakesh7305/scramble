import {
  // List,
  // ListItem,
  Typography,
  TextField,
  // Button,
  // Link,
  Grid,
  Box,
  IconButton,
} from '@material-ui/core';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import NextLink from 'next/link';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
// import useStyles from '../utils/styles';
// import Cookies from 'js-cookie';
// import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
// import { getError } from '../utils/error';
// import ReactDOM from "react-dom";
import db from '../utils/db';
import ScrambleGame from '../models/ScrambleGame';
//import { useTimer } from "../components/useTimer";
import SuccessDialog from "../components/SuccessDialog";
import StatisticDialog from "../components/StatisticDialog";
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
// import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';




export default function Scramble(props) {
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  // const router = useRouter();
  // const { redirect } = router.query;
  const { dispatch } = useContext(Store);
  // const { scrambleStat } = state;
  const [showModal, setShowModal] = useState(false);
  const [showStatModal, setShowStatisticModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState();

  //const { seconds, start, stop } = useTimer();


  useEffect(() => {
    // if (userInfo) {
    //   router.push('/');
    // }
    //start();
    document.getElementById("0").focus();

    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    setTimer(timer);
    return () => {
      clearInterval(timer);
    };

  }, []);

  const { scrambleGame } = props;

  const word = Array.from(scrambleGame.clue);

  // const classes = useStyles();


  // const INITIAL_ANS = Array.from({ length: word.length }, () => "");
  //const [ansewer, setAnswer] = useState();
  // const [rightAnswer, setrightAnswer] = useState(word.join(""));
  const rightAnswer = word.join("");
  //const [allValues, setAllValues] = useState(INITIAL_ANS);
  const allValues = useRef([]);
  // const clockRef = useRef();

  // const [newWord, setNewWord] = useState(Array.from(scrambleGame.scrambledClue));
  const newWord = Array.from(scrambleGame.scrambledClue);

  // console.log("All Values:" + allValues.current);
  // console.log("newWord:" + newWord);

  var shuffledWord_init = [];
  for (var i = 0; i < newWord.length; i++) {
    var item = { "id": 100 + i, "letter": newWord[i], "checked": false, "responseLetterId": -1 };
    shuffledWord_init.push(item);
  }
  // const [shuffledWord, setShuffledWord] = useState(shuffledWord_init);
  const shuffledWord = shuffledWord_init;

  // console.log("JSON=" + JSON.stringify(shuffledWord));

  const saveStat = () => {
    const data = {
      gameDate: moment().format("DD-MMM HH:mm"), //Date.now(),
      time: seconds,
    };
    dispatch({ type: 'SCRAMBLE_ADD_STAT', payload: data });
    //Cookies.set('scrambleStat', data);
  };

  const successDialogHandler = () => {
    setShowModal(false);
  };

  const statisticDialogHandler = () => {
    setShowStatisticModal(false);
  };

  function disableAnswer() {

    for (var i = 0; i < newWord.length; i++) {
      var id = (i).toString();
      document.getElementById(id).disabled = true;
    }
  }

  function checkLetter(updatedAnswer) {
    // console.log("in checkletter " + updatedAnswer);
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
          //document.getElementById((item.id).toString()).style.background = '#04470a';
          document.getElementById((item.id).toString()).style.color = 'white';
        }
      }
    });

  }

  function updateAllValues(val, index) {
    val = index < 0 ? "" : "";

    const userAnswer = Array.from({ length: allValues.current.length }, () => "");

    allValues.current.map((item, index) => (
      userAnswer[index] = (item.value).toUpperCase()
    )
    );

    const updatedAnswer = userAnswer;
    // const updatedAnswer = [...allValues];
    // updatedAnswer[index] = val;

    //setAllValues(updatedAnswer);
    //console.log("before calling checkletter:" + updatedAnswer);
    checkLetter(updatedAnswer);
    //console.log("after calling checkletter:" + allValues);
  }
  function checkAnswer() {
    //const userAnswer = allValues.join("");
    //const userAnswer = allValues.current.value.join("");
    const userAnswer = Array.from({ length: allValues.current.length }, () => "");

    //let userAnswer = "";
    allValues.current.map((item, index) => (userAnswer[index] = (item.value).toUpperCase()));
    const userResponse = userAnswer.join("");
    // console.log(word);
    // console.log(rightAnswer);
    // console.log(userResponse);

    if (rightAnswer.localeCompare(userResponse.toUpperCase()) === 0) {
      // stop();
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
    //console.log("After update all Values:" + allValues);
  }



  const ansChangeHandler = (e) => {
    const letterValue = (e.target.value).toUpperCase();
    // console.log("in Handler new = " + letterValue);

    const currentId = parseInt(e.target.id);

    if (!letterValue.match(/[A-Z]/)) {
      e.target.value = "";
      updateAllValues(letterValue, currentId);
    } else {
      //checkLetter(letterValue);
      if (currentId < word.length - 1) {
        document.getElementById((currentId + 1).toString()).focus();
      }
      updateAllValues(letterValue, currentId);
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
            // onClose={() => setShowModal(false)}
            show={showModal}
            handler={successDialogHandler}
          >
          </SuccessDialog>
          <StatisticDialog
            show={showStatModal}
            handler={statisticDialogHandler}
          >
          </StatisticDialog>
        </div>
        <Grid container
          // direction="row"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        // style={{ minHeight: "5vh" }}
        >
          {/* <Grid item xs={12} spacing={8}> */}
          <Grid item>
            <IconButton
              aria-label="stat"
              onClick={() => setShowStatisticModal(true)}
            >
              <InsertChartOutlinedIcon />
            </IconButton>
          </Grid>
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
                shuffledWord.map((item) => (
                  <TextField
                    id={(item.id).toString()}
                    key={item.id}
                    defaultValue={item.letter}
                    variant="outlined"
                    inputProps={{
                      readOnly: true,
                      style: {
                        width: "2ch",
                        fontSize: 30,
                        // background: "white",
                        background: "lightgrey",
                        color: "black",
                        fontWeight: "bold",
                        textAlign: "center",
                        border: "6px solid white",
                        ml: 20,
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
            justifyContent="center"
            alignItems="center"
            textAlign="center" >
            <Grid item >
              {shuffledWord &&
                shuffledWord.map((letter, index) => (
                  <TextField
                    id={index.toString()}
                    key={index}
                    //defaultValue=""
                    inputRef={el => allValues.current[index] = el}
                    //ref={allValues[index]}
                    variant="outlined"
                    autoFocus
                    onChange={ansChangeHandler}
                    onKeyUp={() => {
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
                          updateAllValues("", currentId);
                        } else if (currentId === 0) {
                          console.log("backspae " + currentId + " " + allValues.current[currentId].value)
                          updateAllValues("", currentId);
                        }
                      }
                      else if (event.which === 13) {
                        checkAnswer();
                      }
                    }}
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
                        pl: 20,
                        textTransform: "uppercase",
                        pattern: "[a-z]",
                        border: "6px solid white",
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
        </Box>
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps() {
  //const { params } = context;
  const gameDate = new Date("2022-03-14");

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

