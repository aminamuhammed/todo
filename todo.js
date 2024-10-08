const searchBtn = document.getElementById("searchBtn");
const loadingIndicator = document.querySelector(".loading");
const todoList = document.querySelector(".todo-list");

const errormsg = document.getElementById("errormsg");
const userDisplay = document.getElementById("userId");
let incompleteTasksChecked = 0;

searchBtn.addEventListener("click", () => {
    const user = userID.value.trim();
    errormsg.style.display = "none";
    todoList.innerHTML = ''; 
    todoList.style.display = "none"; 
    incompleteTasksChecked = 0;

    if (!user) {
        errormsg.style.display = "block";
        errormsg.textContent = "Please enter a user ID";
        return;
    }

    showLoading(true);

    fetchUser(user)
        .then(todos => {
            if (todos.length > 0) {
                userDisplay.textContent = `Todos for User ID: ${todos[0].userId}`;

                todos.forEach(todo => {
                    const todoItem = document.createElement('div');
                    todoItem.classList.add('card', 'mb-2', 'p-3');
                    todoItem.innerHTML = `
                        <div style="display:flex; justify-content: space-between; align-items: center;">
                            <div>
                                <p class="${todo.completed ? 'underline' : ''}"><strong>Task:</strong> ${todo.title}</p>
                                <p><strong>Status:</strong> ${todo.completed ? 'Completed' : 'Not Completed'}</p>
                            </div>
                            ${!todo.completed ? `<input type="checkbox" class="incomplete-checkbox">` : ''}
                        </div>
                    `;
                    todoList.appendChild(todoItem);
                });

                todoList.style.display = 'block';

                const checkboxes = document.querySelectorAll('.incomplete-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', (event) => {
                        if (event.target.checked) {
                            incompleteTasksChecked++;
                        } else {
                            incompleteTasksChecked--;
                        }

                        checkFiveTasks(incompleteTasksChecked)
                            .then(() => {
                                alert("Congrats! 5 tasks have been successfully completed.");
                            })
                            .catch((msg) => {
                                console.log(msg);
                            });
                    });
                });
            } else {
                errormsg.style.display = "block";
                errormsg.textContent = "No todos found for this user.";
            }
        })
        .catch(err => {
            errormsg.style.display = 'block';
            errormsg.textContent = 'Error fetching todo list: ' + err;
        })
        .finally(() => {
            showLoading(false);
        });
});

function showLoading(isLoading) {
    loadingIndicator.style.display = isLoading ? "block" : "none";
}

function fetchUser(userId) {
    const url = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('User not found');
            }
        });
}

function checkFiveTasks(count) {
    return new Promise((resolve, reject) => {
        if (count >= 5) {
            resolve();
        } else {
            reject(`Only ${count} incomplete tasks are checked. Keep checking!`);
        }
    });
}
