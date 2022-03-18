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

export function* authRequest(data, path) {
  const firebaseURL = `https://identitytoolkit.googleapis.com/v1/accounts:`;
  const API_KEY = "AIzaSyBxpBch7kcgXQB9hMJrFipVDV9RUBxiijg";
  const url = `${firebaseURL}${path}?key=${API_KEY}`;
  try {
    yield put(setLoadingStart());

    const body = {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    };
    if (path === "signUp") {
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

    return res;
  } catch (e) {
    yield put(setLoadingStop());
    throw new Error(e.message);
  }
}
