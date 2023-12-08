function addItem() {
   //get what is written in the field
   const value = document.querySelector('#newItemText').value;
   //access the place we want to add/use method to write/
       // document.querySelector('ul').innerHTML += `<li>${value}</li>`
       //create element in the memory
       const item = document.createElement('li')
       //changing the value of this element
       item.textContent = value

       const deleteButton = document.createElement('a');
       deleteButton.href = "#";
       deleteButton.textContent = '[Delete]'

       item.appendChild(deleteButton)

    //element that is created because of the event that happens
       deleteButton.addEventListener('click', (e) => e.target.parentElement.remove())
       //adding it to the html
       document.querySelector('ul').appendChild(item);
}