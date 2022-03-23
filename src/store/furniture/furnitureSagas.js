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
  getAllReviewsAction,
  editFurnitureAction,
  saveSearchedFurnitureAction,
} from "./furnitureActions";
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
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
    let finalArray = [];
    if (res) {
      let array = transformArray(res);
      finalArray = sortByCategory(array);
    }
    yield put(saveAllFurnitureAction(finalArray));
  } catch (e) {
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
      likes: [],
      reviews: [],
    });
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
    if (res) {
      yield put(setActionStatus("success", "Furniture saved!"));
      // yield put(push("/furniture/all"));
    }
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* openFurnitureItem({ data }) {
  const { id, shouldRedirect } = data;
  const path = `furniture/${id}.json`;

  try {
    const res = yield fetchRequest(path, "GET", null);
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
    if (res) {
      if (res.likes) {
        res.likes = Object.keys(res.likes).map((r) => res.likes[r]);
      }
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
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* searchFurniture({ search }) {
  const path = `furniture.json?orderBy="name"&equalTo=${JSON.stringify(
    search
  )}`;
  try {
    const res = yield fetchRequest(path, "GET", null, true);
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
    let array = [];
    if (res) {
      array = transformArray(res);
    }
    if (array.length === 0) {
      yield put(searchNotFoundAction());
    } else {
      yield put(saveSearchedFurnitureAction(array));
    }
  } catch (error) {
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
  const user = localStorage.getItem("username");
  try {
    const furniture = yield fetchRequest(path, "GET");
    if (furniture.error) {
      yield put(setActionStatus("error", furniture.error));
      return;
    }
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
    const res = yield fetchRequest(path, "PATCH", {
      ...furniture,
      reviews: allReviews,
    });
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
    let messageType = "success";
    if (res) {
      yield put(getAllReviewsAction(id));

      yield put(openFurnitureAction({ id, shouldRedirect: false }));
    } else {
      messageType = "error";
    }
    yield put(setActionStatus(messageType, "Review submitted successfully!"));
  } catch (error) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
}

export function* getAllReviews({ id }) {
  const path = `furniture/${id}.json`;
  try {
    const furniture = yield fetchRequest(path, "GET");
    if (furniture.error) {
      yield put(setActionStatus("error", furniture.error));
      return;
    }
    let allReviews = [];

    if (furniture && furniture.reviews) {
      allReviews = Object.keys(furniture.reviews).map((key) => ({
        id: key,
        ...furniture.reviews[key],
      }));
    }
    yield put(saveAllReviewsAction(allReviews));
  } catch (e) {
    console.log(e);
  }
}

export function* likeFurniture({ data }) {
  const { id, type } = data;
  const path = `furniture/${id}.json`;
  const user = localStorage.getItem("username");
  try {
    const res = yield fetchRequest(path, "GET");
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
    let message = "";
    if (res) {
      let likes = [];
      if (res.likes) {
        likes = Object.keys(res.likes).map((key) => ({
          id: key,
          user: res.likes[key].user,
        }));
      }

      if (type === "like") {
        message = "Furniture liked!";
        likes.push({ id: Math.random(), user });
      } else {
        message = "Furniture unliked!";

        likes = likes.filter((l) => l.user !== user);
      }
      const likeResponse = yield fetchRequest(path, "PATCH", { ...res, likes });
      if (likeResponse.error) {
        yield put(setActionStatus("error", likeResponse.error));
        return;
      }
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
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
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
  try {
    const res = yield fetchRequest(path, "DELETE");
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
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
    if (res && res.error) {
      yield put(setActionStatus("error", res.error));
      return;
    }
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