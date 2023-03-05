import {
  Typography,
  Input,
  Grid,
  Box,
  Button,
} from '@material-ui/core';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

import { useSnackbar } from 'notistack';

import db from '../utils/db';
import ScrambleGame from '../models/ScrambleGame';
import SuccessDialog from "../components/SuccessDialog";
// import StatisticDialog from "../components/StatisticDialog";
// import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import BackspaceIcon from '@mui/icons-material/Backspace';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import moment from 'moment';
import useStyles from '../utils/styles';



export default function Scramble(props) {

  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const [showModal, setShowModal] = useState(false);
  // const [showStatModal, setShowStatisticModal] = useState(false);
  const timerSet = 300;
  const [seconds, setSeconds] = useState(timerSet);
  const [isActive, setIsActive] = useState(true);
  const [currentGuess, setCurrentGuess] = useState();
  const [shuffledWord, setShuffledWord] = useState();
  const [correctWord, setCorrectWord] = useState();

  //const [timer, setTimer] = useState();
  const classes = useStyles();


  let timer = null;

  // ****************

  useEffect(() => {
    if (!playedGame()) {

      if (seconds > 0) {
        timer = setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      } else {
        // console.log("time is up " + seconds)
        document.getElementById('message').innerText = "Time's Up :)";
        clearInterval(timer);
        provideCorrectAnswer();
        disableAnswer();
        saveStat();
        // setIsActive(false);
      }
      return () => clearInterval(timer);
    }
    else {
      disableAnswer();
      alert("You have already played this Game. Please check back tomorrow");
    }
  }, [seconds]);
  // ****************
  // }, [seconds, isActive]);

  useEffect(() => {

    if (!currentGuess) {
      var userWord_init = [];
      for (var i = 0; i < newWord.length; i++) {
        var item = { "id": i, "letter": "", "checked": false, "responseLetterId": -1, color: "grey" };
        userWord_init.push(item);
      }
      setCurrentGuess(currentGuess => [...userWord_init]);

      if (!shuffledWord) {
        var shuffledWord_init = [];
        for (var i = 0; i < newWord.length; i++) {
          var item = { "id": 100 + i, "letter": newWord[i], "checked": false, "responseLetterId": -1, color: "grey" };
          shuffledWord_init.push(item);
        }
        setShuffledWord(shuffledWord => [...shuffledWord_init]);
      }
      if (!correctWord) {
        var correctWord_init = [];
        for (var i = 0; i < word.length; i++) {
          var item = { "id": i, "letter": word[i], "checked": false, "responseLetterId": -1, color: "lightblue" };
          correctWord_init.push(item);
        }
        setCorrectWord(correctWord => [...correctWord_init]);
      }
    }
  }, []);

  const onKeyUpHandler = ({ key }) => {

    if (isActive) {

      if (key === "Backspace") {
        clickBackspace();
      }

      else if (/^[A-Za-z]$/.test(key)) {
        updateKeyResponse(key.toUpperCase());
      }

      else if (key === 'Enter') {
        checkAnswer();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', onKeyUpHandler)

    return () => window.removeEventListener('keyup', onKeyUpHandler)
  }, [onKeyUpHandler]);




  const { scrambleGame } = props;
  const word = Array.from(scrambleGame.clue);
  const colorMode = state.darkMode;
  const rightAnswer = word.join("");
  const allValues = useRef([]);
  const newWord = Array.from(scrambleGame.scrambledClue);




  const playedGame = () => {
    const scrambleStat = state.scrambleStat;
    const gameNo = scrambleGame['gameNo'];
    const item = scrambleStat.find(item => item.gameNo == gameNo);
    if (item) {
      // alert("You have already Played the Game. Please check tomorrow");
      // disableAnswer();
      return true;
    }
    else {
      return false;
    }
  }

  const saveStat = () => {
    const data = {
      gameNo: scrambleGame.gameNo, //moment().format("DD-MMM HH:mm"), //Date.now(),
      time: timerSet - seconds,
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

    setIsActive(false);

  }

  function provideCorrectAnswer() {
    setCurrentGuess(currentGuess => [...correctWord]);

  }



  function checkAnswer() {
    if (isActive) {
      // const userAnswer = Array.from({ length: allValues.current.length }, () => "");

      // allValues.current.map((item, index) => (userAnswer[index] = (item.value).toUpperCase()));
      let userResponse = '';

      currentGuess.map((item) => (userResponse += item.letter));

      if (rightAnswer.localeCompare(userResponse.toUpperCase()) === 0) {
        clearInterval(timer);
        disableAnswer();
        const answerTime = (Math.floor(seconds / 60) < 10 ? "0" + (Math.floor(seconds / 60)).toString() : Math.floor(seconds / 60)) + ":" + (seconds % 60 < 10 ? "0" + (seconds % 60).toString() : seconds % 60);
        document.getElementById('clock').innerText = answerTime;
        const msg = "CORRECT !! " + (timerSet - seconds) + " seconds";
        enqueueSnackbar(msg, { variant: 'success' });
        document.getElementById('message').innerText = "You got it in " + (timerSet - seconds) + " seconds";
        saveStat();
        setShowModal(true);
      } else {
        enqueueSnackbar("wrong", { variant: 'error' });
      }
    }
  }


  function clickBackspace() {
    if (isActive) {
      //setCurrentGuess(prev=> prev.slice(0,-1))
      let userWord = currentGuess;
      let found = false;
      let letterRemoved = '';
      userWord.forEach((l, i) => {
        if (l.letter === "" && !found && i > 0) {
          letterRemoved = userWord[i - 1].letter;
          userWord[i - 1].letter = "";
          found = true;
        } else if (i === userWord.length - 1 && !found) {
          letterRemoved = userWord[userWord.length - 1].letter;
          userWord[userWord.length - 1].letter = "";
          found = true;
        }
      })

      if (found && letterRemoved != '') {
        found = false;
        shuffledWord.forEach((l, i) => {
          if (l.letter === letterRemoved && l.color === 'green' && !found) {
            shuffledWord[i].color = 'grey'
            found = true;
          }
        })
      }
      setCurrentGuess(currentGuess => [...userWord]);
      setShuffledWord(shuffledWord => [...shuffledWord]);

    }
  };


  function updateKeyResponse(letterValue) {
    if (isActive) {
      let letterMarked = false;
      let sWord = shuffledWord;
      sWord.forEach((l, i) => {
        if (l.letter === letterValue && l.color !== 'green' && !letterMarked) {
          sWord[i].color = 'green'
          letterMarked = true;
        }
      })

      if (letterMarked) {
        setShuffledWord(shuffledWord => [...sWord]);
        let userWord = currentGuess;
        let found = false;
        userWord.forEach((l, i) => {
          if (l.letter === "" && !found) {
            userWord[i].letter = letterValue;
            found = true;
          }
        })
        setCurrentGuess(currentGuess => [...userWord]);
      }

    }
  }

  function updateClickResponse(letterValue, id) {
    if (isActive) {
      let letterMarked = false;
      let sWord = shuffledWord;
      sWord.forEach((l, i) => {
        if (l.letter === letterValue && l.color !== 'green' && !letterMarked && id === l.id) {
          sWord[i].color = 'green'
          letterMarked = true;
        }
      })

      if (letterMarked) {
        setShuffledWord(shuffledWord => [...sWord]);
        let userWord = currentGuess;
        let found = false;
        userWord.forEach((l, i) => {
          if (l.letter === "" && !found) {
            userWord[i].letter = letterValue;
            found = true;
          }
        })
        setCurrentGuess(currentGuess => [...userWord]);
      }

    }
  }

  const onClickShuffledWordHandler = (e) => {
    const letterValue = (e.target.innerText).toUpperCase();
    const i = parseInt(e.target.id);
    allValues.current[i - 100] = letterValue;

    updateClickResponse(letterValue.toUpperCase(), i);
  };

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
        </div>

        <Box
          component="form"
          sx={{
            p: 2, border: '1px solid grey',
            borderRadius: 10,
            m: 0,
            minWidth: 325,
          }}
          noValidate
          autoComplete="off"
          bgcolor={colorMode ? 'black' : 'white'}
        >

          <Box
            // className={classes.nrow}
            textAlign='center'
            display='flex'
            justifyContent='center'
          >
            {currentGuess &&
              currentGuess.map((item) => (
                <Box className={classes.letterbox}
                  id={item.id}
                  key={item.id}
                  disabled={!isActive}
                  bgcolor={item.color}
                //     background: colorMode ? 'black' : 'lightgrey',
                //     color: colorMode ? 'white' : 'black',
                >{item.letter}</Box>
              ))}
          </Box>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "20vh" }}
          >
            <Grid item>
              <Typography variant='h4' fontFamily='Segoe UI'>{scrambleGame.category}</Typography>
            </Grid>
          </Grid>
          <div>
            <Box
              // className={classes.nrow}
              textAlign='center'
              display='flex'
              justifyContent='center'
            >
              {shuffledWord &&
                shuffledWord.map((item) => (
                  <Box className={classes.letterbox}
                    // <Box className={`${classes.letterbox} ${classes.green}`}
                    id={(item.id).toString()}
                    key={item.id}
                    defaultValue={item.letter}
                    disabled={!isActive}
                    onClick={onClickShuffledWordHandler}
                    bgcolor={item.color}
                    color={(item.color === 'green')
                      ? 'white' : (item.color !== 'green' && colorMode) ? 'white' : 'black'}
                  // background={colorMode} ? 'black' : 'lightgrey'
                  // color={ colorMode } ? 'white' : 'black'
                  > {item.letter} </Box>

                ))}

            </Box>
          </div>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "9vh" }}
          >
            <Grid item
            >
              <Typography id='clock' variant='h6' fontFamily='Segoe UI'>{Math.floor(seconds / 60) < 10 ? "0" + (Math.floor(seconds / 60)).toString() : Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" + (seconds % 60).toString() : seconds % 60}</Typography>
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
              <Button disabled={!isActive} variant="contained" color="secondary" size="small" startIcon={<KeyboardReturnIcon />}>
                ENTER
              </Button>
            </Grid>
            <Grid item xs style={{ display: "flex", justifyContent: "flex-end" }}
              onClick={clickBackspace}
            >
              <Button disabled={!isActive} variant="contained" color="secondary" size="small" startIcon={<BackspaceIcon />}>
                BKSP
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid >
    </Layout >
  );
}
export async function getServerSideProps() {
  //const { params } = context;
  //const gameDate = new Date("2022-03-14");
  const gameDate = moment().add(-5,"hour").format("YYYY-MM-DD");

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
