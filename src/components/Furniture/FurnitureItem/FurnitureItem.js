import React, { useMemo } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EuroIcon from "@material-ui/icons/Euro";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Tooltip,
  Box,
  Icon,
} from "@material-ui/core";
import useStyles from "./styles";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useScreenSize } from "hooks/breakpoints";

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
  const { matchesSM } = useScreenSize();
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
      <CardContent
        style={{
          display: "flex",
          width: matchesSM ? "325px" : "350px",
          maxWidth: matchesSM ? "325px" : "350px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title={item.category}>
          <Icon variant="outlined" color="primary">
            <img
              style={{
                width: "25px",
                height: "25px",
              }}
              src={require(`assets/images/categoriesIcons/${itemCategory}.png`)}
              alt="category"
            />
          </Icon>
        </Tooltip>
        <Tooltip title={item && item.name.length < 20 ? "" : item.name}>
          <Typography variant="caption">
            {item.name.substr(0, 20)} {item.name.length > 20 && "..."}
          </Typography>
        </Tooltip>

        <Tooltip title="Owned">
          <Icon variant="outlined" color="primary">
            {isMine && <VerifiedUserIcon />}
          </Icon>
        </Tooltip>
      </CardContent>
      <CardContent className={classes.cardContent}>
        <img className={classes.media} src={item.image} alt={item.name} />
      </CardContent>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Tooltip title="Likes">
          <Box className={classes.iconButton}>
            <ThumbUpIcon />
            <Typography variant="caption">
              {item.likes ? item.likes.length : 0}
            </Typography>
          </Box>
        </Tooltip>

        <Tooltip title="Reviews">
          <Box className={classes.iconButton}>
            <InsertCommentIcon />
            <Typography variant="caption">
              {item.reviews ? item.reviews.length : 0}
            </Typography>
          </Box>
        </Tooltip>

        <Tooltip title="Price">
          <Box className={classes.iconButton}>
            <EuroIcon />
            <Typography variant="caption">{price}</Typography>
          </Box>
        </Tooltip>
      </CardContent>

      {showTools && (
        <CardActions
          style={{
            justifyContent: !showIcon ? "space-evenly" : "flex-end",
            alignItems: "center",
            marginTop: "1em",
            backgroundColor: "transparent",
            width: "90%",
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
              <DeleteIcon style={{ marginLeft: "2px", marginBottom: "2px" }} />
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
    </Card>
  );
};
