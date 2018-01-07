'use strict';

// klasa widoku

class Component {
  getElement() {
    return this._element;
  }
}

class cellComponent extends Component {
  constructor() {
    super();
    this._state = "unknown";
    this._element = document.createElement("td");
    this._element.addEventListener("click",(function(){
      this.setState("miss");
    }).bind(this));
    this._refresh();
  }

setState(stateName) {
  this._state = stateName;
  this._refresh();
}

_refresh() {
  this._element.textContent = this._state;
  this._element.className = "cell_" + this._state;
}
}

const myCell = new cellComponent();
document.getElementById("cellContainer").appendChild(myCell.getElement());
