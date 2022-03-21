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
  try {
    const res = yield fetchRequest("furniture.json", "GET", null);
    console.log("RES", res);
    let finalArray = [];
    if (res) {
      let array = transformArray(res);
      finalArray = sortByCategory(array);
    }
    console.log("FINAL GET ALL", finalArray);
    yield put(saveAllFurnitureAction(finalArray));
  } catch (e) {
    console.log("error", e);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* saveNewFurniture({ data }) {
  const path = `furniture.json`;
  const user = localStorage.getItem("user_email");
  try {
    const res = yield fetchRequest(path, "POST", {
      ...data,
      createdBy: user,
      createdOn: new Date(),
    });
    console.log("CHK FINAL RESP", res);
    if (res) {
      // yield put(getStatsAction());
      yield put(setActionStatus("success", "Furniture saved!"));
      // yield put(push("/furniture/all"));
    }
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
    if (res) {
      console.log("RES FROM DETAILS", res);
      let likedBy = [];
      if (res.likes) {
        res.likes = Object.keys(res.likes).map((r) => ({
          id: r,
          user: res.likes[r],
        }));
        console.log("RES FROM DETAILS", res.likes);
      }
      console.log("RES FROM DETAILS FINAL", res);
      yield put(saveCurrentFurnitureAction({ ...res, id }));
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
          id,
        };
        yield put(editFurnitureAction({ furniture, editing: true }));
      }
    }
  } catch (e) {
    console.log(e);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* searchFurniture({ search }) {
  const path = `furniture.json?orderBy="name"&equalTo=${JSON.stringify(
    search
  )}`;
  try {
    const res = yield fetchRequest(path, "GET");
    if (res) {
      yield put(push(`/furniture/search`));
      console.log("search", res);
      let array = [];
      if (res) {
        array = transformArray(res);
      }
      if (array.length === 0) {
        yield put(searchNotFoundAction());
      } else {
        yield put(saveSearchedFurnitureAction(array));
      }
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
  const path = `furniture/${id}.json`;
  console.log("data SUBMIT", data, id);
  const user = localStorage.getItem("username");
  try {
    const furniture = yield fetchRequest(path, "GET");
    console.log("SUBMIT furniture", furniture);
    let allReviews = [];
    if (furniture && furniture.reviews) {
      allReviews = Object.keys(furniture.reviews).map((r) => ({
        id: r,
        ...furniture.reviews[r],
      }));
      allReviews.push({ ...data, user, createdOn: new Date() });
    } else {
      allReviews.push({ ...data, user, createdOn: new Date() });
    }
    console.log("allREviews SUBMIT", allReviews);
    const res = yield fetchRequest(path, "PATCH", {
      ...furniture,
      reviews: allReviews,
    });
    let messageType = "success";
    if (res) {
      yield put(openFurnitureAction({ id, shouldRedirect: false }));
    } else {
      messageType = "error";
    }
    yield put(setActionStatus(messageType, "Review submitted successfully!"));
  } catch (error) {
    console.log(error);
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* getAllReviews({ id }) {
  const path = `furniture/${id}.json`;
  console.log("GET ALL SUBMIT PAT", path);
  try {
    const furniture = yield fetchRequest(path, "GET");
    let allReviews = [];

    if (furniture && furniture.reviews) {
      allReviews = Object.keys(furniture.reviews).map((key) => ({
        id: key,
        ...furniture.reviews[key],
      }));
    }
    console.log("SUBMIT ALL REVIEWS", allReviews);
    yield put(saveAllReviewsAction(allReviews));
  } catch (e) {
    console.log(e);
  }
}

export function* likeFurniture({ data }) {
  const { id, type } = data;
  const path = `furniture/${id}.json`;
  const user = localStorage.getItem("user_email");
  console.log("LIKE", data, type, user);
  try {
    const res = yield fetchRequest(path, "GET");
    console.log("LIKE FURNITURE res 1", res);
    let message = "";
    if (res) {
      let likes = [];
      if (res.likes) {
        likes = Object.keys(res.likes).map((r) => ({
          id: r,
          user: res.likes[r],
        }));
        console.log("RES FROM DETAILS", res.likes);
      }

      if (type === "like") {
        message = "Furniture liked!";
        likes.push(user);
      } else {
        message = "Furniture unliked!";

        likes = likes.filter((l) => l.user !== user);
      }
      const likeResponse = yield fetchRequest(path, "PATCH", { ...res, likes });

      if (likeResponse) {
        yield put(openFurnitureAction({ id: id, shouldRedirect: false }));
        yield put(setActionStatus("success", message));
      }
    }
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* getMyFurniture() {
  const path = `furniture.json`;
  const user = localStorage.getItem("user_email");
  try {
    const res = yield fetchRequest(path, "GET");
    let array = [];
    if (res) {
      array = transformArray(res);
      array = array.filter((item) => item.createdBy === user);
    }
    yield put(saveMyFurnitureAction(array));
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* deleteFurniture({ data }) {
  const { id, shouldRedirect } = data;
  const path = `furniture/${id}.json`;
  console.log(data);
  try {
    yield fetchRequest(path, "DELETE");
    yield put(closeModal());
    yield put(setActionStatus("success", "Furniture deleted successfully!"));
    yield put(getMyFurnitureAction());
    if (shouldRedirect) {
      yield put(push(`/furniture/my-furniture`));
    }
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* editFurniture({ data }) {
  const path = `furniture/${data.id}.json`;
  try {
    const res = yield fetchRequest(path, "PATCH", data.data);
    if (res) {
      yield put(openFurnitureAction({ id: data.id, shouldRedirect: true }));
      yield put(push(`/furniture/details/${data.id}`));
      yield put(setActionStatus("success", "Furniture edited successfully!"));
    } else {
      yield put(setActionStatus("error", "Unexpected error occurred!"));
    }
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}
