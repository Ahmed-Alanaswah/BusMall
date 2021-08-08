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
]


let all = [];
let counter = 0;
let NumberOfRound = 5;
function Rest(name, imageSrc) {

    this.name = name;
    this.imageSrc = imageSrc;
    this.shown = 0;
    this.votes = 0;
    Rest.all.push(this)


}

Rest.all = [];

// let img1 = new Rest(imgArray[0].split('.')[0], imgArray[0]);

// console.log(img1);

for (let i = 0; i < imgArray.length; i++) {
    new Rest(imgArray[i].split('.')[0], imgArray[i]);
    // console.log(new Rest(imgArray[2].split('.')[0], imgArray[2]))
}

// console.log(Rest.all)

const imageSection = document.getElementById('imageSection');
let leftImage = document.getElementById('leftImage');
let rightImage = document.getElementById('rightImage');
let midImage = document.getElementById('midImage');

function render() {
    let leftRandom = randomnumber(0, imgArray.length - 1);
    let rightRandom = randomnumber(0, imgArray.length - 1);
    let midRandom = randomnumber(0, imgArray.length - 1);

    document.getElementById('leftImage').src = '../img/' + Rest.all[leftRandom].imageSrc;
    document.getElementById('rightImage').src = '../img/' + Rest.all[rightRandom].imageSrc;
    document.getElementById('midImage').src = '../img/' + Rest.all[midRandom].imageSrc;

    Rest.all[leftRandom].shown++;
    Rest.all[rightRandom].shown++;
    Rest.all[midRandom].shown++;
    // console.log(Rest.all);
    // console.log(Rest.all[leftRandom]);
    // console.log(Rest.all[rightRandom]);
    // console.log(Rest.all[midRandom]);

}


render();


function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}




imageSection.addEventListener('click', clickHandler);


function clickHandler(e) {


    if ((e.target.id === 'leftImage' || e.target.id === 'rightImage' || e.target.id === 'midImage') && counter < NumberOfRound) {



        render();
        counter++;
        // Rest.all.votes++;
        // console.log(e.target.id)
        // console.log(e.target)
        // console.log(e)

        // console.log(e.target.id.votes++)
        console.log(Rest.all[randomnumber(0, imgArray.length - 1)].votes++);
        console.log(this.id.votes++);



    } else {
        imageSection.removeEventListener('click', clickHandler);


        document.getElementById('button').setAttribute('class', 'inline-block');

    }





}



document.getElementById('button').addEventListener('click', creatList);

function creatList() {

    let ulElements = document.getElementById('list');
    for (let i; i < imgArray; i++) {

        let liElemet = document.createElement('li');
        liElemet.textContent = 'ahmed';
        ulElements.appendChild(liElemet)

    }



}