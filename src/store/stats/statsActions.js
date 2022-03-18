import { GET_STATS, SAVE_STATS } from "../stats/statsTypes";

export const getStatsAction = () => ({ type: GET_STATS });
export const saveStatsAction = (data) => ({ type: SAVE_STATS, data });
