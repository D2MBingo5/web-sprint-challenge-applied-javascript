import axios from "axios"
import { articles } from "../mocks/data"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardContainer = document.createElement('div')
    const headlineDiv = document.createElement('div')
    const authorDiv = document.createElement('div')
      const authorPicDiv = document.createElement('div')
        const authorPic = document.createElement('img')
      const authorName = document.createElement('span')
  
  cardContainer.classList.add('card')
  headlineDiv.classList.add('headline')
  authorDiv.classList.add('author')
  authorPicDiv.classList.add('img-container')

  cardContainer.appendChild(headlineDiv)
  cardContainer.appendChild(authorDiv)
  authorDiv.appendChild(authorPicDiv)
  authorPicDiv.appendChild(authorPic)
  authorDiv.appendChild(authorName)

  headlineDiv.textContent = article.headline
  authorPic.src = article.authorPhoto
  authorName.textContent = article.authorName

  cardContainer.addEventListener('click', () => {
    console.log(article)
  })

  return cardContainer
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  selector = document.querySelector('.cards-container')
  
  axios.get(`http://localhost:5000/api/articles`)
    .then(res => {
      const articlesJavascript = res.data.articles.javascript
      const articlesBootstrap = res.data.articles.bootstrap
      const articlesTechnology = res.data.articles.technology
      const articlesJquery = res.data.articles.jquery
      const articlesNode = res.data.articles.node
      // Because res.data.articles doesn't really act like an array, it makes drying up this function very difficult lacking forEach
      articlesJavascript.forEach(item => {
        selector.appendChild(Card(item))
      })
      articlesBootstrap.forEach(item => {
        selector.appendChild(Card(item))
      })
      articlesTechnology.forEach(item => {
        selector.appendChild(Card(item))
      })
      articlesJquery.forEach(item => {
        selector.appendChild(Card(item))
      })
      articlesNode.forEach(item => {
        selector.appendChild(Card(item))
      })
    })
    .catch(err => {console.log(err)})
    .finally(() => {console.log('done')})
}

export { Card, cardAppender }
