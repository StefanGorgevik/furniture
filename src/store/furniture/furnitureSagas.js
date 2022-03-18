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

export function* getAllFurniture({ page }) {
  // const path = `furniture/all?page=${page}`;
  const path = `furniture/allWithoutPaging`;

  try {
    const res = yield fetchRequest(path, "GET", null);
    const sorted = sortByCategory(res);
    yield put(saveAllFurnitureAction(sorted));
  } catch (e) {
    console.log("error", e);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* saveNewFurniture({ data }) {
  const path = `furniture/create`;
  try {
    const res = yield fetchRequest(path, "POST", data);
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
  const path = `furniture/details/${id}`;

  try {
    const res = yield fetchRequest(path, "GET", null);
    if (res) {
      yield put(saveCurrentFurnitureAction(res));
      if (shouldRedirect) {
        yield put(push(`/furniture/details/${res.id}`));
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
  const path = `furniture/mine`;

  try {
    const res = yield fetchRequest(path, "GET");
    const totalLikes = calculateTotalLikes(res);
    yield put(saveTotalLikes(totalLikes));
    yield put(saveMyFurnitureAction(res));
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
