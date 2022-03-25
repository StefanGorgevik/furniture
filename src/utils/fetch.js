import { setLoadingStart, setLoadingStop } from "store/ui/uiActions";
import { put } from "@redux-saga/core/effects";

const API_KEY = process.env.REACT_APP_API_KEY;

export function* fetchRequest(path, requestMethod, postData, isSearch) {
  const token = localStorage.getItem("user_token");
  const url = `https://furniture-e4787-default-rtdb.europe-west1.firebasedatabase.app/${path}${
    isSearch ? "&" : "?"
  }auth=${token}`;
  try {
    yield put(setLoadingStart());
    const response = yield fetch(url, {
      method: requestMethod,
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

export function* authRequest(data, path) {
  const firebaseURL = "https://identitytoolkit.googleapis.com/v1/";
  let url = `${firebaseURL}${path}?key=${API_KEY}`;

  try {
    yield put(setLoadingStart());

    const body = {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    };
    if (path === "accounts:signUp") {
      body["displayName"] = data.username;
    }
    const response = yield fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = yield response.json();
    yield put(setLoadingStop());

    const expiryTime = parseInt(res.expiresIn) * 1000;
    const expirationDate = new Date().getTime() + expiryTime;
    localStorage.setItem("expiresDate", JSON.stringify(expirationDate));

    return res;
  } catch (e) {
    yield put(setLoadingStop());
    throw new Error(e.message);
  }
}

export function* refreshTokenRequest(data) {
  const firebaseURL = "https://identitytoolkit.googleapis.com/v1/";
  let url = `${firebaseURL}token?key=${API_KEY}`;

  try {
    yield put(setLoadingStart());

    const response = yield fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = yield response.json();
    yield put(setLoadingStop());

    const expiryTime = parseInt(res.expiresIn) * 1000;
    const expirationDate = new Date().getTime() + expiryTime;
    localStorage.setItem("expiresDate", JSON.stringify(expirationDate));

    return res;
  } catch (e) {
    yield put(setLoadingStop());
    throw new Error(e.message);
  }
}

export function* sendPwResetRequest(data) {
  const firebaseURL =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=";

  let url = `${firebaseURL}${API_KEY}`;

  try {
    yield put(setLoadingStart());

    const response = yield fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = yield response.json();
    yield put(setLoadingStop());
    return res;
  } catch (e) {
    yield put(setLoadingStop());
    throw new Error(e.message);
  }
}
