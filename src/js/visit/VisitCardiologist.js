import Component from "../Component.js";
import Input from "../formComponents/Input.js";
import ButtonForm from "../formComponents/Button.js";
import SelectForm from "../formComponents/Select.js";
import Textarea from "../formComponents/Textarea.js";
import Span from "../formComponents/Span.js";

class VisitCardiologist extends Component {
  constructor(config) {
    super();
    this.config = config;
  }
  clear() {
    this.customeFieldsContainer.innerHTML = null;
  }
  render() {
    this.customeFieldsContainer = this.createElement("div", [
      "form-custome-fields",
    ]);
    const items = this.config.map((configItem) => {
      let element;
      if (configItem.elType === "input") {
        element = new Input().render();
        element.name = configItem.name;
        element.type = configItem.type;
        element.placeholder = configItem.placeholder;
      } else if (configItem.elType === "button") {
        element = new ButtonForm().render();
        element.textContent = configItem.innerText;
      } else if (configItem.elType === "select") {
        element = new SelectForm(configItem.options).render();
      } else if (configItem.elType === "textarea") {
        element = new Textarea(configItem.options).render();
        element.placeholder = configItem.placeholder;
        element.name = configItem.name;
      } else if (configItem.elType === "span") {
        element = new Span(configItem.options).render();
        element.placeholder = configItem.placeholder;
        element.innerHTML = configItem.innerHTML
      }
      return element;
    });
    this.customeFieldsContainer.append(...items);
    return this.customeFieldsContainer;
  }
}

export const cardiologistFields = new VisitCardiologist([
  {
    elType: "span",
    innerHTML: 'Normal pressure'
  },
  {
    elType: "input",
    type: "text",
    name: "pressure",
    placeholder: "Normal pressure",
  },
  {
    elType: "span",
    innerHTML: 'Body mass index'
  },
  {
    elType: "input",
    type: "text",
    name: "bodymass",
    placeholder: "Body mass index",
  },
  {
    elType: "span",
    innerHTML: 'Past diseases of the cardiovascular system'
  },
  {
    elType: "textarea",
    type: "text",
    name: "diseases",
    placeholder: "Past diseases of the cardiovascular system",
  },
  {
    elType: "span",
    innerHTML: 'Age'
  },
  {
    elType: "input",
    type: "number",
    name: "age",
    placeholder: "Age",
  },
]);
