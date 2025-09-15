let allWords = [
  "apple","sun","moon","car","book","tree","door","pen","bird","house",
  "wall","sky","rain","snow","road","star","chair","table","cloud","flower",
  "garden","river","mirror","window","shadow","forest","dream","light","stone","clock",
  "smile","voice","storm","phone","beach","tower","castle","ship","field","grass",
  "mountain","riverbank","desert","bridge","skyway","rainbow","valley","village","ocean","wave",
  "sand","fire","boat","city","path","song","paper","glass","hill","station"
]


  let easy = [
  "Sun","Moon","Car","Book","Tree","Door","Pen","Bird","House",
  "Wall","Sky","Rain","Snow","Road","Star","Chair","Table","Cloud","Flower","Apple"
]
  let normal = [
  "Garden","River","Mirror","Window","Shadow","Forest","Dream","Light","Stone","Clock",
  "Smile","Voice","Storm","Phone","Beach","Tower","Castle","Ship","Field","Grass"
]
  let hard= [
    "Fire","Boat","City","Path","Song","Paper","Glass","Hill","Station",
    "Sand","Mountain","Riverbank","Desert","Bridge","Skyway","Rainbow","Valley","Village","Ocean","Wave",
  ]
  
//levels
const lvls={
    "Esay":5,
    "normal":3,
    "hard":2
}
//حفظ السكور و الاسم]

let currentName=""



//defult level
let defaultLevelName="Esay"
let scondeDefult=lvls[defaultLevelName];
//selectors
let startInput=document.querySelector(".start")
let lvlNameSpan=document.querySelector('.message .lvl')
let secondsSpan=document.querySelector('.message .seconds')
let theWords=document.querySelector('.the-word')
let upcomingWords=document.querySelector('.upcomin-word')
let inpout=document.querySelector('.input')
let timeLeftSpan=document.querySelector('.time span')
let scoreGot = document.querySelector('.score .got')
let scoreTotal=document.querySelector('.score .total')
let finishMessage=document.querySelector('.finish')
let optionLevel=document.getElementById('level')
let reload=document.querySelector('.btn')
let userNameInput=document.querySelector('.user')
//sitings level name+seconde+score
lvlNameSpan.innerHTML=defaultLevelName
secondsSpan.innerHTML=scondeDefult
scoreTotal.innerHTML=allWords.length
timeLeftSpan.innerHTML=scondeDefult
//disable paste
inpout.onpaste=function(){
  return false
}

//start
startInput.onclick=function(){
  timeLeftSpan.innerHTML=scondeDefult
  
  
  this.remove()
  inpout.focus()
  currentName=userNameInput.value||"Guest"
  userNameInput.value=''
  //genrate function
  defaultEsay()
 
  //اختيار مستوي الصعوبة
  let selctedLevel=optionLevel.value
  if(selctedLevel){
    
      if(selctedLevel==='Normal'){
        timeLeftSpan.innerHTML=scondeDefult
      //المستوي العادي
      defaultLevelName='normal'
        scondeDefult=lvls[defaultLevelName]
        lvlNameSpan.innerHTML=defaultLevelName
        secondsSpan.innerHTML=scondeDefult
        normale()
    } if(selctedLevel==='Hard'){
      //المستوي الصعب
      defaultLevelName='hard',
        scondeDefult=lvls[defaultLevelName],
        lvlNameSpan.innerHTML=defaultLevelName,
        secondsSpan.innerHTML=scondeDefult,
        harde()
    }
  }
  
}

//اعادة تحميل الصفحة
reload.onclick=function(){
  location.reload()
}
//فونكشن الوضع الطبيعي الي هو السهل
function defaultEsay(){
  //random words
  let randomEasyWords=easy[Math.floor(Math.random()*easy.length)]
  //randomindex
  let randomEasyIndex=easy.indexOf(randomEasyWords)
  //remove word
  easy.splice(randomEasyIndex , 1)
  //show the random word
  theWords.innerHTML = randomEasyWords
  //dont add old word with new word
  upcomingWords.innerHTML='';
  //genrate words
  for(let i =0 ; i<easy.length;i++){
    //cerate elemant
    let div=document.createElement('div')
    let text=document.createTextNode(easy[i])
    div.appendChild(text)
    upcomingWords.appendChild(div)
  }
  // call function start
  startplay()
}


//فونكشن بداية اللعبة
function startplay(){
  //start time the play
  startTaime(5,()=>{
    //if the words in inner html===the words in input value ==remove the input value
    if(theWords.innerHTML.toLowerCase()===inpout.value.toLowerCase()){
      inpout.value=''
      
      scoreGot.innerHTML++
      
      if(easy.length>0){
        defaultEsay()
      }else{
        defaultLevelName='normal'
        scondeDefult=lvls[defaultLevelName]
        lvlNameSpan.innerHTML=defaultLevelName
        secondsSpan.innerHTML=scondeDefult
        normale()
      }
    }// game over لو الكلمة مش متطابقة يجبلي 
    else{
      let span=document.createElement('span')
      span.className='bad'
      let text=document.createTextNode('Game Over')
      span.appendChild(text)
      finishMessage.appendChild(span)
      inpout.value=''
      saveScore()
      rateScore()
    }
  })
}
//فونكشن العد التنازلي
let timer;
function  startTaime(seconds,callback){
  clearInterval(timer)
  let timeLeft=seconds
  timeLeftSpan.innerHTML=timeLeft
    timer=setInterval(()=>{
      timeLeft--;
    timeLeftSpan.innerHTML=timeLeft;
    if(timeLeft<=0){
    clearInterval(timer)
    if(callback)callback()
    }
  },1000)
}


function normale(){
  timeLeftSpan.innerHTML=scondeDefult
  //الكلمات العشاوئي للوضع المتوسط
  let randomNormal=normal[Math.floor(Math.random()*normal.length)]
  //انديكس للكلمات العشوائية
  let randomIndexNormalWoords=normal.indexOf(randomNormal)
  //مسح الكلمة التطلع اول مرة
  normal.splice(randomIndexNormalWoords,1)
  //div طباعة الكلمات المتبقية في ال 
  theWords.innerHTML=randomNormal
  //منع الكلمة القديمة الي طلعت تضاف علي الكلمات الجديدة
  upcomingWords.innerHTML=''
  // الكلمات الي متبقية في المستوي
  for(let i=0;i<normal.length;i++){
    let div=document.createElement('div')
    let text=document.createTextNode(normal[i])
    div.appendChild(text)
    upcomingWords.appendChild(div)
  }
  //فونكشن بداية العد التنازلي
  startTaime(3,()=>{
    if(theWords.innerHTML.toLowerCase()===inpout.value.toLowerCase()){
      inpout.value=''
      scoreGot.innerHTML++
      if(normal.length>0){
        this.normale()
      }else{
        defaultLevelName='hard'
        scondeDefult=lvls[defaultLevelName]
        lvlNameSpan.innerHTML=defaultLevelName
        secondsSpan.innerHTML=scondeDefult
        harde()
      }
    }else{
      let span=document.createElement('span')
      span.className='bad'
      let text=document.createTextNode('Game Over')
      span.appendChild(text)
      finishMessage.appendChild(span)
      inpout.value=''
      saveScore()
      rateScore()
    }
  })
}


function harde(){
  timeLeftSpan.innerHTML=scondeDefult
  //random hard words
  let randomHardWords=hard[Math.floor(Math.random()*hard.length)]
  //random hard words index
  let indexHardWords=hard.indexOf(randomHardWords)
  //remove the old word
  hard.splice(  indexHardWords,1)
  //run the words in innerhtml
  theWords.innerHTML=randomHardWords
  //remove the old word in upcominig-words
  upcomingWords.innerHTML=''
  //for loop
  for(let i=0;i<hard.length;i++){
    let div=document.createElement('div')
    let text=document.createTextNode(hard[i])
    div.appendChild(text)
    upcomingWords.appendChild(div)
  }
  startTaime(2,()=>{
    if(theWords.innerHTML.toLowerCase()===inpout.value.toLowerCase()){
      inpout.value=''
      scoreGot.innerHTML++
      if(hard.length>0){
        this.harde()
      }else{
        let span = document.createElement('span')
        span.className='good'
        let text=document.createTextNode('Good Job')
        span.appendChild(text)
        finishMessage.appendChild(span)
        console.log(finishMessage)
        saveScore()
      rateScore()
      }
    }else{
      let span=document.createElement('span')
      span.className='bad'
      let text=document.createTextNode('Game Over')
      span.appendChild(text)
      finishMessage.appendChild(span)
      inpout.value=''
      saveScore()
      rateScore()
      
    }
  })
}
function saveScore(){
  let socres=JSON.parse(localStorage.getItem("scores"))||[];
  socres.push({
    name:currentName||"Guest",
    score:parseInt(scoreGot.innerHTML)
  })
  localStorage.setItem("scores",JSON.stringify(socres))
}
function rateScore(){
  let scores=JSON.parse(localStorage.getItem("scores"))||[]
  let score=''
  for(let i =0 ;i<scores.length;i++){
    score+=`<div class="card-body">
            <h4 class="card-title">name:${scores[i].name}</h4>
            <p class="card-text">score:${scores[i].score}</p>
        </div>`
  }
  document.getElementById('carde').innerHTML=score
}
if(localStorage.getItem('scores')!==null){
  rateScore()
}
