let bestScore = 0;

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
        
    }
    init() {
    }


    create() {
    }

    update() {
    }

  
}


const config = {
    type: Phaser.AUTO,
    width: 288*2,
    height: 512*2,
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

const game = new Phaser.Game(config);
game.scene.add("Boot", SceneBoot, true);
game.scene.add("Title", SceneTitle);
game.scene.add("Game", SceneGame);
