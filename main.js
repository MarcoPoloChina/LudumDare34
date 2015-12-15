var SCREENWIDTH = 450;
var SCREENHEIGHT = 330;
var BLOCKSIZE = 10;
var DIRECTION = {LEFT:3,UP:0,DOWN:2,RIGHT:1};
var EMPTY = 0;
var FOOD = 1;
var PLAYER = 2;
var containerBackGround = new PIXI.Container(0x66FF99);
var blank = PIXI.Texture.fromImage("Stage.png");
var container = new PIXI.Sprite(blank);
containerBackGround.addChild(container);
var renderer = PIXI.autoDetectRenderer(SCREENWIDTH,SCREENHEIGHT);
var texture = PIXI.Texture.fromImage("block.png");
var playerSprite = new PIXI.Sprite(texture);
var foodSprite = new PIXI.Sprite(texture);
var player = {x:22,y:16,px:0,py:0}
var food = {x:0,y:0}
var playerDirection = DIRECTION.LEFT;
var running = true;
var frameCount = 0;
var oldTime = Date.now();
var grid = generateGrid();
var playerBody = new Array;
var playerBodySprites = new Array;
init();
//init function
function init(){ 
	renderer.backgroundColor = 0x66FF99;
	document.body.appendChild(renderer.view);
	mapPlayer();
	container.anchor.x = 0.5;
	container.anchor.y = 0.5
	container.addChild(playerSprite);
	container.addChild(foodSprite);
	requestAnimationFrame(gameloop);
	input.addListener(playerMoveLeft,enums.keyboard.KEY_Z);
	input.addListener(playerMoveRight,enums.keyboard.KEY_X);
	loopEvents.addListener(updatePlayerPos,100);
	generateFood();
}
function playerMoveLeft(){
	if(playerDirection < 3){
		playerDirection++;	
	}else{
		playerDirection = 0;	
	}
}
function playerMoveRight(){
	if(playerDirection > 0){
		playerDirection--;
	}else{
		playerDirection = 3;	
	}
}
function gameloop(){
	requestAnimationFrame(gameloop);	
	var newTime = Date.now();
	var dt = (newTime - oldTime)/1000;
	oldTime = newTime;
	frameCount++;
	update(dt);
	render();
}
function render(){
	renderer.render(containerBackGround);
}
function update(dt){
	checkPlayerCollision();
	loopEvents.update();
}
function generateFood(){
	grid[food.x][food.y] = EMPTY;
	food.x = Math.floor(Math.random()*(grid.length-1));
	food.y = Math.floor(Math.random()*(grid[0].length-1));
	grid[food.x][food.y] = FOOD;
	mapFood();	
}
function checkPlayerCollision(){
	if(player.y < 0 || player.y > grid[0].length-1 || player.x < 0 || player.x  > grid.length-1){
		location.reload();	
	}	
	switch (grid[player.x][player.y]){
		case PLAYER: 
			location.reload();
			break;
		case FOOD:
			playerGrows();
			generateFood();
	}
}
function playerGrows(){
	if(playerBody.length == 0){	
		playerBody.push(new playerBodySection(player.px,player.py));
	}else{
		playerBody.push(new playerBodySection(playerBody[playerBody.length-1].px,playerBody[playerBody.length-1].py));
	}
	var tempSprite = new PIXI.Sprite(texture);
	container.addChild(tempSprite);
	playerBodySprites.push(tempSprite);
}
function playerBodySection(x,y){
	this.x = x;
	this.y = y;
	this.px = x;
	this.py = y;
}
function updatePlayerPos(){
	player.px = player.x;
	player.py = player.y
	var b = 0;
	for(var i=0;i<playerBody.length;i++){
		playerBody[i].px = playerBody[i].x;
		playerBody[i].py = playerBody[i].y;
		if(i==0){
			playerBody[i].x = player.px;
			playerBody[i].y = player.py;
			
		}else{
			playerBody[i].x = playerBody[b].px;
			playerBody[i].y = playerBody[b].py;
			b++;
		}
	
	}
	switch(playerDirection){
		case DIRECTION.UP:
			player.y--;
			break;
		case DIRECTION.DOWN:
			player.y++;
			break;
		case DIRECTION.LEFT:	
			player.x++;
			break;
		case DIRECTION.RIGHT:
			player.x--;
			break;
	}
	mapPlayer();
}
function generateGrid(){
	var grid =  new Array(SCREENWIDTH/10);
	for(var i=0;i<grid.length;i++){
		grid[i] = new Array(SCREENHEIGHT/10);			
		for(var k = 0;k<grid[i].length;k++){
			grid[i][k] = EMPTY;	
		}
	}
	return grid;
}
function mapFood(){
	foodSprite.position.x = food.x * 10;
	foodSprite.position.y = food.y * 10;
}
function mapPlayer(){
	playerSprite.position.x = player.x * 10;
	playerSprite.position.y = player.y * 10;
	for(var i=0;i<playerBody.length;i++){
		playerBodySprites[i].position.x = playerBody[i].x * 10;
		playerBodySprites[i].position.y = playerBody[i].y * 10;
		grid[playerBody[i].x][playerBody[i].y] = PLAYER;
	}
	if(playerBody.length != 0){
		grid[playerBody[playerBody.length-1].px][playerBody[playerBody.length-1].py] = EMPTY;
	}
}
//input
