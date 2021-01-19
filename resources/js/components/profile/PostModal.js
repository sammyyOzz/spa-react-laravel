import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
//   paper: {
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
//   },
  paper: {
    maxHeight: '80%',
    maxWidth: '80%',
    display: 'flex'
  },
  openModalImg: {
    // objectFit: 'contain',
    maxWidth: '60vw',
    height: 'auto'
  },
  paperRight: {
      height: '100%',
      backgroundColor: 'white',
      color: 'black'
  }
}));

function PostModal({ imgSrc, imgStyle }) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <img
        src={imgSrc} alt=""
        className={imgStyle}
        onClick={handleOpen}
     />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>

            <img src={imgSrc} className={classes.openModalImg} alt=""/>
            {/* <Paper className={classes.paperRight}>
                <Typography variant="h5">Hello</Typography>
            </Paper> */}

            {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p> */}

          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default PostModal;
