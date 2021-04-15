import Component from "../Component.js";

class Modal extends Component {
  constructor() {
    super();
  }

  show(title, elementHTML) {
    this.modalContent.innerHTML = null;
    this.addClass(this.modalWrapper, "active");

    this.modalHeaderContent.textContent = title;
    this.modalContent.append(elementHTML);
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      this.addClass(this.modalCover, "cover-active");
      this.modalBody.classList.add("modal-body-active");
    }, 200);
  }

  hide() {
    this.removeClass(this.modalWrapper, "active");
    this.removeClass(this.modalCover, "cover-active");
    document.body.classList.remove("no-scroll");
  }

  render() {
    this.modalWrapper = this.createElement("div", ["modal-wrapper"]);
    this.modalCover = this.createElement("div", ["modal-cover"]);
    this.modalBody = this.createElement("div", ["modal-body"]);

    this.modalHeader = this.createElement("div", ["modal-header"]);
    this.modalHeaderContent = this.createElement("div", [
      "modal-header-content",
    ]);
    this.modalHeaderClose = this.createElement("div", ["close"]);
    this.modalContent = this.createElement("div", ["modal-content"]);
    this.modalFooter = this.createElement("div", ["modal-footer"]);
    this.modalBody.append(
      this.modalHeader,
      this.modalContent,
      this.modalFooter
    );
    this.modalHeader.append(this.modalHeaderContent, this.modalHeaderClose);
    this.modalWrapper.append(this.modalCover, this.modalBody);
    document.body.append(this.modalWrapper);
    return this.modalWrapper;
  }
}

const modal = new Modal();
modal.render();
export default modal;
