var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

}

function create() {
	player = new Phaser.Rectangle(0,0,50,50);
}

function update() {
}
