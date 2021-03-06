let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg',
];


let all = [];
let counter = 0;
let NumberOfRound = 25;
function Rest(name, imageSrc,shown = 0, votes = 0) {

  this.name = name;
  this.imageSrc = imageSrc;
  this.shown = shown;
  this.votes = votes;
  Rest.all.push(this);


}

Rest.all = [];
getData();




const imageSection = document.getElementById('imageSection');
let leftImage = document.getElementById('leftImage');
let rightImage = document.getElementById('rightImage');
let midImage = document.getElementById('midImage');
let leftRandom =0;
let rightRandom=0;
let midRandom = 0;
let randomArr = [];

Rest.prototype.getName = function(){
  console.log('test')
}


function render() {



  do{

    leftRandom = randomnumber(0, imgArray.length - 1);
    rightRandom = randomnumber(0, imgArray.length - 1);
    midRandom = randomnumber(0, imgArray.length - 1);

  }while(
    leftRandom === rightRandom ||
    leftRandom === midRandom || 
    rightRandom === midRandom ||
    randomArr.includes(leftRandom) ||
    randomArr.includes(rightRandom) ||
    randomArr.includes(midRandom)

     );

  randomArr =[leftRandom,midRandom,rightRandom];

  document.getElementById('leftImage').src = 'img/' + Rest.all[leftRandom].imageSrc;
  document.getElementById('rightImage').src = 'img/' + Rest.all[rightRandom].imageSrc;
  document.getElementById('midImage').src = 'img/' + Rest.all[midRandom].imageSrc;

  Rest.all[leftRandom].shown++;
  Rest.all[rightRandom].shown++;
  Rest.all[midRandom].shown++;
  
  localStorage.data = JSON.stringify(Rest.all);
  console.log(Rest.all);

}

render();


function randomnumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



let nweArr=[];
imageSection.addEventListener('click', clickHandler);


function clickHandler(e) {

  randomArr =[ leftRandom ,midRandom,rightRandom];

  if ((e.target.id === 'leftImage' || e.target.id === 'rightImage' || e.target.id === 'midImage') && counter < NumberOfRound) {

    if (e.target.id === 'leftImage'){
      Rest.all[leftRandom].votes++;

    }

    if (e.target.id === 'rightImage'){
      Rest.all[rightRandom].votes++;


    }

    if (e.target.id === 'midImage'){
      Rest.all[midRandom].votes++;

    }

    render();
    counter++;


  } else {

    imageSection.removeEventListener('click', clickHandler);
    creatChart ();
    creatArticle();


    

  

  }

}



function creatArticle(){
  let articleElement = document.getElementById('article');
  let buttonElement = document.createElement('button');
  articleElement.appendChild(buttonElement);
  buttonElement.textContent= 'show result';
  buttonElement.onclick = craeteList;

  // eslint-disable-next-line no-inner-declarations
  function craeteList(){
    let ulElements = document.createElement('ul');

    articleElement.appendChild(ulElements);

    for(let i=0; i < imgArray.length ;i++){
      let liElement = document.createElement('li');
      liElement.textContent= `${Rest.all[i].name} had ${Rest.all[i].votes} votes, and was seen ${Rest.all[i].shown} times.`;
      ulElements.appendChild(liElement);
    }


  }

}

function creatChart(){
  let nameArray = [];
  let shownArray = [];
  let votesArray = [];

  for(let i =0; i < imgArray.length ;i++){
    nameArray.push(Rest.all[i].name);
    shownArray.push(Rest.all[i].shown);
    votesArray.push(Rest.all[i].votes);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:nameArray ,
      datasets: [{
        label: '# of shown',
        data: shownArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',

        ],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: votesArray,
        backgroundColor: [
          'green',

        ],
        borderColor: [
          'green',

        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function getData(){
  if(localStorage.data){
    let data = JSON.parse(localStorage.data);
    for (let i = 0; i < data.length; i++) {
      new Rest(data[i].name , data[i].imageSrc,data[i].shown,data[i].votes); 
    }
  }else{
    for (let i = 0; i < imgArray.length; i++) {
      new Rest(imgArray[i].split('.')[0], imgArray[i]);
    
    }
  }
}