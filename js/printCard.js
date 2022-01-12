const cardList = document.querySelector(".card-list")

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

const xhr = new XMLHttpRequest()
xhr.open('GET', './store.json', true)
xhr.send()

xhr.onload = (data) => {
  if(xhr.status == 200){
    const responseObj = JSON.parse(data.target.responseText)
    printCard(responseObj, responseObj.products.length)
    console.log(cardList)
    console.log(`responseObj.products[${1}].photo`)
    console.log(responseObj.products[0].photo)
  }
  else{
    console.log("통신 실패")
  }
}