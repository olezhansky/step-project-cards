import Component from "../Component.js";

class Textarea extends Component {
  constructor() {
    super();
  }
  render() {
    const element = this.createElement("textarea", ['description']);    
    return element;
  }
}

export default Textarea;
