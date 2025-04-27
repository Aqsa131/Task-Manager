import {
    onAuthStateChanged, getAuth, db, doc, collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, setDoc
} from "../../fibase.config.js";

const auth = getAuth();
let currentUser = null;

// Listen for changes in authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("user", currentUser);
    } else {
        console.log("No user is logged in");
    }
});

// Add new to-do
const add = async () => {
    const input = document.querySelector(".inputField").value;
    if (!input) return;  // Prevent adding empty todos

    const docRef = await addDoc(collection(db, "todos"), {
        input,
        status: "pending", // New status field added
        timeStamp: serverTimestamp(),
        userId: currentUser?.uid  // Store userId
    });
    console.log("Document written with ID: ", docRef.id);
};

// Fetch all to-dos and display
const getAllTodos = async () => {
    const list = document.getElementById("list");
    const q = collection(db, "todos");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todosData = [];
        list.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const todoData = doc.data();
            // Only show to-do if the userId matches the logged-in user
            if (todoData.userId === currentUser?.uid) {
                list.innerHTML += `
                    <li id="todo-${doc.id}" class="todo-item list-group-item">
                        <span class="todo-input ${todoData.status === 'complete' ? 'completed' : ''}">${todoData.input}</span>
                        <div class="d-flex">
                            <button class="btn btn-warning editBtn" data-docid="${doc.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Task">Edit</button>
                            <button class="btn deleteBtn" data-docid="${doc.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Task">Delete</button>
                            <select class="form-select statusSelect" data-docid="${doc.id}">
                                <option value="pending" ${todoData.status === 'pending' ? 'selected' : ''}>Pending</option>
                                <option value="complete" ${todoData.status === 'complete' ? 'selected' : ''}>Complete</option>
                                <option value="done" ${todoData.status === 'done' ? 'selected' : ''}>Done</option>
                            </select>
                        </div>
                    </li>
                `;
            }
            todosData.push(todoData);
        });
        console.log("Current todos: ", todosData);
        
        // Add event listeners for Edit, Delete, and Status selection after the list is updated
        document.querySelectorAll('.editBtn').forEach(button => {
            button.addEventListener('click', (e) => {
                const docId = e.target.getAttribute('data-docid');
                editTodo(docId);
            });
        });

        document.querySelectorAll('.deleteBtn').forEach(button => {
            button.addEventListener('click', (e) => {
                const docId = e.target.getAttribute('data-docid');
                deleteTodo(docId);
            });
        });

        document.querySelectorAll('.statusSelect').forEach(select => {
            select.addEventListener('change', (e) => {
                const docId = e.target.getAttribute('data-docid');
                const newStatus = e.target.value;
                updateStatus(docId, newStatus);
            });
        });

        // Initialize tooltips
        var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(function (tooltipTriggerEl) {
            // new bootstrap.Tooltip(tooltipTriggerEl);
        });
    });
};

getAllTodos();

// Add event listener to add to-do
document.getElementById("addItems").addEventListener("click", add);

// Allow pressing Enter to add a to-do
document.querySelector(".inputField")?.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        add();
    }
});

// Delete all todos
const deleteAll = () => {
    let list = document.getElementById("list");
    list.innerHTML = "";
};

document.getElementById("deleteAll")?.addEventListener("click", deleteAll);

// Edit todo by ID
const editTodo = async (docId) => {
    const newInput = prompt("Edit your todo:");
    if (!newInput) return;  // If user cancels or leaves empty

    const todoRef = doc(db, "todos", docId);
    await setDoc(todoRef, {
        input: newInput,
        updatedAt: serverTimestamp()
    }, { merge: true });

    console.log(`Todo with ID ${docId} has been updated.`);
};

// Delete todo by ID
const deleteTodo = async (docId) => {
    const todoRef = doc(db, "todos", docId);
    await deleteDoc(todoRef);
    console.log(`Todo with ID ${docId} has been deleted.`);
};

// Update status of a to-do
const updateStatus = async (docId, newStatus) => {
    const todoRef = doc(db, "todos", docId);
    await setDoc(todoRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
    }, { merge: true });

    console.log(`Todo with ID ${docId} status has been changed to ${newStatus}.`);
};
