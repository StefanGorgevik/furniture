import { setLoadingStart, setLoadingStop } from "store/ui/uiActions";
import { put } from "@redux-saga/core/effects";

export function* fetchRequest(path, requestMethod, postData) {
  const url = `http://localhost:5000/${path}`;
  const token = localStorage.getItem("user_token");

  try {
    yield put(setLoadingStart());
    const response = yield fetch(url, {
      method: requestMethod,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: postData ? JSON.stringify(postData) : null,
    });
    const res = yield response.json();
    yield put(setLoadingStop());

    return res;
  } catch (e) {
    yield put(setLoadingStop());
    throw new Error(e.message);
  }
}
