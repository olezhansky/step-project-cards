import Component from "./Component.js";
import Input from "./formComponents/Input.js";
import ButtonForm from "./formComponents/Button.js";
import SelectForm from "./formComponents/Select.js";
import Textarea from "./formComponents/Textarea.js";
import { generalFields, statusSelect } from "./visit/Visit.js";
import { cardiologistFields } from "./visit/VisitCardiologist.js";
import { dantistFields } from "./visit/VisitDantist.js";
import { therapistFields } from "./visit/VisitTherapist.js";

class Form extends Component {
  constructor(config, btnSettings) {
    super();
    this.config = config;
    this.btnSettings = btnSettings;
  }
  showDoctorSelect() {
    this.mainSelectblock = this.createElement("div", ["form-select-block"]);
    this.mainSelectblock.append(generalFields.renderSelect());
    this.containerForm.prepend(this.mainSelectblock);
  }
  showGeneralFields() {
    this.generalFieldsCont = generalFields.renderFields();
    this.generalFieldsContainer.append(generalFields.renderFields());
    this.btnElement.before(this.generalFieldsContainer);
  }
  showCustomeFields(doctor) {
    if (doctor === "Cardiologist") {
      this.customFields.append(cardiologistFields.render());
    } else if (doctor === "Dantist") {
      this.customFields.append(dantistFields.render());
    } else if (doctor === "Therapist") {
      this.customFields.append(therapistFields.render());
    }
    this.generalFieldsContainer.after(this.customFields);
  }
  showStatusSelect() {
    this.customFields.append(statusSelect.renderSelect());
  }
  render() {
    this.generalFieldsCont = "";
    this.containerForm = this.createElement("form", ["form", "form-container"]);
    this.customFields = this.createElement("div", ["form-custome-fields"]);
    this.generalFieldsContainer = this.createElement("div", ["form-general"]);
    this.btnElement = new ButtonForm(this.btnSettings.classNames).render();
    this.btnElement.textContent = this.btnSettings.innerText;

    // Перебор объектов поступивших в массиве config (для универсальности класса)
    const items = this.config.map((configItem) => {
      let element;
      if (configItem.elType === "input") {
        element = new Input().render();
        element.name = configItem.name;
        element.type = configItem.type;
        element.placeholder = configItem.placeholder;
      } else if (configItem.elType === "button") {
        element = new ButtonForm(configItem.classNames).render();
        element.textContent = configItem.innerText;
        element.classList.add(configItem.className);
      } else if (configItem.elType === "select") {
        element = new SelectForm(configItem.options).render();
      } else if (configItem.elType === "textarea") {
        element = new Textarea(configItem.options).render();
        element.placeholder = configItem.placeholder;
      } else if (configItem.elType === "div") {
        element = this.createElement("div", ["form-message"]);
        element.textContent = configItem.innerText;
      }
      return element;
    });
    this.containerForm.append(...items);
    this.containerForm.append(this.btnElement);
    return this.containerForm;
  }
  clearForm() {
    this.generalFieldsContainer.innerHTML = "";
    this.customFields.innerHTML = "";
  }
}
// ================= Инструкция ================
// Шаблон создания формы:
// const myNewForm = new Form([массив обектов- элементов формы], {объект-кнопка внизу формы});
// Объект элемента формы: (в elType можно передавать: input, textarea, select, button, span)
// Например:
// {elType: "input",
// type: "password",
// name: "password",
// placeholder: "Enter your password",}
// При создании кнопки передается свойство classNames с массивом классов, которые будут добавлены к классам
// добавляемым автоматически (class="btn btn-modal"). Если пустой массим- то будут только базовые классы.
// См реальные примеры ниже.
// =====================================
const createRegisterForm = new Form(
  [
    {
      elType: "input",
      type: "text",
      name: "email",
      placeholder: "Enter your email address",
    },
    {
      elType: "input",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
    },
  ],
  {
    elType: "button",
    innerText: "Enter",
    classNames: [],
  }
);
const createVisitForm = new Form([], {
  elType: "button",
  innerText: "Create visit",
  classNames: [],
});
const createEditForm = new Form([], {
  elType: "button",
  innerText: "Edit card",
  classNames: [],
});
const createDeleteCardForm = new Form(
  [
    {
      elType: "div",
      innerText: "Are you sure you want to delete the visit card?",
    },
    {
      elType: "button",
      innerText: "Delete card",
      classNames: ["btn-delete-card"],
    },
  ],
  {
    elType: "button",
    innerText: "Cancel",
    classNames: ["btn-cancel"],
  }
);

export { Form };
export { createRegisterForm };
export { createVisitForm };
export { createDeleteCardForm };
export { createEditForm };
