import React, { useEffect } from "react";
import styles from "./Stats.module.css";
import { connect } from "react-redux";
import { getStatsAction } from "store/stats/statsActions";
import { getMyFurnitureAction } from "store/furniture/furnitureActions";
import { bindActionCreators } from "redux";
import UsersIcon from "components/UI/icons/UsersIcon";
import ChartIcon from "components/UI/icons/ChartIcon";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Grid, Typography } from "@material-ui/core";

const StatsModalItem = ({ text, info, icon }) => {
  return (
    <Grid item className={styles["stats-modal-item"]}>
      {icon}
      <Typography
        align="left"
        variant="caption"
        style={{
          fontSize: "1.25rem",
        }}
      >
        {text}:
      </Typography>
      <Typography variant="caption">{info}</Typography>
    </Grid>
  );
};

const Stats = ({
  getStatsAction,
  stats,
  getMyFurnitureAction,
  myFurniture,
  totalLikes,
}) => {
  useEffect(() => {
    getStatsAction();
    getMyFurnitureAction();
  }, [getStatsAction, getMyFurnitureAction]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography
          variant="h3"
          align="center"
          style={{
            textTransform: "uppercase",
            marginTop: "1em",
            marginBottom: "1em",
          }}
        >
          Stats
        </Typography>
      </Grid>
      <Grid item container direction="column">
        <StatsModalItem text="Users" info={stats.users} icon={<UsersIcon />} />
        <StatsModalItem
          text="Total furniture"
          info={stats.furniture}
          icon={<ChartIcon />}
        />
        <StatsModalItem
          text="My furniture"
          info={myFurniture.length}
          icon={<TransferWithinAStationIcon />}
        />
        <StatsModalItem
          text="Total likes"
          info={totalLikes}
          icon={<ThumbUpIcon />}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  stats: state.statsReducer.stats,
  myFurniture: state.furnitureReducer.myFurniture,
  totalLikes: state.furnitureReducer.totalLikes,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getStatsAction,
      getMyFurnitureAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
