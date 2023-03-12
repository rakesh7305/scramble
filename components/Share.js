import * as React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import ShareIcon from '@mui/icons-material/Share';
import useStyles from '../utils/styles';



export default function Share(props) {
  const [isActive, setShare] = React.useState(props.isActive);
  const classes = useStyles();

  const handleOnClick = () => {
    
    // if (navigator.share) {
    //   navigator.share({
    //     // title: "`${postTitle} | ${siteTitle}`,"
    //     // text: `Check out ${postTitle} on ${siteTitle}`,
    //     // url: document.location.href,
    //   })
    //     .then(() => {
    //       console.log('Successfully shared');
    //     })
    //     .catch(error => {
    //       console.error('Something went wrong sharing the blog', error);
    //     });
    // } else {
    //   console.log('not able to share ' + props.shuffledWord + ":" + props.seconds);
    // }

    if (navigator.share) {
      navigator.share({
        title: 'melcrabs',
        text: `I finished melcrabs in ${props.seconds} seconds !!`,
        url: 'https://www.melcrabs.com',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }

  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  //console.log(props);

  return (
    <div>
      {/* className={classes.share}> */}
      <Button disabled={props.disabled} onClick={handleOnClick} variant="contained" color="secondary" size="small" startIcon={<ShareIcon />}>
        Share
        {/* <Share>
                shuffledWord={shuffledWord}
                seconds={seconds}
              </Share> */}
      </Button>
    </div>
  );
}
