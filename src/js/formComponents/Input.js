import Component from "../Component.js";

class Input extends Component {
  constructor() {
    super();
  }
  render() {
    const element = this.createElement("input", ["input"]);
    return element;
  }
}
const test = new Input();

export default Input;
