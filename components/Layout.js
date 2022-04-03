import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  // Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  // InputBase,
  // FormControl,
  // InputLabel,
  // Select,
  // ListSubheader,
  // TextField,
  // Icon,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';
// import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useEffect } from 'react';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  //const { darkMode, cart, userInfo } = state;
  const { darkMode, userInfo } = state;
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

  // const [sidbarVisible, setSidebarVisible] = useState(false);
  // const sidebarOpenHandler = () => {
  //   setSidebarVisible(true);
  // };
  // const sidebarCloseHandler = () => {
  //   setSidebarVisible(false);
  // };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  // const [query, setQuery] = useState('');
  // const queryChangeHandler = (e) => {
  //   setQuery(e.target.value);
  // };
  // const [genderQuery, setGenderQuery] = useState('');
  // const genderQueryChangeHandler = (e) => {
  //   setGenderQuery(e.target.value);
  // };

  // const [ageQuery, setAgeQuery] = useState('');
  // const ageQueryChangeHandler = (e) => {
  //   setAgeQuery(e.target.value);
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(genderQuery);
  //   console.log(ageQuery);
  //   //router.push(`/search?query=${query}`);
  //   router.push(`/search?gender=${genderQuery}&age=${ageQuery}`);

  // };

  useEffect(() => {
    fetchCategories();
  }, []);

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };
  // const genders = [
  //   {
  //     value: 'M',
  //     label: 'Groom (Var)',
  //   },
  //   {
  //     value: 'F',
  //     label: 'Bride (Kanya)',
  //   },
  // ];
  // const age = [
  //   {
  //     name: '18 to 20',
  //     value: '18-20',
  //   },
  //   {
  //     name: '20 to 23',
  //     value: '20-23',
  //   },
  //   {
  //     name: '23 to 26',
  //     value: '23-26',
  //   },
  //   {
  //     name: '26 to 29',
  //     value: '26-29',
  //   },
  //   {
  //     name: '29 to 32',
  //     value: '29-32',
  //   },
  //   {
  //     name: '32 to 35',
  //     value: '32-35',
  //   },
  //   {
  //     name: '35 to 38',
  //     value: '35-38',
  //   },
  //   {
  //     name: '38 and above',
  //     value: '38-80',
  //   },
  // ];
  // console.log("in layout");
  return (
    <div>
      <Head>
        <title>{title ? `${title} - KP Vivaah` : 'KP Vivaah'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                //onClick={sidebarOpenHandler}
                className={classes.menuButton}
              >
                <MenuIcon className={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>KP Vivaah</Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
                // open={sidbarVisible}
                // onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping by category</Typography>
                    <IconButton
                      aria-label="close"
                      // onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      // onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            {/* <div className={classes.searchSection}>

              <form onSubmit={submitHandler} className={classes.searchForm}>
                
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  // sx={{ m: 1, minWidth: 400 }}
                >
                  
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Gender"
                    className={classes.searchInput}
                    onChange={genderQueryChangeHandler}
                    // fullWidth
                    size="small"
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Age"
                    className={classes.searchInput}
                    onChange={ageQueryChangeHandler}
                    // fullWidth
                    size="small"
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {age.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>

              </form>
            </div> */}
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              
              {/* <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Typography>
                </Link>
              </NextLink>
               */}
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    <Typography component="span">Login</Typography>
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. KP Vivaah.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
