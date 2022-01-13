const cardList = document.querySelector(".card-list")
const xhr = new XMLHttpRequest()

function printCard(list, count){
  for(let i=0;i<count;i++){
    const card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("me-4")
    card.classList.add("card-width")
    const img = document.createElement("img")
    img.src = list.products[i].photo
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    const cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    cardTitle.innerText = list.products[i].product_name
    const cardText = document.createElement("p")
    cardText.classList.add("card-text")
    cardText.innerText = list.products[i].brand_name
    const price = document.createElement("div")
    price.classList.add("price")
    price.classList.add("container")
    price.innerText = list.products[i].price
    cardBody.append(cardTitle)
    cardBody.append(cardText)
    card.append(img)
    card.append(cardBody)
    card.append(price)
    cardList.append(card)
  }
}

xhr.open('GET', './store.json', true)
xhr.send()

xhr.onload = (data) => {
  if(xhr.status == 200){
    const responseObj = JSON.parse(data.target.responseText)
    printCard(responseObj, responseObj.products.length)
  }
  else{
    console.log("통신 실패")
  }
}

// fillter
const form = document.querySelector("form")
const input = document.querySelector("input")
const fillterProducts = {"products": []}

function Reset(count){
  for(let i=0;i<count;i++){
    cardList.removeChild(cardList.firstElementChild)
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const inputValue = input.value
  
  xhr.open('GET', './store.json', true)
  xhr.send()

  xhr.onload = (data) => {
    if(xhr.status == 200){
      const cardCount = document.querySelectorAll(".card")
      Reset(cardCount.length)
      const responseObj = JSON.parse(data.target.responseText)
      for(let i=0;i<responseObj.products.length;i++){
        responseObj.products[i].product_name.indexOf(inputValue)
        if(responseObj.products[i].product_name.indexOf(inputValue) != -1){
          fillterProducts.products.push(responseObj.products[i])
        }
      }
      if(fillterProducts.products.length > 0){ 
        printCard(fillterProducts, fillterProducts.products.length)
        delete fillterProducts.products
        fillterProducts.products = []
      }
      else{
        console.log("결과가 없습니다ㅠㅠ")
      }
    }
    else{
      console.log("통신 실패")
    }
  }
})