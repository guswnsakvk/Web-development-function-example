# Web-development-function  
본 프로젝트는 20년도 웹 개발 기능 대회 과제를 만들면 연습한 것입니다  
[20년도 웹 개발 기능 대회](https://meister.hrdkorea.or.kr/sub/3/6/3/informationSquare/byYearTask.do)

# 목차
- 프로젝트 소개
- jQuery를 사용안하고 JS를 사용한 이유
- 어려웠던 부분 & 해결한 방법
- 마치며

# 1. 프로젝트 소개
## 1.1 프로젝트 목적
- 바닐라 자바스크립트를 활용하는 실력을 기르기 위함
- Drag and Drop에 대한 공부
- Ajax를 활용해서 json파일 값 가져오기

## 1.2 사용한 라이브러리
- [Bootstarp](https://getbootstrap.com/)
- [reset.css](https://www.jsdelivr.com/package/npm/reset-css)
- [Font Awesome](https://fontawesome.com/)

# 2. jQuery를 사용안하고 JS를 사용한 이유
JS를 공부하다보니 자연스럽게 jQuery를 접하게 되었습니다. jQuery문법을 보니 정말 편하게 개발을 할 수 있을 거 같다는 생각이 들었습니다.  
jQuery가 정말 간단하고 강력한 느낌을 받아 이 프로젝트를 jQuery로 진행할까 생각했지만 두 가지 이유로 인하여 JS로 진행하게 되었습니다.  

## 1) 간결하고 쉽고 강력함
간결하고 쉽고 강력해서 jQuery말고 JS를 택했다니 이해가 되지 않는 사람들이 있을 거라고 생각을 합니다. JS에 따로 구현을 해야하지만 jQuery에는 fadein, fadeout 등이 구현되어 있기에 프로젝트를 더 빠르고 더 완성도있게 만들 수 있을 거라고 생각이 됩니다.  
허나 필자는 프로그래밍을 공부하면서 기초를 쌓아가는 단계이기 때문에 fadein, fadeout같은 기능을 아무생각없이 사용하는 것보다 JS로 구현하면서 어떻게 작동하는 지, 왜 이렇게 작동이되는 지를 생각하고 이해하는 시간을 갖추는 것이 좋다고 생각되어 JS로 진행하기로 했습니다  

## 2) jQuery을 다른 사람들의 견해
처음에는 jQuery로 진행을 하려고 했기에 구글링이나 유튜브를 보니 많은 사람들이 jQuery보다는 JS를 더 중요하게 생각하는 거 같았습니다.  
이유를 보니 옛날에는 JS가 안예쁘고 브라우저마다 각각 다른 코드를 짜야했고 jQuery는 무겁고 등등 많은 이유로 JS가 더 중요하다고 말하고 있었습니다.  

## jQuery에 대한 필자의 견해
구글링을 해보니 jQuery를 쓰지않아도 된다, 배우지 않아도 된다와 jQuery는 사랑입니다, 편해서 좋은데 등등 반으로 나뉘었습니다. 필자는 jQuery 또한 어느정도는 알아야 한다고 생각합니다.  
세상 어딘가에서는 jQuery로 진행하는 프로젝트가 있을 것이고 내가 거기에 투입될지도 모르고 협업을 하는데 다른 사람이 jQuery로 진행한다면 그 사람의 코드를 내가 절대 안건드릴 거라고 확정할 수 없기에 jQuery를 빠삭하게 모른다고 하더라도 기본은 알아야 된다고 생각을 합니다.  

# 3. 어려웠던 부분 & 해결한 방법
## Drag and Drop  
### 문제1) Drag and Drop으로 가져온 요소의 id를 어떻게 활용할까?
- 가져온 요소의 id로는 모든 값을 다 가져오지 못하는 상황
- 가져온 요소의 부모를 활용하면 모든 값을 가져올 수 있는 상황

### 문제1 해결방안
- 가져온 요소의 id를 활용하여 부모 요소를 찾기
- 부모 요소에 아이디를 부여하여 값을 가져오기
``` js
card.id = `card${list.products[i].id}` //부모 요소에 아이디 부여
const drop = document.querySelector(`#card${data}`) // 아이디를 활용하여 부모 요소 찾기
```
---
### 문제2 상품개수에 따른 값 변경을 어떻게 해야 할까?
- 잘못된 생각
  - 요소를 생성할 때 addEventListener를 부착못한다
- 해결하기 위해 했던 생각
  - drop했을 때 특정 요소의 class를 리스트에 담아서 해결하기 -> 실패
  - drop될 때까지 기다려주는 기능찾기 -> 실패
### 문제2 해결 방안
- 생각의 변화
  - drop하고 요소를 생성하고 addEventListener를 사용할 수 있음
- drop할 때 요소에 addEventListener 부착하기
``` js
// 
const getCount = document.createElement("input")
getCount.addEventListener("change", ()=>{
      productTotal.innerText = `합계: ${valueChange.value * parseInt(dropPrice.innerText)}`
      prices[data] = parseInt(`${valueChange.value * parseInt(dropPrice.innerText)}`)
      PurchasePrice(prices)
    })
```

# 마치며
이때까지 사용해보지 않았던 Ajax 연결과 Drag and Drop을 사용하려고 하니 겁을 먹고 시작했던 거 같습니다. 어떻게 구현해야하지? 어떻게 데이터를 받아오고 어떤 데이터를 받아오는지 등등...  
막상 시작을 해보니 어떻게 작동하고 이런 데이터를 넘기고 이런 방법으로 넘기다는 것을 조금씩 알아가니 퀴즈 푼다는 느낌이 들어 나름 재밌게 프로젝트를 했습니다.  
프로젝트를 다 끝내고 예시로 올려진 코드와 내 코드를 비교해보니 코드를 깔끔하게 짜기 위해 노력을 해야겠다고 느꼈습니다. 내가 내 코드를 봐도 바로바로 이해가 안되는 부분이 있어 코드를 짜기 전에 어떻게 짜야할지 생각을 하고 짜야겠다는 생각이 들었습니다.
다른 사람들이 내 코드를 보고 해석할 수 있도록 코드 예쁘게 짜는 법에 대해 찾아보고 나한테 적용해야겠다고 느꼈습니다.
