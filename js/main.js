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
const shoppingBoxList = document.querySelector(".shopping-box-list")
const total = document.querySelector(".total")
let dropItemId = []
const prices = [0,0,0,0]
let overlapCheck = false

function ondragover_handler(event){
  event.preventDefault()
}

function ondrop_handler(event){
  const data = event.dataTransfer.getData("test")

  dropItemId.forEach(function(element){
    if(element == data){
      overlapCheck = true
      return
    }
  })

  if(overlapCheck){
    alert("상품이 중복되었습니다")
    overlapCheck = false
    return
  }
  else{
    overlapCheck = false
    dropItemId.push(data)

    const drop = document.querySelector(`#card${data}`)
    const dropTitle = drop.querySelector(".card-title")
    const dropBrand = drop.querySelector(".card-text")
    const dropPrice = drop.querySelector(".price")

    const shoppingCard = document.createElement("div")
    shoppingCard.classList.add("shoppingCard")
    shoppingCard.classList.add(`card${data}`)
    const shoppingImgPlace = document.createElement("div")
    shoppingImgPlace.classList.add("shoppingImg")
    const shoppingImg = document.createElement("img")
    shoppingImg.src = `pr${parseInt(data)+1}.JPG`
    shoppingImgPlace.append(shoppingImg)
    shoppingCard.append(shoppingImgPlace)

    const shoppingInfo = document.createElement("div")
    shoppingInfo.classList.add("shoppingInfo")
    const productName = document.createElement("h6")
    productName.classList.add(`product-name${data}`)
    productName.innerHTML = `${dropTitle.innerText}`
    const productBrand = document.createElement("h6")
    productBrand.classList.add(`product-brand${data}`)
    productBrand.innerText = `${dropBrand.innerText}`
    const productPrice = document.createElement("h6")
    productPrice.classList.add(`product-price${data}`)
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
    getCount.classList.add(`get-count${data}`)
    getCount.type = "number"
    getCount.min = "0"
    getCount.value = "1"
    productCount.append(countInfo)
    productCount.append(getCount)
    shoppingInfo.append(productCount)

    const productTotal = document.createElement("h6")
    productTotal.classList.add(`product-total${data}`)
    productTotal.innerText = `합계: ${dropPrice.innerText}`
    shoppingInfo.append(productTotal)
    shoppingCard.append(shoppingInfo)
    shoppingBoxList.append(shoppingCard)

    const valueChange = document.querySelector(`.get-count${data}`)
    valueChange.addEventListener("change", ()=>{
      productTotal.innerText = `합계: ${valueChange.value * parseInt(dropPrice.innerText)}`
      prices[data] = parseInt(`${valueChange.value * parseInt(dropPrice.innerText)}`)
      PurchasePrice(prices)
    })

    const icon = document.createElement("i")
    icon.classList.add("fas")
    icon.classList.add("fa-times")
    icon.classList.add(`icon${data}`)
    shoppingCard.append(icon)
    const removeItem = document.querySelector(`.icon${data}`)
    removeItem.addEventListener("click", function(event){
      event.target.parentElement.remove()
      prices[data] = 0
      PurchasePrice(prices)
     for(let i=0;i<dropItemId.length;i++){
       if(dropItemId[i] === data){
         dropItemId.splice(i,1)
         i--
       }
     }
    })

    prices[data] = parseInt(`${dropPrice.innerText}`)
    PurchasePrice(prices)
  }
}

function PurchasePrice(prices){
  let sum = 0
  prices.forEach(price => {
    sum += price
  })
  total.innerText = `총합: ${sum}`
}

// 구매하기
const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
const receipt = document.querySelector(".receipt")
const today = new Date()
const closeReceipt = document.querySelector(".close")
const buyButton = document.querySelector(".buy-button")
canvas.width = 0
canvas.height = 0

buyButton.addEventListener("click", function(event){
  console.log(receipt)
  receipt.classList.remove("hidden")
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const hours = today.getHours()
  const minutes = today.getMinutes()
  const seconds = today.getSeconds()
  canvas.width = 500
  canvas.height = 200 + (120 * dropItemId.length)

  c.font = '24px dotum'
  c.fillText('영수증', 30, 45)

  c.font = '16px dotum'
  c.fillText(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`, 30, 75)

  for(let i=0;i<dropItemId.length;i++){
    const productName = document.querySelector(`.product-name${dropItemId[i]}`).innerText
    const productBrand = document.querySelector(`.product-brand${dropItemId[i]}`).innerText
    const productPrice = document.querySelector(`.product-price${dropItemId[i]}`).innerText
    const productCount = document.querySelector(`.get-count${dropItemId[i]}`).value
    const productTotal = document.querySelector(`.product-total${dropItemId[i]}`).innerText
    
    c.fillText(productName, 30, 120 * (i+1))
    c.fillText(productBrand, 30, 120 * (i+1) + 20)
    c.fillText(`가격 : ${productPrice}`, 30, 120 * (i+1) + 40)
    c.fillText(`수량 : ${productCount}`, 30, 120 * (i+1) + 60)
    c.fillText(`${productTotal}`, 30, 120 * (i+1) + 80)
  }

  c.fillText(`${total.innerText}`, 30, 120 * dropItemId.length + 150)
})

closeReceipt.addEventListener("click", function(){
  receipt.classList.add("hidden")

  for(let i=0;i<dropItemId.length;i++){
    shoppingBoxList.removeChild(shoppingBoxList.firstElementChild)
    prices[`${dropItemId[i]}`] = 0
    if(dropItemId[i]){
      dropItemId.splice(i,1)
      i--
    }
  }
  console.log(prices)
  console.log(dropItemId)
  PurchasePrice(prices)
})