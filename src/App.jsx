import { useState, useEffect } from "react";
import "./App.css";
import ToDo from "./toDoClass";

function App() {
	return (
		<div className="app">
			<p className="todos-title">todos</p>
			<MainPart />
		</div>
	);
}

function MainPart() {
	const [todos, setTodos] = useState([]);
	const [showOption, setShowOption] = useState("all");

	return (
		<div className="main-part">
			<ToDoInput todos={todos} setTodos={setTodos} />
			<ToDoList todos={todos} setTodos={setTodos} showOption={showOption} />
			<ManagementButtons
				todos={todos}
				setTodos={setTodos}
				setShowOption={setShowOption}
			/>
		</div>
	);
}

function ToDoInput({ todos, setTodos }) {
	const [inputValue, setInputValue] = useState("");

	function handleKeyDown(e) {
		if (e.key === "Enter" && inputValue !== "") {
			const toDo = new ToDo(inputValue, false);
			setTodos([...todos, toDo]);
			setInputValue("");
		}
	}

	useEffect(() => {
		console.log("Updated todos:", todos);
	}, [todos]);

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

function ToDoList({ todos, setTodos, showOption }) {
	let filteredTodos;
	if (showOption === "all") {
		filteredTodos = todos;
	} else if (showOption === "active") {
		filteredTodos = todos.filter((item) => !item.isChecked);
	} else if (showOption === "completed") {
		filteredTodos = todos.filter((item) => item.isChecked);
	}
	return (
		<div className="todo-list">
			{filteredTodos.map((item, index) => (
				<ToDoElement
					key={index} // Use a unique key
					todo={item} // Pass data to the component
					todos={todos}
					setTodos={setTodos}
				/>
			))}
		</div>
	);
}

function ToDoElement({ todo, setTodos }) {
	const handleCheckboxChange = () => {
		const updatedTodo = { ...todo, isChecked: !todo.isChecked }; // Создаём копию объекта с изменённым состоянием
		setTodos(
			(prevTodos) => prevTodos.map((t) => (t === todo ? updatedTodo : t)) // Обновляем массив с новым объектом
		);
	};

	return (
		<div className="todo-item">
			<label>
				<input
					type="checkbox"
					checked={todo.isChecked}
					className="real-checkbox"
					onChange={handleCheckboxChange}
				/>
				<span className="custom-checkbox"></span>
				<div className="todo-text">{todo.text}</div>
			</label>
		</div>
	);
}

function ManagementButtons({ todos, setTodos, setShowOption }) {
	const handleShowAll = () => {
		setShowOption("all");
	};
	const handleShowActive = () => {
		setShowOption("active");
	};
	const handleShowCompleted = () => {
		setShowOption("completed");
	};
	const handleClearCompleted = () => {
		setTodos((prevTodos) => {
			return prevTodos.filter((item) => item.isChecked === false);
		});
	};
	return (
		<div className="management-buttons">
			<div className="left-items">
				{todos.filter((item) => item.isChecked === false).length +
					" items left"}
			</div>
			<div className="buttons">
				<button onClick={() => handleShowAll()}>All</button>
				<button onClick={() => handleShowActive()}>Active</button>
				<button onClick={() => handleShowCompleted()}>Completed</button>
				<button onClick={() => handleClearCompleted()}>Clear completed</button>
			</div>
		</div>
	);
}

export default App;
