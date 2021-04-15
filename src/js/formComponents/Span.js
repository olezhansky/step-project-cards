import Component from "../Component.js";

class Span extends Component {
  constructor() {
    super();
  }
  render() {
    const element = this.createElement("span", ['_info-title']);   
    return element;
  }
}

export default Span;
