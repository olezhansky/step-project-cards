import modal from "./modal/Modal.js";
import Card from "./Card.js";
import { register, registerMessage } from "./register.js";
import { getCards, getCard, createVisitCard } from "./ajax/api.js";
import { createRegisterForm, createVisitForm } from "./Form.js";
import { manual } from "./modal/manualContent.js";

const btnenter = document.querySelector(".btn-enter");
const btncreate = document.querySelector(".btn-create");
const btnSearch = document.querySelector(".btn-search");
const btnResetForm = document.querySelector(".btn-reset-serch-form");
const cardsFilterForm = document.querySelector(".cards_filter");
const headerText = document.querySelector(".header_text");
const cardsField = document.querySelector(".cards_field");
const mainText = document.querySelector(".main_text");
const filterCover = document.querySelector(".filter-cover");
const manualLink = document.querySelector(".manual-link");

mainText.textContent = "You are not authorized";
if (!sessionStorage.getItem("token")) {
  headerText.innerText = "Click login button to start";
} else {
  headerText.innerText = sessionStorage.getItem("email");
  btncreate.classList.add("btn-create-show");
  if (cardsField.innerHTML == "") {
    mainText.textContent = "No items...";
  } else if (cardsField.innerHTML !== "") {
    filterCover.classList.add("filter-cover-hide");
    mainText.classList.add("main_text-hide");
  }

  btnenter.remove();
  displayCards();
}
// =================== MODAL CLOSE =================================
const modalClose = document.querySelector(".close");
const modalCover = document.querySelector(".modal-cover");

modalClose.addEventListener("click", () => {
  modal.hide();
});

modalCover.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("modal-cover")) {
    modal.hide();
  }
});
manualLink.addEventListener("click", (event) => {
  event.preventDefault();
  modal.show("User manual", manual());
});
// =================== LOADER ==============================================
function renderLoader() {
  const loader = document.querySelector(".loader-overlay");
  loader.classList.add("active");
}
// =================================================================
function hideLoader() {
  const loader = document.querySelector(".loader-overlay");
  loader.classList.remove("active");
}
// ==================== ENTER (REGISTRATION) =============================================
btnenter.addEventListener("click", () => {
  modal.show("Enter your details", createRegisterForm.render());
  const regForm = document.querySelector(".form-container");
  const enterBtn = regForm.querySelector(".btn-modal");

  //========= Tooltip for validation =================
  const tooltipEmail = document.createElement("div");
  tooltipEmail.classList.add("tooltip-email");
  const inputEmailEl = document.querySelector('.input[type="text"]');
  inputEmailEl.after(tooltipEmail);
  const tooltipPassword = document.createElement("div");
  tooltipPassword.classList.add("tooltip-password");
  const inputPasswordlEl = document.querySelector('.input[type="password"]');
  inputPasswordlEl.after(tooltipPassword);
  //====================================================

  enterBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = regForm.elements["email"].value;
    const password = regForm.elements["password"].value;
    sessionStorage.setItem("email", regForm.elements["email"].value);

    //======== Validation the login form ===============
    if (email === "") {
      tooltipEmail.textContent = "You did not enter email";
      setTimeout(() => (tooltipEmail.textContent = ""), 2000);
      return;
    } else if (!email.includes("@")) {
      tooltipEmail.textContent = "You did not enter correct email";
      setTimeout(() => (tooltipEmail.textContent = ""), 2000);
      return;
    } else if (password === "") {
      tooltipPassword.textContent = "You did not enter password";
      setTimeout(() => (tooltipPassword.textContent = ""), 2000);
      return;
    }
    //===================================================

    const regToken = await register(email, password);

    if (!regToken || regToken === "Incorrect username or password") {
      modal.hide();
      modal.show(
        "Authorization details",
        registerMessage("Incorrect username or password", "error")
      );
      return false;
    } else if (regToken) {
      sessionStorage.setItem("token", regToken);
      modal.hide();
      modal.show(
        "Authorization details",
        registerMessage("Authorization completed successfully.", "success")
      );
      const btnSuccess = document.querySelector(".btn-middle");
      btnSuccess.addEventListener("click", (event) => {
        event.preventDefault();
        renderLoader();
        setTimeout(() => {
          displayCards();
          if (cardsField.innerHTML == "") {
            mainText.textContent = "No items...";
          } else if (cardsField.innerHTML !== "") {
            filterCover.classList.add("filter-cover-hide");
            mainText.classList.add("main_text-hide");
          }
          hideLoader();
        }, 1000);
      });
      headerText.innerText = sessionStorage.getItem("email");
      btncreate.classList.add("btn-create-show");
      btnenter.remove();
    }
  });
});

btncreate.addEventListener("click", () => {
  modal.show("Create visit form", createVisitForm.render());
  createVisitForm.showDoctorSelect();
  const modalSelect = document.querySelector(".modal-select");
  const createCardBtn = document.querySelector(".btn-modal");
  createCardBtn.style.display = "none";

  modalSelect.addEventListener("change", () => {
    const form = document.querySelector(".form-container");
    const cardType = modalSelect.value;
    createCardBtn.classList.remove("disabled");
    createVisitForm.clearForm();
    createVisitForm.showGeneralFields();
    createVisitForm.showCustomeFields(modalSelect.value);
    createCardBtn.style.display = "block";
    createCardBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const formGF = form.querySelector(".form-general-fields");
      const urgencySelect = form.querySelector(".urgency");
      const visitpurpose = form.elements["visitpurpose"].value;
      const description = form.elements["description"].value;
      const urgency = urgencySelect.value;
      const userName = form.elements["username"].value;
      let customFields = {};
      if (cardType === "Cardiologist") {
        const pressure = form.elements["pressure"].value;
        const bodymass = form.elements["bodymass"].value;
        const diseases = form.elements["diseases"].value;
        const age = form.elements["age"].value;
        customFields = { pressure, bodymass, diseases, age };
      } else if (cardType === "Dantist") {
        const lastvisitdate = form.elements["lastvisitdate"].value;
        customFields = { lastvisitdate };
      } else if (cardType === "Therapist") {
        const age = form.elements["age"].value;
        customFields = { age };
      }
      const visitTypeObj = { visitType: cardType };
      const visitStatus = { visitStatus: "Active" };
      const generalFields = { visitpurpose, description, urgency, userName };
      const userData = Object.assign(
        generalFields,
        customFields,
        visitTypeObj,
        visitStatus
      );

      createVisitCard(userData).then((newCarddata) => {
        const newCard = new Card(newCarddata);
        cardsField.append(newCard.render());
        // Скрываем надпись на рабочем поле о том что карточек нет
        mainText.classList.add("main_text-hide");
        modal.hide();
      });
      filterCover.classList.add("filter-cover-hide");
    });
  });
});

// =================================================================
//    Отображение карточек / фильтрация карточек
// =================================================================
export async function displayCards() {
  if (sessionStorage.getItem("token")) {
    const cards = await getCards();
    let cardsCount = cards.length;
    cards.forEach(async (cardData) => {
      const newCard = new Card(cardData);
      cardsField.append(newCard.render());
    });
    if (cardsCount === 0) {
      mainText.classList.remove("main_text-hide");
      mainText.textContent = "No items have been added";
      filterCover.classList.remove("filter-cover-hide");
    } else {
      filterCover.classList.add("filter-cover-hide");
    }
  }
}

export async function updateCard(id, targetCard) {
  const card = await getCard(id);
  const newCard = new Card(card);
  cardsField.replaceChild(newCard.render(), targetCard);
}

async function displaySearchResults(serchData) {
  const [
    searchText,
    searchPriority,
    searchStatus,
    searchSpecialist,
  ] = serchData;

  // Создаем пустые массивы для хранения карточек выборки по нужному элементу
  let filtered_Names = [];
  let filtered_priority = [];
  let filtered_status = [];
  let filtered_specialists = [];
  // Получаем все карточки
  const cards = await getCards();

  // ========= 1- поиск по именам ====================
  // Проверка на случай если в поле поиска ничего нет
  if (searchText) {
    let searchToLowerCase = searchText.toLowerCase();
    // console.log("To lower case result: ", strToLowerCase);
    const searchRegExp = new RegExp(searchToLowerCase);

    cards.forEach((card) => {
      const userNameToLowerCase = card.userName.toLowerCase();
      let isResult = userNameToLowerCase.match(searchRegExp);
      if (isResult) {
        filtered_Names.push(card);
      }
    });
  } else {
    filtered_Names = cards;
  }

  // ========= 2- поиск по срочности  ========================
  if (searchPriority !== "none") {
    filtered_priority = filtered_Names.filter(
      (card) => card.urgency === searchPriority
    );
  } else {
    filtered_priority = filtered_Names;
  }
  // ============ 3- поиск по статусу =====================
  if (searchStatus !== "none") {
    filtered_status = filtered_priority.filter(
      (card) => card.visitStatus === searchStatus
    );
  } else {
    filtered_status = filtered_priority;
  }
  // console.log(filtered_status);
  // ============== 4 - поиск по специалисту ===================
  if (searchSpecialist !== "none") {
    filtered_specialists = filtered_status.filter(
      (card) => card.visitType === searchSpecialist
    );
  } else {
    filtered_specialists = filtered_status;
  }
  // Чистим поле карточек
  cardsField.innerHTML = "";
  if (filtered_specialists.length === 0) {
    mainText.classList.remove("main_text-hide");
    mainText.textContent = "No matches found";
  } else {
    mainText.classList.add("main_text-hide");
    filtered_specialists.forEach((cardData) => {
      const newCard = new Card(cardData);
      cardsField.append(newCard.render());
    });
  }
}

// ============SEARCH=====================
btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  // const visitpurpose = form.elements["visitpurpose"].value;
  const specialist = cardsFilterForm.elements["specialist"].value;
  const priority = cardsFilterForm.elements["priority"].value;
  const status = cardsFilterForm.elements["status"].value;
  const searchText = cardsFilterForm.elements["find-card-text"].value;
  // console.log(specialist, priority, status, searchText);
  let serchData = [searchText, priority, status, specialist];
  // console.log(serchData);
  displaySearchResults(serchData);
});
// ============RESET__Чистим поля формы поиска==================
btnResetForm.addEventListener("click", (event) => {
  event.preventDefault();
  cardsFilterForm.reset();
  cardsField.innerHTML = "";
  mainText.classList.add("main_text-hide");
  displayCards();
});

btnResetForm.addEventListener("mouseenter", (event) => {
  let target = event.target;
  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml) return;
  // ...создадим элемент для подсказки

  const tooltipElem = document.createElement("div");
  tooltipElem.className = "tooltip";
  tooltipElem.innerHTML = tooltipHtml;
  tooltipElem.id = "refresh";
  document.body.append(tooltipElem);

  // спозиционируем его сверху от аннотируемого элемента (top-center)
  let coords = target.getBoundingClientRect();

  let left =
    coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2 + 10;
  if (left < 0) left = 0; // не заезжать за левый край окна

  let top = coords.top - tooltipElem.offsetHeight + 80;

  tooltipElem.style.left = left + "px";
  tooltipElem.style.top = top + "px";
});
btnResetForm.addEventListener("mouseleave", (event) => {
  let tooltipElem = document.getElementById("refresh");
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
});

const matches = document.body.querySelectorAll("div.card");
const matches2 = cardsField.querySelectorAll(".user-card");

