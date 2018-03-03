var hero = {
    x: 300,
    y: 300
};
var score = 0;

var bullets = [];
var bullet_counter = 0;

var enemies = [];
var enemy_counter = 0;

function shoot() {
    bullets.push({x: hero.x, y: hero.y, id: "#b"+bullet_counter});
    var b = "<div class='bullet' id='b" + bullet_counter + "'></div>";
    $("#bullets").append(b);
    bullet_counter++;
}

function drawHero(){
    $("#hero").css("left", hero.x);
    $("#hero").css("top", hero.y);
}

function createEnemy(x, y) {
    enemies.push({x: x, y: y, id: "#e"+enemy_counter});
    var e = "<div class='enemy1' id='e" + enemy_counter + "'></div>";
    $("#enemies").append(e);
    enemy_counter++;
}

function drawArray(arr) {
    for(var i=0; i<arr.length; i++) {
        $(arr[i].id).css("left", arr[i].x);
        $(arr[i].id).css("top", arr[i].y);
    }
}

function checkBulletHits() {
    for(var b=0; b<bullets.length; b++) {
        for(var e=0; e<enemies.length; e++) {
            if(bullets[b].x>enemies[e].x-18 && bullets[b].x<enemies[e].x+28 && bullets[b].y>enemies[e].y-18  && bullets[b].y<enemies[e].y+28) {
                removeFromArray(bullets, b);
                removeFromArray(enemies, e);
                e--;
                score += 10;
                updateScore();
                if(b >= bullets.length) {
                    return;
                }
            }
        }
    }
}

function moveHero(dir) {      // 0: up, 1: right, 2: down, 3: left
    // console.log("moving "+dir);
    if(dir % 2 == 0) {
        dir--;      // adjust dir to be 1 or -1
        hero.y += dir * 10;
    }
    else {
        dir = 2 - dir;      // adjust dir to be 1 or -1
        hero.x += dir * 10;
    }
    drawHero();
}

function removeFromArray(arr, i) {
    $(arr[i].id).remove();
    arr.splice(i,1);
}

function moveBullets() {
    for(var i=0; i<bullets.length; i++) {
        bullets[i].y -= 10;
        if(bullets[i].y < 0) {
            removeFromArray(bullets, i);
            i--;
        }
    }
    drawArray(bullets);
}

function updateScore() {
    $("#score").text(score);
}

document.onkeydown = function(e){
    // console.log(e);
    if(e.keyCode >= 37 && e.keyCode <= 40) {     // arrow keys
        moveHero((e.keyCode-2)%4);
    }
    if(e.keyCode == 32) {      // spacebar
        shoot();
    }
}

function gameLoop() {
    // console.log("hello");
    moveBullets();
    checkBulletHits();
    setTimeout(gameLoop, 500);
}

$(document).ready(function(){
    for(var i=0; i<7; i++) {
        createEnemy(100*(i+1), 100);
    }
    drawArray(enemies);
    drawHero();
    gameLoop();
});