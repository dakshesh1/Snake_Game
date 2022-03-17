let InputDir = {x: 0, y: 0};
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed= 4;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
food = {x: 6, y: 7};
let score = 0;


function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function gameEngine(){
    //1: Updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        InputDir = {x : 0, y : 0};
        alert("Game over, press any key to play again");
        snakeArr = [{x : 13, y : 15}];
        musicSound.play();
        score = 0;


    }
    //if the food is eaten by the snake the food is increased.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score +=1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x : snakeArr[0].x + InputDir.x, y: snakeArr[0].y + InputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a +(b-a)* Math.random()), y: Math.round(a+ (b - a)* Math.random())}
    }

    // Moving the snake

    for(let i = snakeArr.length - 2; i >= 0; i--){
        
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += InputDir.x;
    snakeArr[0].y += InputDir.y;
    





    //2: Displaying the snake  and the food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement  = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head')

        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
board.appendChild(foodElement);

}

function isCollide(snake){
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;

        }
        
    
}
if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
}


}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    InputDir = {x:0, y:1} //game starts
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUP")
            InputDir.x = 0;
            InputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            InputDir.x = 0;
            InputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            InputDir.x = -1;
            InputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            InputDir.x = 1;
            InputDir.y = 0;
            break;
    
        default:
            break;
    }
})