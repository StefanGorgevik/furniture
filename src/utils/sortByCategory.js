const sortByCategory = (items) => {
  let allCategories = {
    chairs: [],
    tables: [],
    desks: [],
    dressers: [],
    cupboards: [],
    beds: [],
    couches: [],
    uncategorized: [],
  };

  for (let furniture of items) {
    switch (furniture.category) {
      case "Chair":
        allCategories.chairs.push(furniture);
        break;
      case "Table":
        allCategories.tables.push(furniture);
        break;
      case "Desk":
        allCategories.desks.push(furniture);
        break;
      case "Dresser":
        allCategories.dressers.push(furniture);
        break;
      case "Cupboard":
        allCategories.cupboards.push(furniture);
        break;
      case "Bed":
        allCategories.beds.push(furniture);
        break;
      case "Couch":
        allCategories.couches.push(furniture);
        break;
      case "Uncategorized":
        allCategories.uncategorized.push(furniture);
        break;
      default:
        break;
    }
  }

  console.log("allCate", allCategories);
  return allCategories;
};

export default sortByCategory;
