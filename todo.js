const searchBtn = document.getElementById("searchBtn");
const loadingIndicator = document.querySelector(".loading");
const todoList = document.querySelector(".todo-list");

const errormsg = document.getElementById("errormsg");
const userDisplay = document.getElementById("userId");

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const user = userID.value.trim();

    // Clear previous results and error messages
    errormsg.style.display = "none";
    todoList.innerHTML = ''; // Clear the previous todos
    todoList.style.display = "none"; // Hide the list until new data is loaded

    if (!user) {
        errormsg.style.display = "block";
        errormsg.textContent = "Please enter a user ID";
        return;
    }

    // Show loading indicator while fetching data
    showLoading(true);

    // Fetch todos for the given user ID
    fetchUser(user)
        .then(todos => {
            if (todos.length > 0) {
                // Display user ID at the top
                userDisplay.textContent = `Todos for User ID: ${todos[0].userId}`;

                let completedTasks = 0; // Counter for completed tasks

                // Loop through the todos and display each one
                todos.forEach(todo => {
                    const todoItem = document.createElement('div');
                    todoItem.classList.add('card', 'mb-2', 'p-3');

                    // Add completed tasks check
                    if (todo.completed) {
                        completedTasks++;
                    }

                    todoItem.innerHTML = `
                        
                        <p class="${todo.completed ? 'underline' : ''}"><strong>Task:</strong> ${todo.title}</p>
                        <p><strong>Status:</strong> ${todo.completed  ?  "completed" : "Not Completed" }</p>
                    `;

                    todoList.appendChild(todoItem);
                });

                // Show the todo list after rendering all items
                todoList.style.display = 'block';

                // Call the function to check if 5 or more tasks are completed
                checkCompletedTasks(completedTasks)
                    .then(() => {
                        alert("Congrats. 5 Tasks have been successfully completed");
                    })
                    .catch(err => {
                        console.log(err); // Handle errors if necessary
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
            // Hide the loading indicator
            showLoading(false);
        });
});

// Function to show or hide the loading indicator
function showLoading(isLoading) {
    loadingIndicator.style.display = isLoading ? "block" : "none";
}

// Function to fetch todos for a specific user from JSONPlaceholder
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

// Function to check if 5 or more tasks are completed using a promise
function checkCompletedTasks(completedCount) {
    return new Promise((resolve, reject) => {
        if (completedCount >= 5) {
            resolve(); // Resolve if 5 or more tasks are completed
        } else {
            reject("Less than 5 tasks are completed"); // Reject otherwise
        }
    });
}
