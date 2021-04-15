// Карточка исчезает из ячейки
export const dragStart = function (event) {
  event.dataTransfer.setData("cardId", this.attributes[1].nodeValue);

  event.dataTransfer.setDragImage(this, 100, 50);
  setTimeout(() => {
    this.classList.add("dragging");
    this.parentElement.classList.add("source-cell");
    this.classList.add("card-hide");
  }, 0);
};
// Карточка появляется
export const dragEnd = function () {
  setTimeout(() => {
    this.classList.remove("card-hide");
    this.classList.remove("dragging");
  }, 0);
};
// Ячейка над которой курсор с висячим элементом
export const dragOver = function (event) {
  event.preventDefault();
};
export const dragEnter = function (event) {
  event.preventDefault();
  event.stopPropagation();
  this.firstChild.classList.add("card-hide");
  this.classList.add("hovered");
};
export const dragLeave = function (event) {
  event.preventDefault();
  event.stopPropagation();
  setTimeout(() => {
    this.classList.remove("hovered");
    this.firstChild.classList.remove("card-hide");
  }, 500);
};
export const dragDrop = function (event) {
  const cardId = event.dataTransfer.getData("cardId");
  const draggableCard = document.querySelector(`.card[userid="${cardId}"]`);
  const sourceCell = document.querySelector(".source-cell");
  this.firstChild.classList.remove("card-hide");
  sourceCell.append(this.firstChild);
  this.append(draggableCard);
  sourceCell.classList.remove("source-cell");
};
