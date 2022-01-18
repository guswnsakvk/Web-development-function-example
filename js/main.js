const cardList = document.querySelector(".card-list")
const xhr = new XMLHttpRequest()

function printCard(list, count){
  for(let i=0;i<count;i++){
    const card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("me-4")
    card.classList.add("card-width")
    card.id = `card${list.products[i].id}`
    const img = document.createElement("img")
    img.src = list.products[i].photo
    img.id = list.products[i].id
    img.draggable = true
    img.ondragstart = function ondragstart_handler(event){
      event.dataTransfer.setData("test", event.target.id)
    }
    img.ondragover = function ondragover_handler(event){
      event.preventDefault()
    }
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
      const cardCount = document.querySelectorAll(".card-list .card")
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
        printCard(responseObj, responseObj.products.length)
        console.log("결과가 없습니다ㅠㅠ")
      }
    }
    else{
      console.log("통신 실패")
    }
  }
})

//drag and drop
const shoppingBox = document.querySelector(".shopping-box")
const shoppingBoxList = document.querySelector(".shopping-box-list")
let dropItemId = []

function ondragover_handler(event){
  event.preventDefault()
}

function ondrop_handler(event){
  const data = event.dataTransfer.getData("test")

  dropItemId.forEach(function(element){
    if(element == data){
      alert("장바구니에 이미 있습니다")
      return
    }
  })

  dropItemId.push(data)

  const drop = document.querySelector(`#card${data}`)
  const dropTitle = drop.querySelector(".card-title")
  const dropBrand = drop.querySelector(".card-text")
  const dropPrice = drop.querySelector(".price")

  const shoppingCard = document.createElement("div")
  shoppingCard.classList.add("shoppingCard")
  const shoppingImgPlace = document.createElement("div")
  shoppingImgPlace.classList.add("shoppingImg")
  const shoppingImg = document.createElement("img")
  shoppingImg.src = `pr${parseInt(data)+1}.JPG`
  shoppingImgPlace.append(shoppingImg)
  shoppingCard.append(shoppingImgPlace)

  const shoppingInfo = document.createElement("div")
  shoppingInfo.classList.add("shoppingInfo")
  const productName = document.createElement("h5")
  productName.classList.add("product-name")
  productName.innerHTML = `${dropTitle.innerText}`
  const productBrand = document.createElement("h6")
  productBrand.classList.add("product-brand")
  productBrand.innerText = `${dropBrand.innerText}`
  const productPrice = document.createElement("h6")
  productPrice.classList.add("product-price")
  productPrice.innerText = `${dropPrice.innerText}`
  shoppingInfo.append(productName)
  shoppingInfo.append(productBrand)
  shoppingInfo.append(productPrice)

  const productCount = document.createElement("div")
  productCount.classList.add("product-count")
  const countInfo = document.createElement("p")
  countInfo.classList.add("count-info")
  countInfo.innerText = "수량"
  const getCount = document.createElement("input")
  getCount.classList.add("get-count")
  getCount.type = "number"
  getCount.min = "0"
  getCount.value = "1"
  productCount.append(countInfo)
  productCount.append(getCount)
  shoppingInfo.append(productCount)

  const productTotal = document.createElement("h6")
  productTotal.classList.add("product-total")
  productTotal.innerText = `합계: ${dropPrice.innerText}`
  shoppingInfo.append(productTotal)
  shoppingCard.append(shoppingInfo)
  shoppingBoxList.append(shoppingCard)

  // console.log(data)
  // console.log(drop)
  // console.log(dropTitle.innerText)
  // console.log(dropBrand.innerText)
  // console.log(dropPrice.innerText)
}