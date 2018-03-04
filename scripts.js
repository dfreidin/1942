var hero = {
    x: 500,
    y: 500
};
var score = 0;

var bullets = [];
var bullet_counter = 0;

var enemies = [];
var enemy_counter = 0;

function shoot() {
    bullets.push({x: hero.x+43, y: hero.y, id: "#b"+bullet_counter});
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
            if(bullets[b].x>enemies[e].x-18 && bullets[b].x<enemies[e].x+111 && bullets[b].y>enemies[e].y-18  && bullets[b].y<enemies[e].y+50) {
                removeFromArray(bullets, b);
                // removeFromArray(enemies, e);
                explodeEnemy(e);
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

function checkHeroCollision() {
    for(var e=0; e<enemies.length; e++) {
        if(enemies[e].x>hero.x-75 && enemies[e].x<hero.x+75 && enemies[e].y>hero.y-75 && enemies[e].y<hero.y+75) {
            removeFromArray(enemies, e);
            e--;
            score -= 500;
            updateScore();
        }
    }
}

function explodeEnemy(e) {
    var x = enemies[e].x + 7;
    var y = enemies[e].y + 2;
    var id = "#x"+e;
    removeFromArray(enemies, e);
    var exp = "<div class='explosion' id='x"+e+"'></div>";
    $("#enemies").append(exp);
    $(id).css("left", x);
    $(id).css("top", y);
    for(var i=0; i<12; i++) {
        x = -96 * i;
        // TODO: figure out why this isn't working
        $(id).css("background", "url('explosion.png')"+x+"px 0px");
        setTimeout(function(){}, 10);
    }
    $(id).remove();
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

function moveArray(arr, dist) {
    for(var i=0; i<arr.length; i++) {
        arr[i].y += dist;
        if(arr[i].y > 750 || arr[i].y < 0) {
            removeFromArray(arr, i);
            i--;
        }
    }
    drawArray(arr);
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
    if(enemies.length == 0) {
        for(var i=0; i<7; i++) {
            createEnemy(150*(i+1), 100);
        }
    }
    moveArray(bullets, -10);
    moveArray(enemies, 1);
    checkBulletHits();
    checkHeroCollision();
    setTimeout(gameLoop, 50);
}

$(document).ready(function(){
    drawArray(enemies);
    drawHero();
    gameLoop();
});