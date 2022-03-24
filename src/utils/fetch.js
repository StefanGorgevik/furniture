import { setLoadingStart, setLoadingStop } from "store/ui/uiActions";
import { put } from "@redux-saga/core/effects";

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
  const API_KEY = "AIzaSyBxpBch7kcgXQB9hMJrFipVDV9RUBxiijg";
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
  const API_KEY = "AIzaSyBxpBch7kcgXQB9hMJrFipVDV9RUBxiijg";
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

    // const expiryTime = 10 * 1000;
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
  const API_KEY = "AIzaSyBxpBch7kcgXQB9hMJrFipVDV9RUBxiijg";
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
