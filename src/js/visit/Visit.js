import Component from "../Component.js";
import Input from "../formComponents/Input.js";
import ButtonForm from "../formComponents/Button.js";
import SelectForm from "../formComponents/Select.js";
import Textarea from "../formComponents/Textarea.js";
import Span from "../formComponents/Span.js";

class Visit extends Component {
  constructor(selectSettings, config) {
    super();
    this.config = config;
    this.selectSettings = selectSettings;
  }

  renderSelect() {
    this.selectContainer = this.createElement("div", ["select-container"]);
    if (this.selectSettings.label) {
      this.selectLabel = this.createElement("span", ["_info-title"]);
      this.selectLabel.innerText = this.selectSettings.label;
      this.selectContainer.append(this.selectLabel);
    }
    this.generalSelect = new SelectForm(this.selectSettings).render();
    this.selectContainer.append(this.generalSelect);
    return this.selectContainer;
  }

  renderFields() {
    this.generalFieldsContainer = this.createElement("div", [
      "form-general-fields",
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
        element = new SelectForm(configItem).render();
        element.classList.add(configItem.className);
      } else if (configItem.elType === "textarea") {
        element = new Textarea(configItem.options).render();
        element.placeholder = configItem.placeholder;
      } else if (configItem.elType === "span") {
        element = new Span(configItem.options).render();
        element.innerHTML = configItem.innerHTML;
      }
      return element;
    });
    this.generalFieldsContainer.append(...items);
    return this.generalFieldsContainer;
  }
}

export const generalFields = new Visit(
  {
    elType: "select",
    name: "doctor",
    options: ["Select specialist", "Cardiologist", "Dantist", "Therapist"],
  },
  [
    {
      elType: "span",
      innerHTML: "Enter the purpose of your visit",
    },
    {
      elType: "input",
      type: "text",
      name: "visitpurpose",
      placeholder: "Enter the purpose of your visit",
    },
    {
      elType: "span",
      name: "visitpurpose",
      innerHTML: "Enter a short description of the visit",
    },
    {
      elType: "input",
      type: "text",
      name: "description",
      placeholder: "Enter a short description of the visit",
    },
    {
      elType: "span",
      name: "visitpurpose",
      innerHTML: "Urgency",
    },
    {
      elType: "select",
      name: "urgency",
      options: ["Urgency of the visit ", "Regular", "Priority", "Urgent"],
      className: "urgency",
    },
    {
      elType: "span",
      name: "visitpurpose",
      innerHTML: "Patient name",
    },
    {
      elType: "input",
      type: "text",
      name: "username",
      placeholder: "Enter your full name",
    },
  ]
);

export const statusSelect = new Visit(
  {
    elType: "select",
    name: "status",
    options: ["Visit Status", "Active", "Done"],
    label: "Visit status",
  },
  []
);

