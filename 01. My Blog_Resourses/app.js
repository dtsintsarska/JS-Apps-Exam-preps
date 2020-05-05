function solve() {

   let authorInput = document.querySelector("#creator");
   let titleInput = document.querySelector("#title");
   let categoryInput = document.querySelector("#category");
   let contentInput = document.querySelector("#content");
   let createButton = document.querySelector("body > div > div > aside > section:nth-child(1) > form > button");

   let archiveSection = document.querySelector("body > div > div > aside > section.archive-section > ul");

   let sectionArticles = document.querySelector("body > div > div > main > section");

   createButton.addEventListener('click', (e) => {
      e.preventDefault()
      addArticle(e)
   })

   function addArticle(e) {

      let author = authorInput.value;
      let title = titleInput.value;
      let category = categoryInput.value;
      let content = contentInput.value;

      if (author !== '' && title !== '' && category !== '' && content !== '') {

         let articleHMTL = document.createElement('article');

         let h1 = document.createElement('h1')
         h1.textContent = title;
         articleHMTL.appendChild(h1);

         let p = document.createElement('p');
         p.textContent = "Category:"
         let strongCategory = document.createElement('strong')
         strongCategory.textContent = category
         p.appendChild(strongCategory)
         articleHMTL.appendChild(p);

         let p1 = document.createElement('p');
         p1.textContent = "Creator:"
         let strongCreator = document.createElement('strong')
         strongCreator.textContent = author
         p1.appendChild(strongCreator)
         articleHMTL.appendChild(p1);

         let pContent = document.createElement('p')
         pContent.textContent = content
         articleHMTL.appendChild(pContent)

         let divButtons = document.createElement('div')
         divButtons.className = 'buttons'

         let deleteButton = document.createElement('button')
         deleteButton.className = 'btn delete'
         deleteButton.textContent = 'Delete'
         deleteButton.addEventListener('click', (e) => {
            deleteArticle(e)
         })
         divButtons.appendChild(deleteButton)

         let archiveButton = document.createElement('button')
         archiveButton.className = 'btn archive'
         archiveButton.textContent = 'Archive'
         archiveButton.addEventListener('click', (e) => {
            archiveArticle(e)
         })
         divButtons.appendChild(archiveButton)

         articleHMTL.appendChild(divButtons)

         sectionArticles.appendChild(articleHMTL)
      }
   }

   function deleteArticle(e) {
      let article = e.target.parentNode.parentNode

      article.remove()

   }

   function archiveArticle(e) {

      let parentArticle = e.target.parentNode.parentNode
      let title = parentArticle.querySelector('h1').textContent
      archiveSection.innerHTML += `<li>${title}</li>`

      //let li = document.createElement('li')
      // li.textContent = title;
      // archiveSection.appendChild(li)

      parentArticle.remove()


      sorting(archiveSection)

      // let list = Array.from(archiveSection.children)
      // if (list.length > 1) {
      //    list.sort((a, b) => a.textContent.localeCompare(b.textContent))
      //       .map(node => archiveSection.appendChild(node))
      // }
   }

   function sorting(where) {
      let items = where.getElementsByTagName('li');
      if (items) {
         let sorted = [].slice.call(items).sort((a, b) => a.textContent.localeCompare(b.textContent));
         where.innerHTML = '';

         sorted.forEach(x => where.appendChild(x));
      }
   }
}