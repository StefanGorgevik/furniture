import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import UserCheckedIcon from "components/UI/icons/UserCheckedIcon";
import EuroIcon from "components/UI/icons/EuroIcon";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import useStyles from "./styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export const FurnitureItem = ({
  item,
  onClick,
  isMine,
  onEdit,
  onDelete,
  showIcon,
  price,
  showTools,
}) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      raised
      style={{
        cursor: !showTools ? "pointer" : "default",
      }}
      onClick={showTools ? null : () => onClick()}
    >
      <CardContent className={classes.cardContent}>
        <CardHeader
          action={isMine && showIcon && <UserCheckedIcon />}
          title={item.name}
          className={classes.cardHeader}
        />
        <img className={classes.media} src={item.image} alt={item.name} />
        <div className={classes.actionArea}>
          <IconButton className={classes.iconButton}>
            <ThumbUpIcon />
            <Typography style={{ paddingLeft: "5px" }} variant="caption">
              {item.likes.length}
            </Typography>
          </IconButton>

          <IconButton className={classes.iconButton}>
            <InsertCommentIcon tooltipTitle="Reviews" />
            <Typography style={{ paddingLeft: "5px" }} variant="caption">
              {item.reviews.length}
            </Typography>
          </IconButton>

          <IconButton className={classes.iconButton}>
            <EuroIcon />
            <Typography style={{ paddingLeft: "5px" }} variant="caption">
              {price}
            </Typography>
          </IconButton>
        </div>

        {showTools && (
          <CardActions
            style={{
              justifyContent: !showIcon ? "space-evenly" : "flex-end",
              alignItems: "center",
              marginTop: "1em",
              backgroundColor: "transparent",
            }}
          >
            <Tooltip title="Edit item">
              <Button
                className={classes.actionButton}
                onClick={onEdit}
                size="small"
                variant="standard"
                color="primary"
              >
                <EditIcon style={{ marginLeft: "2px", marginBottom: "2px" }} />
              </Button>
            </Tooltip>
            <Tooltip title="Delete item">
              <Button
                className={classes.actionButton}
                onClick={onDelete}
                variant="standard"
                size="small"
                color="primary"
              >
                <DeleteIcon
                  style={{ marginLeft: "2px", marginBottom: "2px" }}
                />
              </Button>
            </Tooltip>
            <Tooltip title="See item">
              <Button
                onClick={onClick}
                size="small"
                color="primary"
                style={{
                  paddingLeft: "1em",
                }}
                className={classes.actionButton}
                variant="standard"
              >
                <ArrowForwardIcon
                  style={{ marginLeft: "2px", marginBottom: "2px" }}
                />
              </Button>
            </Tooltip>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
};
