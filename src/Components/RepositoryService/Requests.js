import HttpCaller from "./ApiCaller";

// GET ALL STORES
export const SearchStore = async (name) => {
  const response = await HttpCaller(
    `products/store-list/?search=${name}`,
    "GET"
  );
  return response;
};

// GET ALL STORES
export const GetAllStores = async (page, name = "") => {
  const apiUrl =
    name.length > 0
      ? `products/store-list/?search=${name}`
      : `products/store-list/?page=${page}`;
  let response = await HttpCaller(apiUrl, "GET");
  if (!response.results) {
    return [];
  }
  const newListOfStores = response?.results?.filter(
    ({ scraping_status }) => scraping_status === "UNSCRAPED"
  );
  // console.log({ AllStore: newListOfStores });
  return newListOfStores;
};

// GET ONGOING STORES
export const GetAllOngoingStore = async (page, name = "") => {
  const apiUrl =
    name.length > 0
      ? `products/store-list/?search=${name}`
      : `products/store-inprogress/?page=${page}`;
  const response = await HttpCaller(apiUrl, "GET");
  if (!response.results) {
    return [];
  }
  const newListOfStores = response?.results?.filter(
    ({ scraping_status }) => scraping_status === "INPROGRESS"
  );
  // console.log({ Ongoing: newListOfStores });
  return newListOfStores;
};

// GET ALL RESULT
export const GetAllStoresResult = async (page, name = "") => {
  const apiUrl =
    name.length > 0
      ? `products/store-list/?search=${name}`
      : `products/store-scrapped/?page=${page}`;
  const response = await HttpCaller(apiUrl, "GET");
  if (!response.results) {
    return [];
  }
  const newListOfStores = response?.results.filter(
    ({ scraping_status }) => scraping_status === "SCRAPED"
  );
  // console.log({ Result: newListOfStores });
  return newListOfStores;
};

// GET ALL PRODUCTS
export const GetAllProducts = async (id) => {
  const apiUrl = "tasks/staging/list/";
  const response = await HttpCaller(apiUrl, "GET");
  if (!response) {
    return [];
  }
  const newListOfProducts = response?.filter(({ store_id }) => store_id === id);
  return newListOfProducts;
};

// GET ALL GetAllUnscraped
export const GetAllUnscraped = async (
  page,
  name = "",
  ordering = "-created_at"
) => {
  const apiUrl =
    name.length > 0
      ? `products/store-unscrapped/?search=${name}`
      : `products/store-unscrapped/?page=${page}&ordering=${ordering}`;
  const response = await HttpCaller(apiUrl, "GET");
  return response;
};
// GET ALL GetAllinprogress
export const GetAllinprogress = async (page, name = "") => {
  const apiUrl =
    name.length > 0
      ? `products/store-inprogress/?search=${name}`
      : `products/store-inprogress/?page=${page}`;
  const response = await HttpCaller(apiUrl, "GET");
  return response;
};
// GET ALL GetAllScrapped
export const GetAllScrapped = async (page, name = "") => {
  const apiUrl =
    name.length > 0
      ? `products/store-scrapped/?search=${name}`
      : `products/store-scrapped/?page=${page}`;
  const response = await HttpCaller(apiUrl, "GET");
  return response;
};

// GET ALL GetAllArchived
export const GetAllArchived = async (page, name = "") => {
  const apiUrl =
    name.length > 0
      ? `products/store-archived/?search=${name}`
      : `products/store-archived/?page=${page}`;
  const response = await HttpCaller(apiUrl, "GET");
  return response;
};

// START SCRAPING
export const StartScraping = async (Payload) => {
  const response = await HttpCaller(`tasks/start/${Payload}/`, "POST", null, {
    "Content-Type": "application/json",
  });
  console.log(`scrapingResponse==>`, response);
  return response;
};

// EDIT PRODUCT
export const EditProduct = async (job, Payload) => {
  const response = await HttpCaller(
    `tasks/staging/update/${job.id}/`,
    "PATCH",
    Payload,
    {
      "Content-Type": "application/json",
    }
  );
  // console.log(`scrapingResponse==>`, response);
  return response;
};

// DELETE PRODUCT
export const DELETEProduct = async (id) => {
  const response = await HttpCaller(`tasks/staging/delete/${id}/`, "DELETE");
  // console.log(`scrapingResponse==>`, response);
  return response;
};

// CREATE ADMIN
export const CreateAdmin = async (mode, whichIdToUse) => {
  console.log({ mode, whichIdToUse });
  const response = await HttpCaller(
    `user/scroles/${mode}/${whichIdToUse}/`,
    "POST",
    {
      roles: ["X", "X", "X", "X"],
    },
    {
      "Content-Type": "application/json",
    }
  );
  return response;
};

// DELETE ADMIN
export const DeleteAdmin = async (mode, whichIdToUse) => {
  const response = await HttpCaller(
    `user/scroles/${mode}/${whichIdToUse}/`,
    "DELETE"
  );
  return response;
};

// FIND ALL ADMIN
export const FindAllAdmin = async (buttonIdentity) => {
  const response = await HttpCaller(`user/${buttonIdentity.api}`, "GET");

  if (buttonIdentity.api === "tbuser-list") {
    if (!response) {
      return [];
    }
    const newListOfAdmins = response.filter(
      ({ user_type }) =>
        user_type === "administrator" || user_type === "employee"
    );
    return newListOfAdmins;
  }
  return response;
};

export const PublishProducts = async (store_id) => {
  const response = await HttpCaller(
    `tasks/staging/move-products/${store_id}/`,
    "POST"
  );
  return response;
};

export const GetAdminDetailsRoleDetails = async (id) => {
  try {
    // console.log(id);

    const result = await fetch(
      `http://51.20.9.134/user/scroles/detail/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

export const OnUpdateCreateUserRole = async (
  user_type,
  RoleSelected,
  iduse,
  id
) => {
  // console.log({ user_type, RoleSelected, iduse,id});
  try {
    const result = await fetch(
      `http://51.20.9.134/user/scroles/update/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_type: user_type,
          roles: RoleSelected,
          iduse: iduse,
        }),
      }
    );
    return result;
  } catch (err) {
    console.log(err.message);
  }
};
