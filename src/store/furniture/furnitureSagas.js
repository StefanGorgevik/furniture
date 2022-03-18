import { push } from "connected-react-router";
import { put } from "redux-saga/effects";
import { setActionStatus, closeModal } from "store/ui/uiActions";
import {
  saveAllFurnitureAction,
  saveCurrentFurnitureAction,
  saveAllReviewsAction,
  saveMyFurnitureAction,
  getMyFurnitureAction,
  openFurnitureAction,
  searchNotFoundAction,
  saveTotalLikes,
  editFurnitureAction,
  saveSearchedFurnitureAction,
} from "./furnitureActions";
import { getStatsAction } from "store/stats/statsActions";
import { fetchRequest } from "utils/fetch";
import sortByCategory from "utils/sortByCategory";

const transformArray = (array) => {
  let transformed = [];
  Object.keys(array).forEach((key) => {
    transformed.push({ ...array[key], id: key });
  });
  return transformed;
};
export function* getAllFurniture({ page }) {
  // const path = `furniture/all?page=${page}`;
  const path = `furniture.json`;

  try {
    const res = yield fetchRequest(path, "GET", null);
    console.log("RES", res);
    if (res.error) {
      return;
    } else {
      let array = transformArray(res);

      const sorted = sortByCategory(array);
      console.log("FINAL", sorted);
      yield put(saveAllFurnitureAction(sorted));
    }
  } catch (e) {
    console.log("error", e);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* saveNewFurniture({ data }) {
  const path = `furniture.json`;
  console.log("data", data);
  const user = localStorage.getItem("user_email");
  try {
    const res = yield fetchRequest(path, "POST", { ...data, user });
    console.log("CHK FINAL RESP", res);
    return;
    let messageType = "success";
    if (res.success) {
      yield put(getStatsAction());
      // yield put(push("/furniture/all"));
    } else {
      messageType = "error";
    }
    let message = res.message;
    if (res.errors) {
      let values = Object.values(res.errors);
      for (let value of values) {
        message += " " + value;
      }
    }
    yield put(setActionStatus(messageType, message));
  } catch (e) {
    console.log("error", e);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* openFurnitureItem({ data }) {
  const { id, shouldRedirect } = data;
  const path = `furniture/${id}.json`;

  try {
    const res = yield fetchRequest(path, "GET", null);
    if (res.error) {
      return;
    } else {
      console.log("RES FROM DETAILS", res);
      yield put(saveCurrentFurnitureAction(res));
      if (shouldRedirect) {
        yield put(push(`/furniture/details/${id}`));
      } else {
        const furniture = {
          name: res.name,
          category: res.category,
          year: res.year,
          description: res.description,
          price: res.price,
          image: res.image,
          material: res.material,
        };
        yield put(editFurnitureAction({ furniture, editing: true }));
      }
    }
  } catch (e) {
    console.log("error", e);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* searchFurniture({ search }) {
  const path = `furniture/all?search=${search}`;
  try {
    const res = yield fetchRequest(path, "GET");
    if (res && res.length > 0) {
      yield put(push(`/furniture/allSearched`));
      console.log("allSearched", res);
      yield put(saveSearchedFurnitureAction(res));
    } else {
      yield put(searchNotFoundAction());
    }
  } catch (error) {
    console.log(error);
    yield put(
      setActionStatus(
        "error",
        "Search unsuccessful! Unexpected error occurred!"
      )
    );
  }
}

export function* submitReview({ data, id }) {
  const path = `furniture/details/${id}/reviews/create`;

  try {
    const res = yield fetchRequest(path, "POST", data);
    let messageType = "success";
    if (res.success) {
      yield put(openFurnitureAction({ id: Number(id), shouldRedirect: false }));
    } else {
      messageType = "error";
    }
    yield put(setActionStatus(messageType, res.message));
  } catch (error) {
    console.log(error);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* getAllReviews({ id }) {
  const path = `furniture/details/${id}/reviews`;
  try {
    const res = yield fetchRequest(path, "GET");
    yield put(saveAllReviewsAction(res));
  } catch (e) {
    console.log(e);
  }
}

export function* likeFurniture({ data }) {
  const { id, type } = data;
  console.log(data);
  const path = `furniture/details/${id}/${type}`;

  try {
    const res = yield fetchRequest(path, "POST");
    let messageType = "success";
    if (!res.success) {
      messageType = "error";
    }
    yield put(openFurnitureAction({ id: Number(id), shouldRedirect: false }));
    yield put(setActionStatus(messageType, res.message));
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

const calculateTotalLikes = (furniture) => {
  let totalLikes = 0;
  for (let item of furniture) {
    if (item.likes.length > 0) {
      totalLikes += item.likes.length;
    }
  }
  return totalLikes;
};

export function* getMyFurniture() {
  const path = `furniture.json`;

  try {
    const res = yield fetchRequest(path, "GET");
    console.log("res", res);
    if (res.error) {
      return;
    } else {
      let array = transformArray(res);
      // const totalLikes = calculateTotalLikes(array);
      // yield put(saveTotalLikes(totalLikes));
      yield put(saveMyFurnitureAction(array));
    }
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* deleteFurniture({ data }) {
  const { id, shouldRedirect } = data;
  const path = `furniture/delete/${id}`;

  try {
    const res = yield fetchRequest(path, "POST");
    if (res.success) {
      yield put(closeModal());
      yield put(setActionStatus("success", res.message));
      yield put(getMyFurnitureAction());
      if (shouldRedirect) {
        yield put(push(`/furniture/my-furniture`));
      }
    }
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* editFurniture({ data }) {
  const path = `furniture/edit/${data.id}`;

  try {
    const res = yield fetchRequest(path, "PUT", data.data);
    console.log(res);
    if (res.success) {
      yield put(
        openFurnitureAction({ id: Number(data.id), shouldRedirect: true })
      );
      yield put(push(`/furniture/details/${data.id}`));
    }
    yield put(setActionStatus("error", res.message));
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}
