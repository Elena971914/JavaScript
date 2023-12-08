function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const searchedStr = document.querySelector("#searchField").value
      const cells = Array.from(document.querySelectorAll("tbody td"))
      const activeRows = Array.from(document.querySelectorAll("tbody tr.select"))

      for (let active of activeRows) {
            active.classList.remove("select")
         }
      

      for (let cell of cells) {
         if (cell.textContent.includes(searchedStr)) {
            cell.parentElement.classList.add('select')
         }
         document.querySelector("#searchField").value = ''
      }}
   }
