import React from "react";
import useStyles from "./styles";
import {
  Grid,
  Typography,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Likes = ({ likes, handleClose, open }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      scroll="paper"
    >
      <DialogTitle
        style={{ background: "#535559", color: "white" }}
        id="scroll-dialog-title"
        align="left"
      >
        Likes
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minWidth: "50%" }}
        >
          {likes &&
            likes.length > 0 &&
            likes.map((like, i) => (
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                style={{
                  padding: "0.5em 2em",
                }}
                key={i}
              >
                <PersonIcon style={{ marginRight: "0.3em" }} />
                <Typography variant="subtitle2" style={{ minWidth: "200px" }}>
                  {like.user}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Likes;
