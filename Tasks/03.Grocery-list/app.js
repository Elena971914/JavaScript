function solve() {
    const table = document.getElementById('tbody')
    const addBtn = document.getElementById('add-product')
    const updateBtn = document.getElementById('update-product')
    const loadBtn = document.getElementById('load-product')
    let updateId = null

    addBtn.addEventListener('click', addProduct)
    loadBtn.addEventListener('click', loadProduct)

    async function loadProduct(e) {
        if (e) { e.preventDefault() }
        table.innerHTML = ""
        let products = {}
        try {
            products = await (await fetch('http://localhost:3030/jsonstore/grocery/')).json()
        } catch (err) { console.log(err) }

        for (let product of Object.values(products)) {
            const newRow = document.createElement('tr')
            newRow.id = product._id
            table.appendChild(newRow)
            
            tdName = document.createElement('td')
            tdName.classList.add('name')
            tdName.textContent = product.product
            newRow.appendChild(tdName)
            tdCount = document.createElement('td')
            tdCount.classList.add('count-product')
            tdCount.textContent = product.count
            newRow.appendChild(tdCount)
            tdPrice = document.createElement('td')
            tdPrice.classList.add('product-price')
            tdPrice.textContent = product.price
            newRow.appendChild(tdPrice)
            // newRow.innerHTML += `
            // <td class="name">${product.product}</td><td class="count-product">${product.count}</td><td class="product-price">${product.price}</td>`

            //td buttons
            const tdBtn = document.createElement('td')
            tdBtn.classList.add('btn')
            newRow.appendChild(tdBtn)

            //buttons
            const updateElementBtn = document.createElement('button')
            const deleteElementBtn = document.createElement('button')
            updateElementBtn.classList.add('update')
            deleteElementBtn.classList.add('delete')
            updateElementBtn.textContent = 'Update'
            deleteElementBtn.textContent = 'Delete'

            tdBtn.appendChild(updateElementBtn)
            tdBtn.appendChild(deleteElementBtn)

            updateElementBtn.addEventListener('click', loadDataToUpdate)
            deleteElementBtn.addEventListener('click', deleteElement)
        }
    }

    async function addProduct(e) {
        if (e) { e.preventDefault() }
        const name = document.querySelector('input[id="product"]')
        const count = document.querySelector('input[id="count"]')
        const price = document.querySelector('input[id="price"]')
        const newProduct = {
            product: name.value,
            count: count.value,
            price: price.value
        }
        await fetch('http://localhost:3030/jsonstore/grocery/', {
            method: 'POST',
            body: JSON.stringify(newProduct)
        })

        name.value = ''
        count.value = ''
        price.value = ''
        loadProduct()
    }

    async function deleteElement(e) {
        if (e) { e.preventDefault() }
        const id = e.currentTarget.parentNode.parentNode.id
        await fetch(`http://localhost:3030/jsonstore/grocery/${id}`, {method:'DELETE'})
        loadProduct()
    }

    async function loadDataToUpdate(e) {
        const [name, count, price] = Array.from(e.currentTarget.parentNode.parentNode.children)
        document.querySelector('input[id="product"]').value = name.textContent
        document.querySelector('input[id="count"]').value = count.textContent
        document.querySelector('input[id="price"]').value = price.textContent
        updateId = e.currentTarget.parentNode.parentNode.id
        
        addBtn.disabled = true
        updateBtn.disabled = false
        updateBtn.addEventListener('click', updateProduct)

    }async function updateProduct(e) {
            if (e) { e.preventDefault() }
            
            const name = document.querySelector('input[id="product"]')
            const count = document.querySelector('input[id="count"]')
            const price = document.querySelector('input[id="price"]')
            
            const newProduct = {
                product: name.value,
                count: count.value,
                price: price.value
            }
            
            console.log(e.currentTarget.id)
            await fetch(`http://localhost:3030/jsonstore/grocery/${updateId}`, {method:'PATCH', body: JSON.stringify(newProduct)})
    
            loadProduct()
            addBtn.disabled = false
            updateBtn.disabled = true
            name.value = ''
            count.value = ''
            price.value = ''
        }
    }


solve()