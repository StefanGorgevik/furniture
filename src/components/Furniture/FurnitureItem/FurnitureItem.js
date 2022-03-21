import React, { useMemo } from "react";
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
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
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
  const { category } = item;
  const classes = useStyles();
  const itemCategory = useMemo(() => {
    let cat = "Uncategorized";
    switch (category) {
      case "Bed":
        cat = "Beds";
        break;
      case "Chair":
        cat = "Chairs";
        break;
      case "Table":
        cat = "Tables";
        break;
      case "Desk":
        cat = "Desks";
        break;
      case "Dresser":
        cat = "Dressers";
        break;
      case "Cupboard":
        cat = "Cupboards";
        break;
      case "Couch":
        cat = "Couches";
        break;
      default:
        cat = "Uncategorized";
        break;
    }
    return cat;
  }, [category]);
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
          subheader={
            showTools ? (
              <Typography variant="body1" style={{ marginRight: "40px" }}>
                {item.createdOn.substr(0, 10)}
              </Typography>
            ) : null
          }
          titleTypographyProps={{
            style: {
              textAlign: "center",
              marginRight: "50px",
            },
          }}
          avatar={
            <Tooltip title={item.category}>
              <img
                style={{
                  width: "25px",
                  height: "25px",
                  marginLeft: "10px",
                  marginBottom: "13px",
                }}
                src={require(`assets/images/categoriesIcons/${itemCategory}.png`)}
                alt="category"
              />
            </Tooltip>
          }
          action={isMine && showIcon && <UserCheckedIcon />}
          title={
            <Typography variant="caption" style={{ marginRight: "40px" }}>
              {item.name}
            </Typography>
          }
          className={classes.cardHeader}
        />
        <img className={classes.media} src={item.image} alt={item.name} />
        <div className={classes.actionArea}>
          <IconButton className={classes.iconButton}>
            <ThumbUpIcon />
            <Typography style={{ paddingLeft: "5px" }} variant="caption">
              {item.likes ? item.likes.length : 0}
            </Typography>
          </IconButton>

          <IconButton className={classes.iconButton}>
            <InsertCommentIcon title="Reviews" />
            <Typography style={{ paddingLeft: "5px" }} variant="caption">
              {item.reviews ? item.reviews.length : 0}
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
                variant="contained"
                color="primary"
              >
                <EditIcon style={{ marginLeft: "2px", marginBottom: "2px" }} />
              </Button>
            </Tooltip>
            <Tooltip title="Delete item">
              <Button
                className={classes.actionButton}
                onClick={onDelete}
                variant="contained"
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
                variant="contained"
              >
                <RemoveRedEyeIcon
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
