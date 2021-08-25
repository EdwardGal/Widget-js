//DIVS CREATE========================================================================================================================================================
const htmlBody = document.querySelector('body');

//========================================================================================================================================================
const widget = document.createElement('div');
widget.classList.add('widget');
htmlBody.prepend(widget);

//========================================================================================================================================================
const widgetContainer = document.createElement('div');
classCreate(widgetContainer, 'widget__container', widget)

//========================================================================================================================================================
const widgetTop = document.createElement('div');
classCreate(widgetTop, 'widget__top', widgetContainer)

//========================================================================================================================================================
const widgetInfo = document.createElement('div');
widgetInfo.classList.add('widget__info');
widgetTop.prepend(widgetInfo);

//========================================================================================================================================================
let topArr = [];
divCreate('div',widgetInfo, topArr);

for (let key in topArr) {
   topArr[0].classList.add('widget__date');
   topArr[1].classList.add('widget__time');
}

document.querySelector('.widget__date').innerHTML = 'Monday' + ' - ' + 'August 23';
document.querySelector('.widget__time').innerHTML = '7:42 ' + 'am';

//========================================================================================================================================================

const cities = {
   524894: "Moscow",
   542420: "Krasnodar",
   528293: "Maykop",
   561515: "Giaginskaya"
}

const sel = document.createElement('select');
sel.classList.add('widget__select');
sel.setAttribute('id', 'city');
widgetInfo.prepend(sel);


for (let key in cities) {
   let opt = document.createElement('option');
   opt.innerHTML = cities[key];
   opt.value = key;
   sel.append(opt);
}

//========================================================================================================================================================
const widgetBottom = document.createElement('div');
classCreate(widgetBottom, 'widget__bottom', widgetContainer)

let columnArr = [];
divCreate('div',widgetBottom, columnArr);

for (let key in columnArr) {
   columnArr[0].classList.add('widget__column');
   columnArr[1].classList.add('widget__column');
}

let divArr1 = [];
divCreate('div',columnArr[0], divArr1)

for (let key in divArr1) {
   divArr1[0].classList.add('widget__feels-like')
   divArr1[1].classList.add('widget__wind')
}

let divArr2 = [];
divCreate('div',columnArr[1], divArr2)

for (let key in divArr2) {
   divArr2[0].classList.add('widget__temp')
   divArr2[1].classList.add('widget__weather')
}

//IMAGE CREATE========================================================================================================================================================

let image = document.createElement('img');
image.classList.add('widget__image');
image.setAttribute('src', 'sun.png');
image.style.maxWidth = '130px';

document.querySelector('.widget__top').append(image);

//FUNCTIONS========================================================================================================================================================

function divCreate(teg,divAppend, arr) {
   for (let i = 0; i < 2; i++) {
      let div = document.createElement(teg);
      divAppend.appendChild(div);
      arr.push(div);
   }
}

function classCreate(divName, className, divAppend) {
   divName.classList.add(className);
   divAppend.appendChild(divName);
}

//FETCH========================================================================================================================================================

const param = {
   "url": "https://api.openweathermap.org/data/2.5/",
   "appid": "3794edc81b77e87151531e193aa270ab"
}

getWeather();

document.querySelector('#city').onchange = getWeather;

function getWeather() {
   const cityId = document.querySelector('#city').value;
   fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
      .then(weather => {
         return weather.json();
      }).then(showWeather);
}


function showWeather(data) {
   console.log(data);
   document.querySelector('.widget__feels-like').innerHTML = `Feels like: ${data.main['feels_like']}`;
   document.querySelector('.widget__wind').innerHTML = `Deg: ${data.wind['deg']} Gust: ${data.wind['gust']} Speed: ${data.wind['speed']}`;
   document.querySelector('.widget__temp').innerHTML = Math.round(data.main.temp) + '&deg' + ' C';
   document.querySelector('.widget__weather').innerHTML = data.weather[0].description;
   if (data.main.temp > 20 && data.weather[0].description != 'overcast clouds') {
      image.style.display = 'block'
   }
   else{
      image.style.display = 'none'
   }
}

//========================================================================================================================================================
