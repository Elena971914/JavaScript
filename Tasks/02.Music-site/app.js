window.addEventListener('load', solve);

function solve() {
    const genre = document.getElementById('genre')
    const name = document.getElementById('name')
    const author = document.getElementById('author')
    const date = document.getElementById('date')

    const allHits = document.getElementsByClassName('all-hits-container')[0]
    const savedHits = document.getElementsByClassName('saved-container')[0]

    const addBtn = document.getElementById('add-btn')
    addBtn.addEventListener('click', add)

    function add(e) {
        if (e) { e.preventDefault() }

        if (!genre.value|| !name.value || !author.value || !date.value) { return }

        const songContainer = createElement('div', allHits, '', ['hits-info']);
        createElement('img', songContainer, null, null, null, { src: './static/img/img.png' });
        createElement('h2', songContainer, `Genre: ${genre.value}`);
        createElement('h2', songContainer, `Name: ${name.value}`);
        createElement('h2', songContainer, `Author: ${author.value}`);
        createElement('h3', songContainer, `Date: ${date.value}`);
        const saveBtn = createElement('button', songContainer, 'Save song', ['save-btn']);
        const likeBtn = createElement('button', songContainer, 'Like song', ['like-btn']);
        const deleteBtn = createElement('button', songContainer, 'Delete', ['delete-btn']);
        likeBtn.addEventListener('click', like);
        deleteBtn.addEventListener('click', deleteSong);
        saveBtn.addEventListener('click', save);
        document.querySelector('form').reset();

    }
    function save() {
        const content = this.parentNode
        savedHits.appendChild(content)
        const saveBtn = content.querySelector('.save-btn');
        const likeBtn = content.querySelector('.like-btn');
        saveBtn.remove();
        likeBtn.remove();
    }
    function like() {
        const curLikes = document.querySelector('#total-likes p').textContent.slice(-1)
        document.querySelector('#total-likes p').textContent = `Total Likes: ${Number(curLikes) + 1}`
        this.disabled = true
    }
    function deleteSong() { this.parentNode.remove() }
    
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
