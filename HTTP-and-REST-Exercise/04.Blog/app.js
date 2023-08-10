function attachEvents() {
    const loadPostsBtn = document.getElementById('btnLoadPosts')
    loadPostsBtn.addEventListener('click', loadPosts)
    let posts = ''

    async function loadPosts() {
        const allPosts = await (await fetch('http://localhost:3030/jsonstore/blog/posts')).json()
        posts = allPosts

        Object.keys(allPosts).forEach(key => {
            const option = document.createElement('option')
            option.value = key
            option.innerHTML = allPosts[key].title
            document.getElementById('posts').appendChild(option)
        })
    }

    const viewBtn = document.getElementById('btnViewPost')
    viewBtn.addEventListener('click', view)

    async function view() {
        const selectedOption = document.getElementById('posts').value
        const comments = await(await fetch('http://localhost:3030/jsonstore/blog/comments')).json()   
        
        Object.keys(comments)
        .filter(commentId => comments[commentId].postId === selectedOption)
        .forEach(commentId => {
            const comment = comments[commentId]
            const li = document.createElement('li')
            li.id = comment.id
            li.textContent = comment.text
            document.getElementById('post-comments').appendChild(li)
        })

        document.getElementById('post-title').textContent = posts[selectedOption].title

        document.getElementById('post-body').textContent = posts[selectedOption].body
    }
    }

attachEvents();