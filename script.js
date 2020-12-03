const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const todosContainer = document.querySelector('.container')
const draggables = document.querySelectorAll('.draggable')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  addTodo()
})

function addTodo(todo) {
  let todoText = input.value
  if (todo) {
    todoText = todo.text
  }

  if (todoText) {
    const todoEl = document.createElement('li')
    todoEl.className = 'draggable'
    todoEl.setAttribute('draggable', true)
    if (todo && todo.completed) {
      todoEl.classList.add('completed')
    }

    todoEl.innerText = todoText

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed')
    })

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()

      todoEl.remove()
    })

    todosUL.appendChild(todoEl)

    input.value = ''
  }
}


todosUL.addEventListener('dragstart', function (e) {
  if (e.target && e.target.matches('li.draggable')) {
    e.target.classList.add('dragging')
    console.log('drag start')
  }
})

todosUL.addEventListener('dragend', function (e) {
  if (e.target && e.target.matches('li.draggable')) {
    e.target.classList.remove('dragging')
    console.log('drag end')
  }
})

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    console.log('drag start')
    // draggable.classList.add('dragging')
  })
})