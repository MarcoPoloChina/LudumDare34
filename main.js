var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create,render: render, update: update });

function preload() {

}

function create() {
	player = new Phaser.Rectangle(0,0,50,50);
}
function render(){
	game.debug.geom(player,'#000000');
}

function update() {
}
