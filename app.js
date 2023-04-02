const todoEl = document.querySelector("#todo");
const todosEl = document.querySelector("#todos");
let mode = "create";
let elementToUpdate;

/**
 * Keydown: When a key is pressed. Fired continously
 * Keyup: When a key is released
 * Keypress: For keys that produce character values. Deprecated
 */
document.addEventListener("keyup", function (event) {
	if (event.key === "Enter" && mode === "create") {
		todosEl.insertAdjacentHTML(
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

		todoEl.value = "";
	}

	if (event.key === "Enter" && mode === "update") {
		elementToUpdate.innerHTML = `
		<span class="todo-text">${todoEl.value} </span>
		<span class="todo-actions">
			<span class="complete-todo">✅</span>
			<span class="delete-todo">❌</span>
		</span>
		`;

		todoEl.value = "";
		mode = "create";
	}
});

todosEl.addEventListener("click", function (event) {
	const targetEl = event.target;
	const targetClassList = Array.from(targetEl.classList);

	switch (targetClassList) {
		case targetClassList.includes("delete-todo"):
			targetEl.parentElement.parentElement.remove();
			break;
		case targetClassList.includes("complete-todo"):
			targetEl.parentElement.parentElement.classList.toggle("completed");
			break;
		case targetClassList.includes("todo-item"):
			todoEl.value = targetEl.firstElementChild.innerText;
			elementToUpdate = targetEl;
			mode = "update";
			break;
	}
});
