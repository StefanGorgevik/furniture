import { put } from "redux-saga/effects";
import { setActionStatus } from "store/ui/uiActions";
import { saveStatsAction } from "store/stats/statsActions";
import { fetchRequest } from "utils/fetch";

export function* getStats() {
  const path = `stats`;
  try {
    const res = yield fetchRequest(path, "GET");
    yield put(saveStatsAction(res));
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}
