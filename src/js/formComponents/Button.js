import Component from "../Component.js";

class ButtonForm extends Component {
  constructor(classNames) {
    super();
    this.classNames = classNames;
  }
  render() {
    const element = this.createElement("button", [
      "btn",
      "btn-modal",
      ...this.classNames,
    ]);
    return element;
  }
}

export default ButtonForm;
