import Component from "./component.js";
import { deleteVisitCard, getCards } from "./ajax/api.js";
import modal from "./modal/Modal.js";
import {
  createDeleteCardForm,
  createEditForm,
} from "./Form.js";
import { editCardForm } from "./editCardForm.js";
import {
  dragStart,
  dragEnd,
  dragOver,
  dragEnter,
  dragLeave,
  dragDrop,
} from "./dragNDrop.js";

class Card extends Component {
  constructor(userData) {
    super();
    this.userData = userData;
    this.elem = document.createElement("div");
    this.expanded = false;
  }

  renderHeader() {
    this.checkMark = this.createElement("div", ["icon-checkmark"]);
    const header = this.createElement("div", ["card-header"]);
    const cardType = this.createElement("div", ["card-type"]);
    if (this.userData.visitType === "Cardiologist") {
      cardType.classList.add("cardiologist");
    } else if (this.userData.visitType === "Dantist") {
      cardType.classList.add("dantist");
    } else if (this.userData.visitType === "Therapist") {
      cardType.classList.add("therapist");
    }
    cardType.innerText = this.userData.visitType;
    header.append(cardType, this.checkMark);
    return header;
  }
  showName() {
    const userName = this.createElement("div", ["_info"]);
    userName.innerText = this.userData.userName;
    const userNameTitle = this.createElement("div", ["_info-title"]);
    userNameTitle.innerText = "Patient name";
    const nameContainer = this.createElement("div", ["name-container"]);
    nameContainer.append(userNameTitle, userName);
    return nameContainer;
  }
  showAllFields() {
    this.btnShowMore.innerText = "Hide details";

    //==========Icon up==========
    const span = document.createElement("span");
    span.innerHTML = '<span class="icon-chevron-up icon-config"></span>';
    this.btnShowMore.append(span);
    //===========================

    let userDataArr = Object.entries(this.userData);
    let filteredUserDataArr = userDataArr.filter(
      (item) =>
        item[0] !== "id" &&
        item[0] !== "visitStatus" &&
        item[0] !== "userName" &&
        item[0] !== "visitType"
    );

    filteredUserDataArr.forEach((item, i) => {
      const infoItem = this.createElement("span", ["_info"], item[1]);

      //========= Titles for card fields =========
      let itemTitle;
      if (item[0] === "visitpurpose") {
        itemTitle = "Visit purpose";
      } else if (item[0] === "description") {
        itemTitle = "Description";
      } else if (item[0] === "urgency") {
        itemTitle = "Urgency of the visit";
      } else if (item[0] === "pressure") {
        itemTitle = "Normal pressure";
      } else if (item[0] === "bodymass") {
        itemTitle = "Body mass index";
      } else if (item[0] === "diseases") {
        itemTitle = "Past diseases of the cardiovascular system";
      } else if (item[0] === "age") {
        itemTitle = "Age";
      } else if (item[0] === "lastvisitdate") {
        itemTitle = "Last visit date";
      }
      const infoTitle = this.createElement("span", ["_info-title"], itemTitle);
      setTimeout(() => {
        this.addFields.append(infoTitle, infoItem);
      }, 80 * i);
    });
    this.body.append(this.addFields);
    // свойство определяющее статус карточки (большая/ маленькая)
  }
  hideAllFields() {
    this.addFields.innerHTML = "";
    this.btnShowMore.innerText = "Show details";

    //==========Icon down==========
    const span = document.createElement("span");
    span.innerHTML = '<span class="icon-chevron-down icon-config"></span>';
    this.btnShowMore.append(span);
    //=============================

  }
  renderBody() {
    // Вставка полей в зависимости от типа визита

    this.body = this.createElement("div", ["card_body"]);
    this.addFields = this.createElement("div", ["card-additional-fields"]);
    this.body.append(this.showName());
    this.body.append(this.addFields);
    return this.body;
  }

  renderFooter() {
    const footer = this.createElement("div", ["card_footer"]);
    const priorityContainer = this.createElement(
      "div",
      ["priority-container"],
      "Priority:"
    );
    const priorityDotsContainer = this.createElement("div", [
      "priority-dots-container",
    ]);
    const dot1 = this.createElement("span", ["priority-dots"]);
    const dot2 = this.createElement("span", ["priority-dots"]);
    const dot3 = this.createElement("span", ["priority-dots"]);
    if (this.userData.urgency === "Regular") {
      priorityDotsContainer.append(dot1);
      priorityDotsContainer.append(this.elem);
      priorityDotsContainer.setAttribute("data-tooltip", "Regular");
      priorityDotsContainer.addEventListener(
        "mouseenter",
        this.onmouseover.bind(this)
      );
      priorityDotsContainer.addEventListener(
        "mouseleave",
        this.onmouseout.bind(this)
      );
    } else if (this.userData.urgency === "Priority") {
      priorityDotsContainer.append(dot1, dot2);
      priorityDotsContainer.append(this.elem);
      priorityDotsContainer.setAttribute("data-tooltip", "Priority");
      priorityDotsContainer.addEventListener(
        "mouseenter",
        this.onmouseover.bind(this)
      );
      priorityDotsContainer.addEventListener(
        "mouseleave",
        this.onmouseout.bind(this)
      );
    } else if (this.userData.urgency === "Urgent") {
      priorityDotsContainer.append(dot1, dot2, dot3);
      priorityDotsContainer.append(this.elem);
      priorityDotsContainer.setAttribute("data-tooltip", "Urgent");
      priorityDotsContainer.addEventListener(
        "mouseenter",
        this.onmouseover.bind(this)
      );
      priorityDotsContainer.addEventListener(
        "mouseleave",
        this.onmouseout.bind(this)
      );
    }

    priorityContainer.append(priorityDotsContainer);
    this.btnShowMore = this.createElement(
      "button",
      ["btn", "btn-show_more"],
      "Show details "
    );
    //==========Icon down==========
    const span = document.createElement("span");
    span.innerHTML = '<span class="icon-chevron-down icon-config"></span>';
    this.btnShowMore.append(span);
    //=============================

    this.btnShowMore.addEventListener("click", () => {
      if (!this.expanded) {
        this.visitCard.classList.add("card-expanded");
        this.showAllFields();
        this.expanded = true;
      } else if (this.expanded) {
        this.visitCard.classList.remove("card-expanded");
        this.hideAllFields();
        this.expanded = false;
      }
    });
    const btnOptions = this.createElement(
      "button",
      ["btn", "btn-options"],
      "Options"
    );

    btnOptions.addEventListener("mouseover", () => {
      cardMenuWrapper.classList.toggle("card-menu-wrapper-active");
    });
    btnOptions.addEventListener("mouseout", () => {
      cardMenuWrapper.classList.toggle("card-menu-wrapper-active");
    });
    const cardMenuWrapper = this.createElement("div", ["card-menu-wrapper"]);
    cardMenuWrapper.addEventListener("mouseover", () => {
      cardMenuWrapper.classList.toggle("card-menu-wrapper-active");
    });
    cardMenuWrapper.addEventListener("mouseout", () => {
      cardMenuWrapper.classList.toggle("card-menu-wrapper-active");
    });

    const cardMenuConatainer = this.createElement("div", ["card-menu"]);
    const cardMenuBtnEdit = this.createElement(
      "button",
      ["btn", "btn-edit"],
      "Edit card"
    );

    cardMenuBtnEdit.addEventListener("click", (event) => {
      modal.show("Create edit form", createEditForm.render());
      createEditForm.showGeneralFields();
      createEditForm.showCustomeFields(this.userData.visitType);
      createEditForm.showStatusSelect();

      const form = document.querySelector(".form-container");
      editCardForm(form, this.userData);
    });
    const cardMenuBtnDelete = this.createElement(
      "button",
      ["btn", "btn-delete"],
      "Delete card"
    );
    cardMenuBtnDelete.addEventListener("click", (event) => {
      const targetCard = event.target.closest(".card-cell");
      modal.show("Delete card", createDeleteCardForm.render());
      const deleteBtn = document.querySelector(".btn-delete-card");
      const cancelBtn = document.querySelector(".btn-cancel");
      const mainText = document.querySelector(".main_text");
      const filterCover = document.querySelector(".filter-cover");

      deleteBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const cards = await getCards();
        deleteVisitCard(this.userData.id);
        targetCard.remove();
        modal.hide();
        if (cards.length == 1) {
          mainText.classList.remove("main_text-hide");
          filterCover.classList.remove("filter-cover-hide");
          mainText.textContent = "No cards here";
        }
      });
      cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        modal.hide();
      });
    });
    cardMenuConatainer.append(cardMenuBtnEdit, cardMenuBtnDelete);
    cardMenuWrapper.append(cardMenuConatainer);
    footer.append(
      priorityContainer,
      this.btnShowMore,
      btnOptions,
      cardMenuWrapper
    );
    return footer;
  }
  onmouseover(event) {
    let target = event.target;
    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;
    // ...создадим элемент для подсказки

    const tooltipElem = document.createElement("div");
    tooltipElem.className = "tooltip";
    tooltipElem.innerHTML = tooltipHtml;
    tooltipElem.id = "25";
    this.elem.append(tooltipElem);

    // спозиционируем его сверху от аннотируемого элемента (top-center)
    let coords = target.getBoundingClientRect();
    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; // не заезжать за левый край окна

    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
      // если подсказка не помещается сверху, то отображать её снизу
      top = coords.top + target.offsetHeight + 5;
    }
    tooltipElem.style.left = left + "px";
    tooltipElem.style.top = top + "px";
  }
  onmouseout(event) {
    let tooltipElem = document.getElementById("25");
    if (tooltipElem) {
      tooltipElem.remove();
      tooltipElem = null;
    }
  }
  render() {
    this.cardCell = this.createElement("div", ["card-cell"]);
    this.visitCard = this.createElement("div", ["card", "user-card"]);
    this.visitCard.setAttribute("userId", this.userData.id);
    this.visitCard.setAttribute("draggable", "true");
    this.visitCard.append(
      this.renderHeader(),
      this.renderBody(),
      this.renderFooter()
    );
    if (this.userData.visitStatus === "Done") {
      this.visitCard.classList.add("done");
      this.checkMark.classList.add("icon-checkmark-active");
    } else if (this.userData.visitStatus === "Active") {
      this.visitCard.classList.remove("done");
      this.checkMark.classList.remove("icon-checkmark-active");
    }
    this.cardCell.addEventListener("dragover", dragOver.bind(this.cardCell));
    this.cardCell.addEventListener("dragenter", dragEnter.bind(this.cardCell));
    this.cardCell.addEventListener("dragleave", dragLeave.bind(this.cardCell));
    this.cardCell.addEventListener("drop", dragDrop.bind(this.cardCell));
    this.visitCard.addEventListener(
      "dragstart",
      dragStart.bind(this.visitCard)
    );
    this.visitCard.addEventListener("dragend", dragEnd.bind(this.visitCard));
    this.cardCell.append(this.visitCard);
    return this.cardCell;
  }
}

export default Card;
