import { useState } from "react";
import "./App.css";

function App() {
	return (
		<div className="app">
			<p className="todos-title">todos</p>
			<ToDoList />
		</div>
	);
}

function ToDoList() {
	const [numberOfChecked, setNumberOfChecked] = useState(0);
	const [toDoItemsArray, setToDoItemsArray] = useState([]);
	const [neededToShowArray, setNeededToShowArray] = useState([]);

	return (
		<div className="main-part">
			<ToDoInput
				toDoItemsArray={toDoItemsArray}
				setToDoItemsArray={setToDoItemsArray}
			/>
			<div className="todo-list">
				{neededToShowArray.map((item) => (
					<ToDoElement
						key={item.id} // Use a unique key
						todo={item.text} // Pass data to the component
						numberOfChecked={numberOfChecked}
						setNumberOfChecked={setNumberOfChecked}
					/>
				))}
			</div>
			<ManagementButtons
				toDoItemsArray={toDoItemsArray}
				setToDoItemsArray={setToDoItemsArray}
				numberOfChecked={numberOfChecked}
				neededToShowArray={neededToShowArray}
				setNeededToShowArray={setNeededToShowArray}
			/>
		</div>
	);
}

function ToDoInput({ toDoItemsArray, setToDoItemsArray }) {
	const [inputValue, setInputValue] = useState("");

	function handleKeyDown(e) {
		if (e.key === "Enter" && inputValue !== "") {
			setToDoItemsArray([
				...toDoItemsArray,
				{ id: Date.now(), text: inputValue, isChecked: false },
			]);

			setInputValue("");
		}
	}
	return (
		<div className="todo-input">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="What needs to be done?"
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
}

function ToDoElement({ todo, numberOfChecked, setNumberOfChecked }) {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = (event) => {
		setIsChecked(event.target.checked);

		// console.log(event.target.checked);
		setNumberOfChecked(
			event.target.checked ? numberOfChecked + 1 : numberOfChecked - 1
		);
		console.log("changed");
	};

	return (
		<div className="todo-item">
			<label>
				<input
					type="checkbox"
					checked={isChecked}
					className="real-checkbox"
					onChange={handleCheckboxChange}
				/>
				<span className="custom-checkbox"></span>
				<div className="todo-text">{todo}</div>
			</label>
		</div>
	);
}

function ManagementButtons({
	toDoItemsArray,
	setToDoItemsArray,
	numberOfChecked,
	neededToShowArray,
	setNeededToShowArray,
}) {
	const handleShowAll = () => {
		setNeededToShowArray(toDoItemsArray);
	};
	const handleShowActive = () => {
		setNeededToShowArray(
			[...toDoItemsArray].filter((item) => item.isChecked !== true)
		);
		console.log(neededToShowArray);
	};
	return (
		<div className="management-buttons">
			<div className="left-items">
				{toDoItemsArray.length - numberOfChecked} items left
			</div>
			<div className="buttons">
				<button onClick={() => handleShowAll()}>All</button>
				<button onClick={() => handleShowActive()}>Active</button>
				<button>Completed</button>
				<button>Clear completed</button>
			</div>
		</div>
	);
}

export default App;
