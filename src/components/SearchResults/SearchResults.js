import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ProfilePic from '../../assets/interpreter-pic.jpeg';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';


import './SearchResults.css'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 50,

  },
  card: {
    borderRadius: 10,

  },
  cardActionArea: {
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 10,

  },
  box: {
    maxWidth: 600,
    spacing: 10,
    borderRadius: 10,

  },
  profileImage: {
    maxWidth: 250,
    objectFit: 'cover',
    borderRadius: 10,

  },
  paper: {
    // position: 'absolute',
    // width: 400,
    backgroundColor: 'white',
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },

}));

function getModalStyle() {
  const top = 10;
  const left = 1000;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(${top}%, ${left}%)`,
    borderRadius: 10,
    outline: 'none',
    maxWidth: 750,
  };
}
function SearchResults(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="SearchResults">
      <h3>Showing All</h3>
      <ul className="">

      {props.resultsData.map(resultsData => <li className="search-result">
                                  <Box className={classes.box} boxShadow={3}>
                                    <Card className={classes.card} >
                                    <CardActionArea className={classes.cardActionArea} onClick={handleOpen}>
                                      <CardMedia
                                        className={classes.profileImage}
                                        component="img"
                                        alt="Interpreter Profile Photo"
                                        // height="150"
                                        image={ProfilePic}
                                        title="Interpreter"
                                      />
                                      <div>
                                      <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                          <div id="interpreter-name">{resultsData.name}</div>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                          <div id="interpreter-language">{resultsData.language}</div>
                                          <div id="interpreter-credentials">{resultsData.credentials}</div>
                                          <div id="interpreter-city">{resultsData.city}</div>
                                        </Typography>
                                        <Rating name="read-only" value={resultsData.rating} readOnly />

                                      </CardContent>
                                    </div>
                                    </CardActionArea>
                                    </Card>
                                  </Box>

                                  </li>)}
      </ul>
      <Box className={classes.box} boxShadow={3}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
          </div>
        </Modal>
      </Box>
    </div>
  );
}

export default SearchResults;
