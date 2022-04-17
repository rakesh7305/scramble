import React, { useContext } from 'react';
import Head from 'next/head';
// import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  // Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  // Badge,
  // Button,
  // Menu,
  // MenuItem,
  // Box,
  IconButton,
  // Drawer,
  // List,
  // ListItem,
  // Divider,
  // ListItemText,
  Grid,
  // InputBase,
  // FormControl,
  // InputLabel,
  // Select,
  // ListSubheader,
  // TextField,
  // Icon,
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import CancelIcon from '@material-ui/icons/Cancel';
// import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
// import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';
// import { useEffect } from 'react';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StatisticDialog from "../components/StatisticDialog";
import HelpDialog from "../components/HelpDialog";

export default function Layout({ title, description, children }) {
  // const router = useRouter();
  const { state, dispatch } = useContext(Store);
  //const { darkMode, cart, userInfo } = state;
  const { darkMode } = state;
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();



  // const [categories, setCategories] = useState([]);
  const [showStatModal, setShowStatisticModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);


  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  // const [anchorEl, setAnchorEl] = useState(null);
  // const loginClickHandler = (e) => {
    // setAnchorEl(e.currentTarget);
  // };

  const statisticDialogHandler = () => {
    setShowStatisticModal(false);
  };
  const helpDialogHandler = () => {
    setShowHelpModal(false);
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - MELCRABS` : 'MELCRABS'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <div>

              <StatisticDialog
                show={showStatModal}

                handler={statisticDialogHandler}
              >
              </StatisticDialog>
              <HelpDialog
                show={showHelpModal}
                handler={helpDialogHandler}
              >
              </HelpDialog>
            </div>

            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item
                xs style={{ display: "flex", justifyContent: "flex-start" }}>

                <img
                  src={
                    // "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                    "/images/crab_icon.png"
                  }
                  alt="Crab Logo"
                  width="80"
                  height="43"
                />
                {/* <SvgIcon></SvgIcon> */}
                <Typography className={classes.brand}> MELCRABS</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Help"
                  onClick={() => setShowHelpModal(true)}
                  style={{ color: 'white' }}
                >
                  <HelpOutlineIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="stat"
                  onClick={() => setShowStatisticModal(true)}
                  style={{ color: 'white' }}
                >
                  <InsertChartOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item >
                {/* xs style={{ display: "flex", justifyContent: "flex-end" }}>  */}
                <div>
                  <Switch
                    checked={darkMode}
                    onChange={darkModeChangeHandler}
                  ></Switch>
                </div>
              </Grid>
            </Grid>




          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
        </footer>
      </ThemeProvider>
    </div>
  );
}
