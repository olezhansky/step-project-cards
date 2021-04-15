import Component from "../Component.js";
import Input from "../formComponents/Input.js";
import SelectForm from "../formComponents/Select.js";
import Textarea from "../formComponents/Textarea.js";
import Span from "../formComponents/Span.js";

class VisitDantist extends Component {
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
      } else if (configItem.elType === "select") {
        element = new SelectForm(configItem.options).render();
      } else if (configItem.elType === "textarea") {
        element = new Textarea(configItem.options).render();
        element.placeholder = configItem.placeholder;
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

export const dantistFields = new VisitDantist([
  {
    elType: "span",
    innerHTML: 'Date of last visit'
  },
  {
    elType: "input",
    type: "text",
    name: "lastvisitdate",
    placeholder: "Date of last visit",
  },
]);

