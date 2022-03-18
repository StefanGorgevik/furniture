import { SAVE_STATS } from "../stats/statsTypes";

const initState = {
  stats: { users: 0, furniture: 0 },
};

const statsReducer = (state = initState, { type, data }) => {
  switch (type) {
    case SAVE_STATS:
      return { ...initState, stats: data };
    default:
      return state;
  }
};

export default statsReducer;
