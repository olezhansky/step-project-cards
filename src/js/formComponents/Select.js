import Component from "../Component.js";

class Select extends Component {
  constructor(settings) {
    super();
    this.settings = settings;
  }
  render() {
    const selectEl = this.createElement("select", ["modal-select"]);
    selectEl.setAttribute('name', this.settings.name)
    const optionSelectArr = this.settings.options.slice(0, 1);
    const optionDisabled = this.createElement(
      "option",
      [],
      optionSelectArr[0],
      optionSelectArr[0],
      "disabled"
    );
    const selOptions = this.settings.options.map((optEl) => {
      const option = this.createElement("option", [], optEl, optEl);
      return option;
    });
    const selOptionsSplice = selOptions.splice(1);
    selectEl.append(optionDisabled, ...selOptionsSplice);
    return selectEl;
  }
}

export default Select;
