import { makeStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'white'
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: { padding: 0 },
  mt1: { marginTop: '1rem' },
  // search
  searchSection: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  searchForm: {
    //border: '1px solid #ffffff',
    // backgroundColor: '#ffffff',
    //borderRadius: 5,
    paddingLeft: 5,
  },
  photo: {
    height: 300,
    width: 300,
  },

  searchInput: {
    border: '1px solid #ffffff',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  nrow: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  letterbox: {
    display: 'block',
    width: '40px',
    height: '40px',
    border: '1px solid #bbb',
    margin: '2px',
    textAlign: 'center',
    lineHeight: '40px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '2.0em',
    // backgroundColor: '#00e600',

  },
  green: {
    backgroundColor: '#00e600',
  },
  share: {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    cursor: 'pointer',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    padding: '5px',
    // backgroundColor: rgb(43, 135, 255),
    // -webkit - box - shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75),
    // -moz - box - shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75),
    // box - shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75),
  },
  iconButton: {
    backgroundColor: '#f8c040',
    size: 'large',
    padding: 5,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
    height: '7vh'
  },
  sort: {
    marginRight: 5,
  },

  fullContainer: { height: '100vh' },
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
}));
export default useStyles;
