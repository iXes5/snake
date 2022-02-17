//Select canvas
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//Game key (time)
let frames = 0;

//Load image
const logo = new Image();
logo.src = "image/snake.png";
const plus = new Image();
plus.src = "image/plus.png";
const minus = new Image();
minus.src = "image/minus.png";
const box = new Image();
box.src = "image/box.png";
const tele = new Image();
tele.src = "image/tele.png";
const reload = new Image();
reload.src = "image/reload.png";
const home = new Image();
home.src = "image/home.png";
const pause = new Image();
pause.src = "image/pause.png";
const play = new Image();
play.src = "image/play.png";

//Control the game
document.addEventListener("click", function(evt) {
    let rect = cvs.getBoundingClientRect();
    let clickX = evt.clientX - rect.left;
    let clickY = evt.clientY - rect.top;

    switch (state.current) {
        case state.getReady:
            //Start game
            if (clickX >= getReady.x - getReady.d && clickX <= getReady.x + getReady.d && clickY >= getReady.y * 2 - getReady.d && clickY <= getReady.y * 2 + getReady.d) {
            state.current = state.game;
            break;
            }

            //Increase speed
            if (clickX >= snake.sX * 3 + snake.d && clickX <= snake.sX * 3 + snake.d * 3 && clickY >= snake.sY && clickY <= snake.sY + snake.d * 2 && snake.speed > 4) {
                snake.speed -= 2;
                break;
            }

            //Decrease speed
            if (clickX >= snake.sX - snake.d * 3 && clickX <= snake.sX - snake.d && clickY >= snake.sY && clickY <= snake.sY + snake.d * 2 && snake.speed < 18) {
                snake.speed += 2;
                break;
            }

            //Box mode choose
            if (clickX >= getReady.x - getReady.d && clickX <= getReady.x && clickY >= getReady.y * 3 - getReady.d/4 && clickY <= getReady.y * 3 - getReady.d/4 + getReady.d) {
                snake.mode = 1;
                break;
            }

            //Tele mode choose
            if (clickX >= getReady.x && clickX <= getReady.x + getReady.d && clickY >= getReady.y * 3 - getReady.d/4 && clickY <= getReady.y * 3 - getReady.d/4 + getReady.d) {
                snake.mode = 0;
                break;
            }
        case state.game:
            //Pause game
            if (clickX >= cvs.width - 50 && clickX <= cvs.width && clickY >= cvs.height - 50 && clickY <= cvs.height) {
                state.current = state.pause;
                break;
            }

            //Home button click
            if (clickX >= cvs.width - game.distance * 3 && clickX <= cvs.width - game.distance * 2 && clickY >= cvs.height - game.distance && clickY <= cvs.height) {
                snake.reset();
                score.reset();
                apple.reset();
                state.current = state.getReady;
                break;
            }

            //Replay button click
            if (clickX >= cvs.width - game.distance * 2 && clickX <= cvs.width - game.distance && clickY >= cvs.height - game.distance && clickY <= cvs.height) {
                snake.reset();
                score.reset();
                apple.reset();
                break;
            }
        case state.over:
            //Home button click
            if (clickX >= over.p - 2/3 * over.d && clickX <= over.p && clickY >= over.p && clickY <= over.p + 2/3 * over.d) {
                snake.reset();
                score.reset();
                state.current = state.getReady;
                break;
            }

            //Replay button click
            if (clickX >= over.p&& clickX <= over.p + 2/3 * over.d && clickY >= over.p && clickY <= over.p + 2/3 * over.d) {
                snake.reset();
                score.reset();
                state.current = state.game;
                break;
            }
        case state.pause:
            //Play game continue
            if (clickX >= cvs.width - 50 && clickX <= cvs.width && clickY >= cvs.height - 50 && clickY <= cvs.height) {
                game.cardinal = 1;
                break;
            }
    }
})
document.addEventListener("keypress", (event) => {
    if (state.current == state.game) {
        var key = event.code;

        //Right arrow button
        if (key == "KeyD" && snake.mX !== - 20) {
            snake.mX = 20;
            snake.mY = 0;
        }

        //Left arrow button
        if (key == "KeyA" && snake.mX !== 20) {
            snake.mX = - 20;
            snake.mY = 0;
        }

        //Down arrow button
        if (key == "KeyS" && snake.mY !== - 20) {
            snake.mX = 0;
            snake.mY = 20;
        }

        //Up arrow button
        if (key == "KeyW" && snake.mY !== 20) {
            snake.mX = 0;
            snake.mY = - 20;
        }
    }
}, false)

//Game state
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2,
    pause : 3
}

//Get ready
const getReady = {
    x : cvs.width/2,
    y : (cvs.height - 50)/5,
    d : cvs.width/6,

    check : 0,

    draw : function() {
        if (state.current == state.getReady) {
            //Title
            ctx.fillStyle = "#ffff00";
            ctx.lineWidth = 2;
            ctx.font = "25px Teko";
            ctx.fillText("SNAKE GAME", this.x - this.d + 15, this.y * 2 - this.d - 10);

            //Logo
            ctx.drawImage(logo, 0, 0, 128, 128, this.x - this.d, this.y * 2 - this.d, this.d * 2, this.d * 2);

            //Rim
            ctx.strokeStyle = "#696969";
            ctx.lineWidth = 5;
            ctx.strokeRect(snake.sX, snake.sY, snake.sX * 2, snake.d * 2);

            //Button
            ctx.strokeStyle = "#696969";
            ctx.lineWidth = 5;
            ctx.strokeRect(snake.sX - snake.d * 3, snake.sY, snake.d * 2, snake.d * 2);
            ctx.drawImage(minus, 0, 0, 128, 128, snake.sX - snake.d * 3, snake.sY, snake.d * 2, snake.d * 2);
            ctx.strokeRect(snake.sX * 3 + snake.d, snake.sY, snake.d * 2, snake.d * 2);
            ctx.drawImage(plus, 0, 0, 128, 128, snake.sX * 3 + snake.d, snake.sY, snake.d * 2, snake.d * 2);

            //Speed level
            for (let i = 0; i < 9 - (snake.speed - 2)/2; i++) {
                ctx.fillStyle = "#006400";
                ctx.fillRect(snake.sX + 3 + i * (snake.sX * 2 - 6)/8, snake.sY + 3, (snake.sX * 2 - 6)/8, snake.d * 2 - 6);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(snake.sX + 3 + i * (snake.sX * 2 - 6)/8, snake.sY + 3, (snake.sX * 2 - 6)/8, snake.d * 2 - 6);
            }

            //Box mode
            ctx.drawImage(box, 0, 0, 128, 128, this.x - this.d, this.y * 3 - this.d/4, this.d, this.d);

            //Tele mode
            ctx.drawImage(tele, 0, 0, 128, 128, this.x, this.y * 3 - this.d/4, this.d, this.d);

            //Mode check 
            if (snake.mode == 1) {
                this.check = this.d;
            }else if (snake.mode == 0) {
                this.check = 0;
            }
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#696969";
            ctx.strokeRect(this.x - this.check, this.y * 3 - this.d/4, this.d, this.d);

            //Author
            if (state.current == state.getReady) {
                ctx.fillStyle = "#696969";
                ctx.lineWidth = 2;
                ctx.font = "20px Teko";
                ctx.fillText("By Vu Quang", 10, cvs.height - 30);
                ctx.fillText("I know its old, but i tried my best, hope you enjoy it:<", 10, cvs.height - 10);
            }
        }
    }
}

//Over
const over = {
    p : cvs.width/2,
    d : cvs.width/4,

    draw : function() {
        if (state.current == state.over) {
            //Over box
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#ffffff";
            ctx.fillRect(this.p - this.d, this.p - this.d, this.d * 2, this.d * 2);
            ctx.strokeRect(this.p - this.d, this.p - this.d, this.d * 2, this.d * 2);

            //Score
            ctx.fillStyle = "#ffffff";
            ctx.font = "40px Teko";
            ctx.fillText(score.value, this.p - this.d/2, this.p - this.d/2);
            ctx.fillText(score.best, this.p - this.d/2, this.p - this.d/2 + 40);

            //Reload and home button
            ctx.drawImage(home, this.p - 2/3 * this.d, this.p, this.d * 2/3, this.d * 2/3);
            ctx.drawImage(reload, this.p, this.p, this.d * 2/3, this.d * 2/3);
        }
    }
}

//Snake
const snake = {
    position : [
        {x : 40, y : 240},
        {x : 20, y : 240}
    ],
    d : 20,
    bar : 50,

    speed : 10,
    sX : cvs.width/4,
    sY : (cvs.height - 50)/4 * 3,

    mX : 20,
    mY : 0,

    mode : 0,

    count : 0,
    big : 0,
    bigCount : 0,

    draw : function() {
        //Snake
        if (state.current != state.getReady) {
            for (let i = 0; i < this.position.length; i++) {
                let p = this.position[i];

                ctx.fillStyle = "#ff0000";
                ctx.fillRect(p.x, p.y, this.d, this.d);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#800000";
                ctx.strokeRect(p.x, p.y, this.d, this.d);
            }
        }
    },

    update : function() {
        if (state.current == state.game) {
            //Change per frames (depend on speed)
            if (frames % this.speed == 0) {
                //The back follow the front (it must follow the old position of the one in front of it, except the leader (this.position[0])
                for (let i = this.position.length - 1; i > 0; i--) {
                    let b = this.position[i];
                    let f = this.position[i - 1];

                    b.x = f.x;
                    b.y = f.y;
                }

                //Leader move (the leader follow the control of player)
                this.position[0].x += this.mX;
                this.position[0].y += this.mY;   
            }

            //Go out of the canvas (in tele mode)
            if (this.mode == 0) {
                if (this.position[0].x == cvs.width) {
                    this.position[0].x = 0;
                }else if (this.position[0].x < 0) {
                    this.position[0].x = cvs.width - this.d;
                }else if (this.position[0].y == cvs.height - this.bar) {
                    this.position[0].y = 0;
                }else if (this.position[0].y < 0) {
                    this.position[0].y = cvs.height - this.bar - this.d;
                }
            }

            //Touch the box (in box mode)
            if (this.mode == 1) {
                if (this.position[0].x == cvs.width - this.d) {
                    state.current = state.over;
                }else if (this.position[0].x == 0) {
                    state.current = state.over;
                }else if (this.position[0].y == cvs.height - this.bar - this.d) {
                    state.current = state.over;
                }else if (this.position[0].y == 0) {
                    state.current = state.over;
                }
            }

            //When the snake eat the apple
            if (this.big && this.position[0].x == apple.x * apple.d && this.position[0].y == apple.y * apple.d) {
                //Add new position for apple
                apple.x = (Math.random()*24).toFixed(0);
                apple.y = (Math.random()*24).toFixed(0);

                //Change again if dulicate
                for (let i = 0; i < this.position.length; i++) {
                    let p = this.position[i];
        
                    if (apple.x == p.x && apple.y == p.y) {
                        apple.x = (Math.random()*24).toFixed(0);
                        apple.y = (Math.random()*24).toFixed(0);
                        return;
                    }
                }

                //Get point
                score.value += 9 - (this.speed - 2)/2;
                this.count++;

                //Grow up when eat
                this.position.unshift({
                    x : this.position[0].x + this.mX,
                    y : this.position[0].y + this.mY
                })
            }

            //Apple can not spawn in the box skin
            if (this.big == 0 && this.mode == 1) {
                if (apple.x == 0 || apple.y == 0 || apple.x == 24 || apple.y == 24) {
                    apple.x = (Math.random()*24).toFixed(0);
                    apple.y = (Math.random()*24).toFixed(0);
                    return;
                }
            }

            //Bite its body
            for (let i = 2; i < this.position.length; i++) {
                let p = this.position[i];

                if (p.x == this.position[0].x && p.y == this.position[0].y) {
                    state.current = state.over;
                }
            }

            //Draw a big apple each 5 mini apple
            if (this.count % 5 == 0) {
                this.big = 1;
            }

            //Big condition in tele
            if (this.big == 1 && this.mode == 0) {
                if (apple.x == 24 || apple.y == 24 ) {
                    apple.x = (Math.random()*24).toFixed(0);
                    apple.y = (Math.random()*24).toFixed(0);
                }
            }
            
            //Big condition in box
            if (this.big == 1 && this.mode == 1) {
                if (apple.x == 0 || apple.x >= 23 || apple.y == 0 || apple.y >= 23) {
                    apple.x = (Math.random()*24).toFixed(0);
                    apple.y = (Math.random()*24).toFixed(0);
                }
            }

            //Set the time for the big
            if (this.big == 1) {
                this.bigCount += this.big * 2;
                if (this.bigCount == 400) {
                    this.big = 0;
                }
            }

            //When the snake eat the big
            if (this.big == 1) {
                let p = this.position[0];

                if (p.x >= apple.x && p.x <= apple.x + this.d && p.y >= apple.y && p.y <= apple.y + this.d) {
                    this.big = 0;
                    score.value += (9 - (this.speed - 2)/2) * (10 - (this.bigCount - this.bigCount%40)/40);
                    apple.x = (Math.random()*24).toFixed(0);
                    apple.y = (Math.random()*24).toFixed(0);
                }
            }
        }
    },

    reset : function() {
        this.position = [
            {x : 40, y : 240},
            {x : 20, y : 240}
        ];
        this.mX = 20;
        this.mY = 0;
        this.count = 0;
    }

}

//Apple
const apple = {
    x : (Math.random()*24).toFixed(0),
    y : (Math.random()*24).toFixed(0),
    d : 20,
    r : 10,

    draw : function() {
        //Apple
        if (state.current != state.getReady && snake.big == 0) {
            ctx.beginPath();
            ctx.fillStyle = "#0000ff";
            ctx.arc(this.x * this.d + this.r, this.y * this.d + this.r, this.r, 0, 2 * Math.PI);
            ctx.fill();
        }

        //Big
        if (state.current != state.getReady && snake.big == 1) {
            ctx.beginPath();
            ctx.fillStyle = "#ffff00";
            ctx.arc(this.x * this.d + this.d, this.y * this.d + this.d, this.d, 0, 2 * Math.PI);
            ctx.fill();
        }
    },

    reset : function() {
        this.x = (Math.random()*24).toFixed(0);
        this.y = (Math.random()*24).toFixed(0);
    }
}

//Score
const score = {
    value : 0,
    best : localStorage.getItem("snake") || 0,

    draw : function() {
        if (state.current != state.getReady) {
            ctx.fillStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.font = "25px Teko";
            ctx.fillText(this.value, 20, 530);
        }
    },

    update : function() {
        //Check the best score
        if (state.current == state.game) {
            if (this.value > this.best) {
                this.best = this.value;
                localStorage.setItem("snake", this.best);
            }
        }
    },

    reset : function() {
        this.value = 0;
    }
}

//Game
const game = {
    count : 0,
    cardinal : 0,
    distance : 50,

    draw : function() {
        //Draw pause button (in game state) and play button (in pause state)
        if (state.current == state.game) {
            ctx.drawImage(pause, 0, 0, 128, 128, cvs.width - this.distance, cvs.height - this.distance, this.distance, this.distance);
        }else if (state.current == state.pause) {
            ctx.drawImage(play, 0, 0, 128, 128, cvs.width - this.distance, cvs.height - this.distance, this.distance, this.distance);
        }

        //Draw the bar of time delay before continue play game
        if (this.cardinal > 0) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(cvs.width - 250, cvs.height - 40, 90 - this.count, 30);
        }

        //Draw home button
        if (state.current == state.game || state.current == state.pause) {
            ctx.drawImage(home, cvs.width - this.distance * 3, cvs.height - this.distance, this.distance, this.distance);
        }

        //Draw replay button
        if (state.current == state.game || state.current == state.pause) {
            ctx.drawImage(reload, cvs.width - this.distance * 2, cvs.height - this.distance, this.distance, this.distance);
        }
    },

    update : function() {
        //Delay the game a bit after click the play button
        if (this.cardinal > 0) {
            this.count += this.cardinal;
            if (this.count == 90) {
                state.current = state.game;
                this.cardinal = 0;
                this.count = 0;
            }
        }
    }
}

//Draw
function draw() {
    //Black background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 500, 550);

    //Limit (tele mode)
    if (snake.mode == 0 && state.current != state.getReady) {
        ctx.strokeStyle = "#696969";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 500, 500)
    }

    //Block (box mode)
    if (state.current != state.getReady && snake.mode == 1) {
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(0, 0, 500, 20);
    ctx.fillRect(0, 480, 500, 20);
    ctx.fillRect(0, 20, 20, 460);
    ctx.fillRect(480, 20, 20, 460);
    }

    getReady.draw();
    snake.draw();
    apple.draw();
    score.draw();
    game.draw();
    over.draw();
    console.log(snake.big)
}

//Update
function update() {
    snake.update();
    score.update();
    game.update();
}

//Loop
function loop() {
    update();
    draw();

    if (state.current !== state.pause) {
        frames++;
    }

    requestAnimationFrame(loop);
}
loop();