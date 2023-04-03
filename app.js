const todoEl = document.querySelector("#todo");
const todoListEl = document.querySelector("#todos");
const searchBoxEl = document.querySelector(".search-box");

let mode = "create";
let elementToUpdate;

document.addEventListener("keyup", function (event) {
	if (event.key === "Enter" && mode === "update") updateTodo();
	if (event.key === "Enter" && mode === "create") addTodo();
});

searchBoxEl.addEventListener("keyup", function (event) {
	for (let i = 0; i < todoListEl.children.length; i++) {
		const listItem = todoListEl.children[i].firstElementChild;
		const listItemText = listItem.innerText.toLowerCase();

		if (listItemText.includes(searchBoxEl.value.toLowerCase())) {
			listItem.parentElement.style.display = "flex";
		} else {
			listItem.parentElement.style.display = "none";
		}
	}
});

document.addEventListener("click", function (event) {
	const targetEl = event.target;
	const targetClassList = Array.from(targetEl.classList);

	if (targetClassList.includes("delete-todo")) removeTodo(targetEl);

	if (targetClassList.includes("complete-todo")) completeTodo(targetEl);

	if (targetClassList.includes("todo-item")) prepareUpdate(targetEl);

	if (targetClassList.includes("search-icon")) toggleSearchBox();
});

function toggleSearchBox() {
	searchBoxEl.value = "";
	searchBoxEl.classList.toggle("hidden");
	searchBoxEl.focus();
}

function addTodo() {
	if (todoEl.value.length === 0) return;

	todoListEl.insertAdjacentHTML(
		"afterbegin",
		`
		<li class="todo-item">
			<span class="todo-text">${todoEl.value} </span>
			<span class="todo-actions">
				<span class="complete-todo">✅</span>
				<span class="delete-todo">❌</span>
			</span>
		</li>
	`
	);

	resetInput();
}

function removeTodo(todo) {
	todo.closest(".todo-item").remove();
}

function completeTodo(todo) {
	todo.closest(".todo-item").classList.toggle("completed");
}

function updateTodo() {
	if (todoEl.value.length === 0) return;

	elementToUpdate.innerHTML = `
		<span class="todo-text">${todoEl.value} </span>
		<span class="todo-actions">
			<span class="complete-todo">✅</span>
			<span class="delete-todo">❌</span>
		</span>
		`;

	mode = "update";

	resetInput();
}

function prepareUpdate(todo) {
	todoEl.value = todo.firstElementChild.innerText;
	elementToUpdate = todo;
	mode = "update";
}

function resetInput() {
	todoEl.value = "";
}
