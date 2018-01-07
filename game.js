/*'use strict';

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
  constructor({ handleCellClick, size = 8 , boardNumber}) {
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

class GameController  {
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
    if(this._firedAt) {
      return undefined;
    }
    this._firedAt = true;
    console.log("dziala")
    return (this._hasShip ? "hit" : "miss");

  }
}

class BoardModel {
  constructor( { size = 8} = {} ) {
    this._cells = {}
    for(let i = 0; i < size; i+=1) {
      for(let j = 0; j < size; j+=1) {
        let hasShip;
        if(Math.random() < 0.2) {
          hasShip = true;
        } else {
          hasShip = false;
        }
        this._cells[`${i}x${j}`] = new CellModel({hasShip: hasShip});
      }
    }
    //Inicialize an empty observer map;
    this._observers = {}

  }

  fireAt(location) {
    const target = this._cells[`${location.row}x${location.column}`];
    const firingResult = target.fire();
    if(firingResult) {
      this._notifyObservers('firedAt', {location, firingResult});
    }
  }

  }

  class GameComponent extends Component {
    constructor(handleCellClick, size = 8, boardCompon) {

    }
  }

  
class GameModel {
  constructor({ boards }) {
    this._boards = boards;
    //At the beginning it's player 0's turn (he shots at the board [1])
    this._turn = 0;
    //Inicialize an empty observer map
    this._observers = {};
  }

  fireAt(location) {
    //Todo :Add turn handling. Check it's the turn of the correct player
    //or throew an error otherwise
    //Get a reference to the correct board, depending on the firing target
    const boardNumber = location.boardNumber;
    const board = this._boards[boardNumber]
    const firingResult = board.fireAt(location)
    if(firingResult) {
      this._notifyObservers('firedAt', {location, firingResult});
    }
  }

  _notifyObservers(type, data) {
    //run all saved observers for given type.
     (this._observers[type] || []).forEach(function(observer){
      observer(data);
     });
    }

    _notifyObservers(type, data) {
      //run all saved observers for given type.
       (this._observers[type] || []).forEach(function(observer){
        observer(data);
       });
  
      }
  
      addObserver(type, observerFunction) {
        //save the observer function for running later.
        if(!this._observers[type]) {
          this._observers[type] = [];
        }
        this._observers[type].push(observerFunction);
      }
}

//Initialization

let myController;
function handleCellClick(...args) {
  myController.handleCellClick.apply(myController, args);
}
const gameView  = new GameComponent({handleCellClick})
const boardModels = [ new BoardModel(), new BoardModel()];
const gameModel = new GameModel({boards: boardModels});
myController = new GameController(gameModel);
boardModels.addObserver("firedAt", function({ location, firingResult }){
  boardView.setCellState(location, firingResult);
});

const boardContainer = document.getElementById("boardContainer");
boardContainer.appendChild(boardView.getElement());


//kingatok

*/

'use strict';

class Component {
	getElement() {
		return this._element;
	}
}

class CellComponent extends Component {
	constructor({ location, handleCellClick }) {
		super();
		this._state = 'unknown';
		this._element = document.createElement('td');
		this._element.addEventListener('click', function() {
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
		this._element.className = 'cell_' + this._state;
	}
}

class BoardComponent extends Component {
	constructor({ handleCellClick, size = 8, boardNumber }) {
		super();
		this._element = document.createElement('table');
		/*
		References to cells.
		@type {Object.<string.CellComponent>}
		*/
		this._cells = {};
		for (let rowNumber = 0; rowNumber < size; rowNumber += 1) {
			const rowElement = document.createElement('tr');
			for (let columnNumber = 0; columnNumber < size; columnNumber += 1) {
				const cell = new CellComponent({
					handleCellClick,
					location: { row: rowNumber, column: columnNumber, boardNumber: boardNumber }
				});
				rowElement.appendChild(cell.getElement());
				// Also save a reference to the cell so that it can be addressed later
				this._cells[`${rowNumber}X${columnNumber}`] = cell;
			}
			this._element.appendChild(rowElement);
		}
	}

	setCellState(location, state) {
		const key = `${location.row}X${location.column}`;
		this._cells[key].setState(state);
	}
}

class GameComponent extends Component {
	constructor( { handleCellClick, size = 8, boardNumber }) {
		super();
		this._boards = [
			new BoardComponent({ handleCellClick, size, boardNumber: 0 }),
			new BoardComponent({ handleCellClick, size, boardNumber: 1 })
		];
		this._element = document.createElement('div');
		this._element.className = 'GameComponent';
		// Add all children's DOM elements to ours
		this._boards.forEach(function(childBoard) {
			this._element.appendChild(childBoard.getElement());
		}, this);
	}

	setCellState(location, state) {
		const board = this._boards[location.boardNumber];
		board.setCellState(location, state);
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

// ### Models ###

class CellModel {
	constructor({ hasShip }) {
		this._hasShip = hasShip;
		this._firedAt = false;
	}

	fire() {
		// Guard clause
		if(this._firedAt) {
			return undefined;
		}
		this._firedAt = true;
		return (this._hasShip ? 'hit' : 'miss');
	}
}

class BoardModel {
	constructor({ size = 8 } = {}) {
		this._cells = {}
		for (let rowNumber = 0; rowNumber < size; rowNumber += 1) {
			for (let columnNumber = 0; columnNumber < size; columnNumber += 1) {
				let hasShip;
				if (Math.random() < 0.2) {
					hasShip = true;
				} else {
					hasShip = false;
				}
				this._cells[`${rowNumber}X${columnNumber}`] = new CellModel({ hasShip: hasShip });
			}
		}
		// Initialize an empty observer map
		this._observers = {};
	}

	fireAt(location) {
		//TODO: Add turn handling. Check if it's the turn of the correct player
		// or throw an error otherwise
		const target = this._cells[`${location.row}X${location.column}`];
		const firingResult = target.fire();
		// TODO: Deliver the changes to the view!
		return firingResult;
	}

	_notifyObservers(type, data) {
		// Run all saved observers for given type
		(this._observers[type] || []).forEach(function(observer){
			observer(data);
		});
	}
}

class GameModel {
	constructor({ boards }) {
		this._boards = boards;
		// Add the beggining, it's playesr o's turn (he shoots at board[1]).
		this._turn = 0;
		// Initialize an empty observer map
		this._observers = {};
	}

	fireAt(location) {
		//TODO: Add turn handling. Check if it's the turn of the correct player
		// or throw an error otherwise
		const boardNumber = location.boardNumber;
		const board = this._boards[boardNumber];
		// Tell the board to handle the firing
		const firingResult = board.fireAt(location);
		// TODO: Deliver the changes to the view!
		if(firingResult) {
			this._notifyObservers('firedAt', {location, firingResult});
		}
	}

	_notifyObservers(type, data) {
		// Run all saved observers for given type
		(this._observers[type] || []).forEach(function(observer){
			observer(data);
		});
	}

	addObserver(type, observerFunction) {
		// Save the observer function for running later
		if (!this._observers[type]) {
			this._observers[type] = [];
		}
		this._observers[type].push(observerFunction);

	}
}

let myController;
function handleCellClick(...args) {
	myController.handleCellClick.apply(myController, args);
}

const gameView = new GameComponent({ handleCellClick });
const boardModels = [ new BoardModel(), new BoardModel() ];
const gameModel = new GameModel({ boards: boardModels });

myController = new GameController(gameModel);
gameModel.addObserver('firedAt', function({ location, firingResult }) {
	gameView.setCellState(location, firingResult);
});

const gameContainer = document.getElementById('boardContainer').appendChild(gameView.getElement());
