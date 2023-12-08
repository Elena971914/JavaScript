window.addEventListener('load', solve);

function solve() {
  const inputDOMelements = {
    title: document.getElementById('title'),
    description: document.getElementById('description'),
    label: document.getElementById('label'),
    points: document.getElementById('points'),
    assignee: document.getElementById('assignee')
  }
  const otherDOMelements = {
    createBtn: document.getElementById('create-task-btn'),
    deleteBtn: document.getElementById('delete-task-btn'),
    tasksSection: document.getElementById('tasks-section'),
    form: document.getElementById('create-task-form'),
    totalPointsContainer: document.getElementById('total-sprint-points'),
    totalPoints: 0
  }
  const icons = {
    'Feature': '&#8865',
    'Low Priority Bug': '&#9737',
    'High Priority Bug': '&#9888'
  }
  const additionalLabelClasses = {
    'Feature': "feature",
    'Low Priority Bug': "low-priority",
    'High Priority Bug': "high-priority"
  }
  let articleNumber = 0

  otherDOMelements.createBtn.addEventListener('click', create)

  function create() {
    const { title, description, label, points, assignee } = inputDOMelements

    if (!title.value || !description.value || !points.value || !assignee.value || !label.value) { return }

    articleNumber++
    const taskArticle = createElement('article', otherDOMelements.tasksSection, "", ['task-card'], `task-${articleNumber}`)
    console.log(articleNumber)
    const cardLabel = createElement('div', taskArticle, `${label.value} ${icons[label.value]}`, ['task-card-label', additionalLabelClasses[label.value]], null, null, true)
    const cardTitle = createElement('h3', taskArticle, title.value, ['task-card-title'])
    const cardDescription = createElement('p', taskArticle, description.value, ['task-card-description'])
    const cardPoints = createElement('div', taskArticle, `Estimated at ${points.value} pts`, ['task-card-points'])
    const cardAssignee = createElement('div', taskArticle, `Assigned to: ${assignee.value}`, ['task-card-assignee'])
    const cardActions = createElement('div', taskArticle, "", ['task-card-actions'])
    const deleteBtn = createElement('button', cardActions, 'Delete')
    deleteBtn.addEventListener('click', deleteTask)
    otherDOMelements.totalPointsContainer.textContent = `Total points ${getPoints()}pts`
    otherDOMelements.form.reset()
  }
  function deleteTask() {
    const [label, title, description, points, assignee] = Array.from(this.parentNode.parentNode.children)

    inputDOMelements.title.value = title.textContent
    inputDOMelements.description.value = description.textContent
    inputDOMelements.label.value = label.textContent.substring(0, label.textContent.length - 2)
    inputDOMelements.points.value = points.textContent.match(/\d+/)
    inputDOMelements.assignee.value = assignee.textContent.substring(13)

    otherDOMelements.createBtn.disabled = true
    otherDOMelements.deleteBtn.disabled = false

    for (let el of Object.values(inputDOMelements)) {
      el.disabled = true
    }

    const taskId = this.parentNode.parentNode.getAttribute('id');
    document.getElementById('task-id').value = taskId;

    otherDOMelements.deleteBtn.addEventListener('click', deleteTask2)
  }
  function deleteTask2() {
    articleNumber--
    const taskId = document.getElementById('task-id').value
    console.log(taskId)
    console.log(articleNumber)
    const taskToRemove = document.getElementById(taskId)
    taskToRemove.remove()
    for (let el of Object.values(inputDOMelements)) {
      el.value = ''
      el.disabled = false
    }
    otherDOMelements.createBtn.disabled = false
    otherDOMelements.deleteBtn.disabled = true
    otherDOMelements.totalPointsContainer.textContent = `Total Points ${getPoints()}pts`
  }
  function getPoints() {
    const array = Array.from(document.querySelectorAll('.task-card-points'))
    let points = 0
    for (let el of array) {
      points += Number(el.textContent.match(/\d+/))
    }
    return points
  }
  function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    const htmlElement = document.createElement(type);

    if (content && useInnerHtml) {
      htmlElement.innerHTML = content;
    } else {
      if (content && type !== 'input') {
        htmlElement.textContent = content;
      }
      if (content && type === 'input') {
        htmlElement.value = content;
      }
    }
    if (classes && classes.length > 0) {
      htmlElement.classList.add(...classes);
    }
    if (id) {
      htmlElement.id = id;
    }
    // { src: 'link', href: 'http' }
    if (attributes) {
      for (const key in attributes) {
        htmlElement.setAttribute(key, attributes[key])
      }
    }
    if (parentNode) {
      parentNode.appendChild(htmlElement);
    }
    return htmlElement;
  }
}