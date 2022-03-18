const sortByLetter = (array, order) => {
  if (order === "asc") {
    return array.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else {
    return array.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
};

const sortByPrice = (array, order) => {
  if (order === "asc") {
    return array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else {
    return array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }
};

const sortByLikes = (array, order) => {
  if (order === "asc") {
    return array.sort(
      (a, b) => parseFloat(a.likes.length) - parseFloat(b.likes.length)
    );
  } else {
    return array.sort(
      (a, b) => parseFloat(b.likes.length) - parseFloat(a.likes.length)
    );
  }
};

const sortByReviews = (array, order) => {
  if (order === "asc") {
    return array.sort(
      (a, b) => parseFloat(a.reviews.length) - parseFloat(b.reviews.length)
    );
  } else {
    return array.sort(
      (a, b) => parseFloat(b.reviews.length) - parseFloat(a.reviews.length)
    );
  }
};
export const sortByDate = (array, order) => {
  if (order === "asc") {
    return array.sort(function (a, b) {
      return new Date(a.createdOn) - new Date(b.createdOn);
    });
  } else {
    return array.sort(function (a, b) {
      return new Date(b.createdOn) - new Date(a.createdOn);
    });
  }
};

const sort = (array, sortOptions) => {
  let sorted;
  let { filter, order } = sortOptions;
  if (filter === "name") {
    sorted = sortByLetter(array, order);
  } else if (filter === "price") {
    sorted = sortByPrice(array, order);
  } else if (filter === "likes") {
    sorted = sortByLikes(array, order);
  } else if (filter === "reviews") {
    sorted = sortByReviews(array, order);
  } else if (filter === "date") {
    sorted = sortByDate(array, order);
  }

  return sorted;
};

export default sort;
