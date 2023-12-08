function create(words) {
   words.forEach(string => {
      const div = document.createElement('div')
      const par = document.createElement('p')
      par.innerHTML = string
      par.style.display = "none"
      div.appendChild(par)

      div.addEventListener('click', function() {
         par.style.display = 
         par.style.display === 'none' ? 'inline-block' : 'none'})
      

      document.getElementById('content').appendChild(div)
   });
}