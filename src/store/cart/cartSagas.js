import { put } from "redux-saga/effects";
import { setActionStatus, closeModal } from "store/ui/uiActions";
import { saveCartDataAction, getCartDataAction } from "./cartActions";
import { fetchRequest } from "utils/fetch";

const getTotalPrice = (array) => {
  let total = 0;
  for (let item of array) {
    total += item.price;
  }
  return total;
};

export function* getCartData() {
  const path = `cart/get`;
  try {
    const res = yield fetchRequest(path, "GET", null);
    let totalPrice = 0;
    if (res.success) {
      totalPrice = getTotalPrice(res.cartData);
    }
    yield put(
      saveCartDataAction({
        items: res.cartData ? res.cartData : [],
        totalPrice,
      })
    );
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* addToCart({ data }) {
  const path = `cart/add`;
  try {
    const res = yield fetchRequest(path, "POST", data);
    let messageType = "";
    if (res.success) {
      messageType = "success";
    } else {
      messageType = "error";
    }
    yield put(setActionStatus(messageType, res.message));
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* removeFromCart({ id }) {
  const path = `cart/remove-cart-item/${id}`;

  try {
    const res = yield fetchRequest(path, "POST", null);
    if (res.success) {
      yield put(setActionStatus("success", res.message));
      yield put(getCartDataAction());
    } else {
      yield put(setActionStatus("errpr", res.message));
    }
    yield put(closeModal());
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* emptyCart() {
  const path = `cart/empty-cart`;

  try {
    const res = yield fetchRequest(path, "POST", null);
    if (res.success) {
      yield put(setActionStatus("success", "Order successful!"));
      yield put(getCartDataAction());
    }
    yield put(closeModal());
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}
