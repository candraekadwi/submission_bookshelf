
let todos = [];

window.addEventListener("DOMContentLoaded", (function () {
    todos = JSON.parse(localStorage.getItem("books")) || [],
    makeTodo(todos);
    console.log(todos);
    const submitForm = document.querySelector("#inputBook");
    const search = this.document.querySelector("#searchBook");
    submitForm.addEventListener('submit',addTodo);
    search.addEventListener("submit", cari);
    document.addEventListener("bookChanged", save)
}
))

function save() {
    !function (todos) {
        localStorage.setItem("books", JSON.stringify(todos))
    }(todos),
        makeTodo(todos)
}
function cari(event) {
    event.preventDefault();
    const search = document.querySelector("#searchBookTitle");
    query = search.value,
        query ? makeTodo(todos.filter((function (todos) {
            return todos.title.toLowerCase().includes(query.toLowerCase())
        }
        ))) : makeTodo(todos)
}

function addTodo(event) {
    event.preventDefault();
    const title1 = document.getElementById('inputBookTitle').value;
    const author1 = document.getElementById('inputBookAuthor').value;
    const year1 = document.getElementById('inputBookYear').value;
    const isComplete1 = document.getElementById('inputBookIsComplete').checked;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, title1, author1, year1, isComplete1);
    todos.push(todoObject);

    document.dispatchEvent(new Event("bookChanged"));
}

function generateId() {
    return +new Date();
}

function generateTodoObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}



function makeTodo(todos) {

    const uncompletedTODOList = document.getElementById('incompleteBookshelfList');
    uncompletedTODOList.innerHTML = '';
    
    const completedTODOList = document.getElementById('completeBookshelfList');
    completedTODOList.innerHTML = '';
    for (const todo of todos) {
    const article = document.createElement("article");
    article.classList.add("book_item");

    const title1 = document.createElement('h3');
    title1.innerText = todo.title;

    const author1 = document.createElement('p');
    author1.innerText = "Penulis: " + todo.author;

    const year1 = document.createElement('p');
    year1.innerText = "Tahun:" + todo.year;


    const action = document.createElement("div");
    action.classList.add("action");
    
    if (article.append(title1, author1, year1),
    todo.isComplete) {
        const undoButton = document.createElement('button');
        undoButton.innerText = "Belum selesai dibaca";
        undoButton.classList.add('green');

        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(todo.id);
        });

        const trashButton = document.createElement('button');
        trashButton.innerText = "Hapus buku";
        trashButton.classList.add('red');

        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(todo.id);
        });

        action.append(undoButton, trashButton);
        article.appendChild(action);
        completedTODOList.appendChild(article);
        
    } else {
        const checkButton = document.createElement('button');
        checkButton.innerText = "Selesai dibaca";
        checkButton.classList.add('green');

        checkButton.addEventListener('click', function () {
            addTaskToCompleted(todo.id);
        });

        const trashButton = document.createElement('button');
        trashButton.innerText = "Hapus buku";
        trashButton.classList.add('red');

        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(todo.id);
        });
        action.append(checkButton, trashButton);
         article.appendChild(action);
        uncompletedTODOList.appendChild(article);

    }

    }
    
}

function addTaskToCompleted(todoId) {
    const data = Number(todoId)
        , data1 = todos.findIndex((function (todos) {
            return todos.id === data
        }
        ));
    -1 !== data1 && (todos[data1] = {
        ...todos[data1],
        isComplete: !0
    },
    document.dispatchEvent(new Event("bookChanged")));
}

function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
   
    if (todoTarget === -1) return;
   
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event("bookChanged"));
  }
   
   
  function undoTaskFromCompleted(todoId) {
  const data = Number(todoId)
        , data1 = todos.findIndex((function (todos) {
            return todos.id === data
        }
        ));
    -1 !== data1 && (todos[data1] = {
        ...todos[data1],
        isComplete: !1
    },
    document.dispatchEvent(new Event("bookChanged")));
  }

function findTodo(todoId) {
    for (const todoItem of todos) {
        if (todoItem.id === todoId) {
            return todoItem;
        }
    }
    return null;
}

function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
   
    return -1;
  }



