var started = false;

class SceneBoot extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.preloadAudio();
        this.preloadImage();
        this.load.on('complete', () => this.scene.start("Title"));
    }

    preloadAudio() {
    }

    preloadImage() {
        this.load.image('play1', './assets/img/play1.png');
        this.load.image('play2', './assets/img/play2.png');
        this.load.image('back1', './assets/img/back1.png');
        this.load.image('back2', './assets/img/back2.png');
        this.load.image('logo1', './assets/img/logo1.png');
        this.load.image('logo2', './assets/img/logo2.png');
        this.load.image('action1', './assets/img/left.png');
        this.load.image('action2', './assets/img/forward.png');
        this.load.image('action3', './assets/img/right.png');
        this.load.image('player', './assets/img/player.png');
        this.load.image('scheduler', './assets/img/scheduler.png');
        this.load.image('stars', './assets/img/stars.png');
        this.load.json('maps', './data/maps.json');
    }
}

class SceneTitle extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        if (!started) {
            this.createLogo();
            started = true;
        } else {
            this.createPlay();
            this.createTitle();
        }
    }

    createLogo() {
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        this.logo = this.add.image(w, h - 20, 'logo1');
        this.logo.alpha = 0;
        this.logo.scale = 0.33;
        this.tweens.add({
            alpha: 1,
            targets: [this.logo],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            hold: 1000,
            repeat:0,
            yoyo: true,
            onComplete: () => {
                this.createPlay();
                this.createTitle();
            }
        });
    }

    createTitle() {
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        this.title = this.add.text(w, 400, 'Learn Coding', {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            color: '#fff',
            fontSize: '64px',
        }).setOrigin(0.5, 0.5);
  
        this.tweens.add({
            y: 390,
            targets: this.title,
            duration: 1500,
            repeat:-1,
            yoyo: true
        });

        this.add.text(w, h * 2 - 50, 'orlean games © 2021 july', {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '20px',
        }).setOrigin(0.5, 0.5);
        this.logo = this.add.image(115, 65, 'logo2');
        this.logo.alpha = 1;
        this.logo.scale = 0.75;
    }

    createPlay() {
        let w = this.sys.game.canvas.width / 2;
        this.play = this.add.image(w, 700, 'play1').setOrigin(.5, .5);
        this.play.scale = 1.3;
        this.play.setInteractive();
        this.play.on('pointerover', () => this.play.setTexture('play2'));
        this.play.on('pointerout', () => this.play.setTexture('play1'));
        this.play.on('pointerdown', () => this.onPlay());
    }

    onPlay() {
        this.cameras.main.fadeOut(600);
        this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start("Game"));
    }
}

class SceneGame extends Phaser.Scene {
    constructor() {
        super();
        this.tiles = []; 
        this.commands = [];
        this.index = 0; 
        this.play = false;
    }

    init() {
        gameMap.setup(this);
    }

    clear() {
        this.play = false;
        this.index = 0;
        for (let command of this.commands) {
            command.destroy();
        }
    }

    create() {
        this.createMap();
        this.player = new Player(this, gameMap.startX(), gameMap.startY());
        this.add.existing(this.player);
        this.createActions();
        this.createCommands();
        this.createScheduler();
    }

    createMap() {
        const w = 96;
        const h = 96;
        const mt = gameMap.mt;
        for (let i = 0; i < gameMap.data.length; i++) {
            const data = gameMap.data[i];
            if (data === 1) {
                continue;
            }
            const x = (i % 6) * w + w / 2;
            const y = Math.floor(i / 6) * h + mt;
            let c = 0xffffff;
            if (i === gameMap.start) {
                c = 0x50c878;
            }
            if (i === gameMap.end) {
                c = 0xd2042d;
            }
            const tile = this.add.rectangle(x, y, w, h, c);
            tile.setStrokeStyle(2, 0x000000);
            tile.id = i;
            tile.setInteractive().on("pointerdown", event => {
            },
            this);
            this.tiles.push(tile);
        }
    }

    createActions() {
        for (let i = 0; i < gameMap.actions.length; i++) {
            const action = gameMap.actions[i];
            const tile = this.add.rectangle(208 + i * 80, 900, 80, 80, '0xffffff').setStrokeStyle(2, 0x000000);
            tile.action = action;
            tile.setInteractive().on("pointerdown", event => {
                this.addCommand(tile.action);
            }, this);
            const image = this.add.image(208 + i * 80, 900, `action${action}`);
            image.scale = 0.8;
        }
    }

    createCommands() {
        for (let i = 0; i < gameMap.commands; i++) {
            const action = gameMap.actions[i];
            let w = 80;
            let x = this.sys.game.canvas.width / 2 - (gameMap.commands * w / 2) + w / 2;
            const tile = this.add.rectangle(x + i * w, 150, w, w, '0xffffff').setStrokeStyle(2, 0x000000);
           
            tile.action = action;
            tile.setInteractive().on("pointerdown", event => {
            }, this);
            // const image = this.add.image(200 + i * 80, 100, `action${action}`);
            // image.scale = 0.8;    
        }
    }

    addCommand(action) {
        if (this.index < gameMap.commands) {
            let w = 80;
            let x = this.sys.game.canvas.width / 2 - (gameMap.commands * w / 2) + w / 2;
            this.player.routes.push(action);
            const image = this.add.image(x + this.index * w, 150, `action${action}`);
            image.scale = 0.8;
            this.index++;
            this.commands.push(image);
        }
        if (this.index === gameMap.commands) {
            this.time.addEvent({ delay: 800, callback: () => {this.play = true;  this.scheduler.visible = true;}});
        }
    }

    createScheduler() {
        let w = 80;
        let x = this.sys.game.canvas.width / 2 - (gameMap.commands * w / 2) + w / 2;
        this.scheduler = this.add.image(x, 90, 'scheduler');
        this.scheduler.scale = 0.5;
        this.tweens.add({
            targets: this.scheduler,
            y: this.scheduler.y - 3, 
            duration: 500,
            repeat: -1,
            yoyo: true,
        });
        this.scheduler.visible = false;

    }

    update() {
        this.player.update();
    }

  
}
class GameMap {
    constructor() {
        this.id = 1;
        this.data = [];
        this.actions = [];
        this.start = 0;
        this.end = 0;
        this.mt = (1024 - 6 * 96) / 2 + 96 / 2;
    }

    row() {
        return 6;
    }

    setup(scene) {
        const data = scene.cache.json.get('maps')[this.id - 1];
        this.commands = data.commands;
        this.actions = [1, 2, 3];
        this.data = data.map
        this.start = data.start;
        this.end = data.end;
    }

    tileWidth() {
        return 48;
    }
    
    tileHeight() {
        return 48;
    }

    canvasToMapX(x) {
        return Math.floor(x / this.tileWidth());
    }
    
    canvasToMapY(y) {
        return Math.floor(y / this.tileHeight());
    }

    centerX() {
        return 576 / 2;
    }

    centerY() {
        return 1024 / 2;
    }

    startX() {
        return (this.start % this.row()) * this.tileWidth() + 96;
    }
    
    startY() {
        return Math.floor(this.start / this.row()) * (this.tileHeight() * 2) + this.mt;
    }

}

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.startX = x;
        this.startY = y;
        this.direction = 0;
        this.routes = [];
        this.state = 'move';
        this.index = -1;
    }

    canPass() {
        let new_x = (this.x + this.xWithDirection(this.direction)) / 96 - 0.5;
        let new_y = (this.y + this.yWithDirection(this.direction) - gameMap.mt) / 96;
            console.log(new_x, new_y);
        return gameMap.data[new_y * gameMap.row() + new_x] === 0;
    }

    update() {
        if (this.state === 'move' && this.scene.play) {
            if (this.checkVictory()) {
                gameMap.id++;
                if (gameMap.id > this.scene.cache.json.get('maps').length) {
                    this.scene.scene.start("Over");
                } else {
                    this.scene.scene.start("Game");
                }
                return;
            }
            this.state = 'wait';
            let route = this.routes.shift();
            if (route) {
                let w = 80;
                let x = this.scene.sys.game.canvas.width / 2 - (gameMap.commands * w / 2) + w / 2;
                this.index++;
                this.scene.scheduler.x = x + this.index * w;
                this.processMoveCommand(route);
            } else {
                this.clear();
            }
            this.scene.time.addEvent({ delay: 800, callback: () => this.state = 'move'});
        }
    }

    checkVictory() {
        let new_x = this.x / 96 - 0.5;
        let new_y = (this.y - gameMap.mt) / 96;
        return new_y * gameMap.row() + new_x === gameMap.end;
    }

    clear() {
        this.x = this.startX;
        this.y = this.startY;
        this.angle = 0;
        this.direction = 0;
        this.scene.clear();
        this.index = -1;
        let w = 80;
        let x = this.scene.sys.game.canvas.width / 2 - (gameMap.commands * w / 2) + w / 2;
        this.scene.scheduler.x = x + this.index * w;
        this.scene.scheduler.visible = false;
    }

    processMoveCommand(command) {
        switch (command) {
            case 1:
                this.turnLeft();
                break;
            case 2:
                this.moveForward();
                break;
            case 3:
                this.turnRight()
        }
    }

    moveForward() {
        if (this.canPass()) {
            this.x += this.xWithDirection();
            this.y += this.yWithDirection();
        } else {
            this.scene.tweens.add({
                targets: this,
                y: this.y - 10,
                ease: 'Cubic.easeOut', 
                duration: 100,
                repeat: 1,
                yoyo: true,
            });
        }
    }

    xWithDirection() {
        switch (this.direction) {
            case 0:
                return gameMap.tileWidth() * 2;
            case 1:
            case 3:
                return 0;
            case 2:
                return -gameMap.tileWidth() * 2;
        }
        return 0;
    }

    yWithDirection() {
        switch (this.direction) {
            case 0:
            case 2:
                return 0;
            case 1:
                return -gameMap.tileHeight() * 2;
            case 3:
                return gameMap.tileHeight() * 2;
        }
        return 0;
    }

    turnLeft() {
        this.direction = (this.direction + 1) % 4;
        this.angle -= 90;
    }

    turnRight() {
        this.direction = this.direction - 1;
        if (this.direction === -1) {
            this.direction = 3;
        }
        this.angle += 90;
    }
}

class SceneOver extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        let stars = this.add.image(w, h, 'stars');
        this.add.text(w, h, "Congratulation!", {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            color: '#fff',
            fontSize: '48px',

        }).setOrigin(0.5, 0.5);
        this.tweens.add({
            y: stars.y - 10,
            targets: [stars],
            duration: 1000,
            repeat:-1,
            yoyo: true,
        });
        this.play = this.add.image(w, 700, 'back1').setOrigin(.5, .5);
        this.play.scale = 2;
        this.play.setInteractive();
        this.play.on('pointerover', () => this.play.setTexture('back2'));
        this.play.on('pointerout', () => this.play.setTexture('back1'));
        this.play.on('pointerdown', () => this.onBack());
    }

    onBack() {
        this.cameras.main.fadeOut(600);
        this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start("Title"));
    }
}


const config = {
    type: Phaser.AUTO,
    width: 576,
    height: 1024,
    backgroundColor: "#8abae4",
    physics: { default: "arcade", arcade: { debug: false } },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 288,
            height: 512,
        },
        max: {
            width: 1152,
            height: 2048,
        },
    },
};

const gameMap = new GameMap();

const game = new Phaser.Game(config);
game.scene.add("Boot", SceneBoot, true);
game.scene.add("Title", SceneTitle);
game.scene.add("Game", SceneGame);
game.scene.add("Over", SceneOver);
