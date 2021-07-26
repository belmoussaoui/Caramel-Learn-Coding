class SceneBoot extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.preloadAudio();
        this.preloadImage();
        this.load.on('complete', () => this.scene.start("Game"));
    }

    preloadAudio() {
    }

    preloadImage() {
        this.load.image('play1', './assets/img/play1.png');
        this.load.image('play2', './assets/img/play2.png');
        this.load.image('logo1', './assets/img/logo1.png');
        this.load.image('logo2', './assets/img/logo2.png');
    }
}

class SceneTitle extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        this.createLogo();
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

        
    }
    init() {
        gameMap.setup(1);
    }


    create() {
        this.createMap();
    }

    createMap() {
        const w = 96;
        const h = 96;
        const mt = (1024 - 6*96) / 2 + 96 / 2;
        for (let i = 0; i < gameMap.data.length; i++) {
            const data = gameMap.data[i];
            if (data === 1) {
                // continue;
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
                console.log(tile.id);
            },
            this);
            this.tiles.push(tile);
        }
    }

    update() {
    }

  
}
class GameMap {
    constructor() {
        this.id = 0;
        this.data = [];
        this.start = 0;
        this.end = 0;
    }

    row() {
        return 6;
    }

    setup(id) {
        this.id = id;
        this.data = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
        this.start = 13;
        this.end = 16;
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
