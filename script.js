const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const todosContainer = document.querySelectorAll('.container')
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

todosContainer.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
