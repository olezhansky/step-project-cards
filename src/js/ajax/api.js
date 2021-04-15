const REQUEST_URL = "https://ajax.test-danit.com/api/v2/cards";
const token = sessionStorage.getItem("token");

export const getCards = async () => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(REQUEST_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const cards = await response.json();
  return cards;
};

export const getCard = async (cardId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${REQUEST_URL}/${cardId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const card = await response.json();
  return card;
};

export const createVisitCard = async (userData) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const newUserDada = await response.json();
  return newUserDada;
};

export const deleteVisitCard = (cardId) => {
  const token = sessionStorage.getItem("token");
  fetch(`${REQUEST_URL}/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editVisitCard = (userData, cardId) => {
  const token = sessionStorage.getItem("token");
  fetch(`${REQUEST_URL}/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
};
