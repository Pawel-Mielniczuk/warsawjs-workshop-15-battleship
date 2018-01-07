'use strict';

// klasa widoku

class Component {
  getElement() {
    return this._element;
  }
}

class cellComponent extends Component {
  constructor({location, handleCellClick}) {
    super();
    this._state = "unknown";
    this._element = document.createElement("td");
    this._element.addEventListener("click",function(){
        handleCellClick({ location });
    });
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

class BoardComponent extends Component {
  constructor({ handleCellClick, size = 8 }) {
    //Create _element, create child cells, append to our element
    super();
    this._element = document.createElement('table');
    this._cells = {};
    for(let rowNumber = 0; rowNumber < size; rowNumber +=1) {
      const rowElement = document.createElement('tr');
      for(let columnNumber = 0; columnNumber < size; columnNumber +=1) {
        const cell = new cellComponent ({
          handleCellClick,
          location : {row: rowNumber, column : columnNumber }
        });
        rowElement.appendChild(cell.getElement());
        //Also save reference to the cell so that it can
        // be addressed later
        this._cells[`${rowNumber}x${columnNumber}`] = cell;
      }
      this._element.appendChild(rowElement)
    }

  }

  setCellState(location, state) {
    //Find the appropriate cell call its setState()
    const key = `${location.row}x${location.column}`;
    this._cells[key].setState(state);
  }
}

class GameController {
  constructor(model) {
    this._model = model;
  }
  handleCellClick({ location }) {
    this._model.fireAt(location);
  }
}

//## Models

class CellModel {
  constructor({ hasShip }) {
    this._hasShip = hasShip;
    this._firedAt = false;
  }

  fire() {
    //Guard clause Do not 
    if(this._fireAt) {
      return undefined;
    }
    this._firedAt = true;
    return (this._hasShip ? "hit" : "miss");
  }
}

class BoardModel {
  constructor( { size = 8} = {} ) {
    this._cells = {}
    for(let i = 0; i < size; i+=1) {
      for(let j = 0; j < size; j+=1) {
        this._cells[`${i}x${j}`] = new CellModel({hasShip: true});
      }
    }
  }
  fireAt(location) {
    const target = this._cells[`${location.row}x${location.column}`];
    const firingResult = target.fire();
  }
}

let myController;
function handleCellClick(...args) {
  myController.handleCellClick.apply(myController, args);
}
const boardView  = new BoardComponent({handleCellClick})
const boardModel = new BoardModel();
myController = new GameController(boardModel);

const boardContainer = document.getElementById("boardContainer");
boardContainer.appendChild(boardView.getElement());
