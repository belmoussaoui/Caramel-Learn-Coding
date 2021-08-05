var started = false;

class SceneBoot extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.preloadAudio();
        this.preloadImage();
        this.load.json('maps', './data/maps2.json');
        this.load.on('complete', () => this.scene.start("Title"));
    }

    preloadAudio() {
        this.load.audio('beep', `assets/audio/sci-fi_beep_computer_ui_02.wav`);
        this.load.audio('win', `assets/audio/sci-fi_driod_robot_emote_beeps_04.wav`);
        this.load.audio('fail_a', `assets/audio/sci-fi_code_fail_06.wav`);
        this.load.audio('fail_b', `assets/audio/sci-fi_code_fail_13.wav`);
        this.load.audio('ui_a', `assets/audio/ui_menu_button_beep_19.wav`);
        this.load.audio('ui_b', `assets/audio/ui_menu_button_beep_06.wav`);
        this.load.audio('neg', `assets/audio/sci-fi_driod_robot_emote_neg_05.wav`);
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
        this.load.image('player', './assets/img/robot.png');
        this.load.image('direction', './assets/img/player.png');
        this.load.image('scheduler', './assets/img/scheduler.png');
        this.load.image('stars', './assets/img/stars.png');
        this.load.image('title', './assets/img/title.png');
        this.load.image('hello', './assets/img/hello.png');
        this.load.image('star', './assets/img/star.png');
        this.load.image('child', './assets/img/child.png');
        this.load.image('map', './assets/img/map.png');
        this.load.image('actions', './assets/img/actions.png');
        this.load.image('commands', './assets/img/commands.png');
        this.load.image('dog', './assets/img/dog.png');
        this.load.image('cat', './assets/img/cat.png');
        this.load.image('ending', './assets/img/ending.png');
        this.load.image('eye1', './assets/img/eye1.png');
        this.load.image('eye2', './assets/img/eye2.png');
        this.load.image('bravo', './assets/img/bravo.png');
        this.load.image('win', './assets/img/win.png');
    }
}

class SceneTitle extends Phaser.Scene {
    constructor() {
        super();
        this.pos = new Phaser.Math.Vector2();
    }

    init() {
        this.trackEye = false;
    }

    create() {
        if (!started) {
            this.createLogo();
            started = true;
        } else {
            this.createPlay();
            this.createTitle();
        }
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        this.circle1 = new Phaser.Geom.Ellipse(w - 45, h * 2 - 345, 25, 25);
        this.circle2 = new Phaser.Geom.Ellipse(w + 60, h * 2 - 345, 25, 25);

    }

    createLogo() {
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        this.child = this.add.image(w, h + 120, 'child');
        this.logo = this.add.image(w, h - 100, 'logo1');
        this.logo.alpha = 0;
        this.child.alpha = 0;
        this.logo.scale = 0.33;
        this.tweens.add({
            alpha: 1,
            targets: [this.logo, this.child],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            hold: 1500,
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
        this.title = this.add.image(w, 450, 'title');
        this.title.scale = 0.5;
        this.add.text(w, 520, 'CODE', {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            color: '#fff',
            fontSize: '64px',
        }).setOrigin(0.5, 0.5);
        this.hello = this.add.image(w, h * 2, 'hello').setOrigin(0.5, 0);
        this.eye1 = this.add.image(w - 40, h * 2 + 80, 'eye1');
        this.line1 = new Phaser.Geom.Line(this.eye1.x, h * 2 - 345, 0, 0);
        this.eye2 = this.add.image(w + 60, h * 2 + 80, 'eye1');
        this.line2 = new Phaser.Geom.Line(this.eye2.x, h * 2 - 345, 0, 0);
        this.tweens.add({
            y: 600,
            targets: [this.hello],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            repeat:0,
        });
        this.tweens.add({
            y: h * 2 - 345,
            targets: [this.eye1, this.eye2],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            repeat:0,
            onComplete: () => this.trackEye = true
        });
        this.hello.scale = 0.75;
  
        this.tweens.add({
            y: 440,
            targets: this.title,
            duration: 1500,
            repeat:-1,
            yoyo: true
        });

        this.add.text(w, h * 2 - 50, 'orlean games © 2021 august', {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '20px',
        }).setOrigin(0.5, 0.5);
        this.add.text(w, h * 2 - 50 + 25, 'written by bilal el moussaoui', {
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '20px',
        }).setOrigin(0.5, 0.5);
        this.logo = this.add.image(115, 65, 'logo2');
        this.logo.alpha = 1;
        this.logo.scale = 0.7;
    }

    createPlay() {
        let w = this.sys.game.canvas.width / 2;
        this.play = this.add.image(w, 280, 'play1').setOrigin(.5, .5);
        this.play.scale = 1.5;
        this.play.setInteractive();
        this.play.on('pointerover', () => this.play.setTexture('play2'));
        this.play.on('pointerout', () => this.play.setTexture('play1'));
        this.play.on('pointerdown', () => this.onPlay());
    }

    onPlay() {
        this.sound.play('ui_a');
        this.time.addEvent({ delay: 400, callback: () => {
            this.cameras.main.fadeOut(600);
            this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start("Game"));
        }});
    }

    update() {
        if (this.trackEye) {
            this.line1.x2 = this.input.activePointer.x || this.line1.x1;
            this.line1.y2 = this.input.activePointer.y || this.line1.y1;
            Phaser.Geom.Ellipse.CircumferencePoint(this.circle1, Phaser.Geom.Line.Angle(this.line1), this.pos);
            this.eye1.x = this.pos.x;
            this.eye1.y = this.pos.y;
            this.line2.x2 = this.input.activePointer.x;
            this.line2.y2 = this.input.activePointer.y;
            Phaser.Geom.Ellipse.CircumferencePoint(this.circle2, Phaser.Geom.Line.Angle(this.line2), this.pos);
            this.eye2.x = this.pos.x;
            this.eye2.y = this.pos.y;
            if (this.input.activePointer.x === 0 && this.input.activePointer.y === 0) {
                this.eye1.x = this.circle1.x + 4;
                this.eye1.y = this.circle1.y;
                this.eye2.x = this.circle2.x;
                this.eye2.y = this.circle2.y;
            }
        }
    }
}

class SceneGame extends Phaser.Scene {
    constructor() {
        super();
    }
    
    init() {
        this.tiles = []; 
        this.commands = [];
        this.actions = [];
        this.index = 0; 
        this.play = false;
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
        this.cameras.main.fadeIn(500, 0, 0, 0);
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
        const ml = 96 / 2
        let map = this.add.image(286, 530, 'map');
        for (let i = 0; i < gameMap.data.length; i++) {
            const data = gameMap.data[i];
            if (data === 1) {
                continue;
            }
            const x = (i % 5) * w + w / 2 + ml;
            const y = Math.floor(i / 5) * h + mt;
            let c = 0xffffff;
            const tile = this.add.rectangle(x, y, w, h, c);
            if (i === gameMap.start) {
                const tile = this.add.rectangle(x, y, w-4, h-4, c);
                this.tile = tile;
                this.tile.setFillStyle(0x50c878);
                this.tile.alpha = 0.8;
                this.tween = this.tweens.add({
                    targets: this.tile,
                    alpha: 0.3, 
                    duration: 1500,
                    repeat: -1,
                    yoyo: true,
                });
                this.tile.setDepth(2);
            }
            tile.setStrokeStyle(4, 0x000000);
            tile.id = i;
            if (i === gameMap.end) {
                this.star = this.add.image(x, y, 'star');
                this.star.scale = 0.25;
            }
            this.tiles.push(tile);
        }
        map.scale= 0.875;
    }
    
    createActions() {
        let w = this.sys.game.canvas.width / 2;
        let board = this.add.image(w, 900, 'actions');
        board.scale = 0.8;
        this.canAction = true;
        let colors = ['0xcfdb32', '0xf36e38', '0x87789c']
        for (let i = 0; i < gameMap.actions.length; i++) {
            if (gameMap.id === 1 && i !== 1) {
                continue;
            }
            if (gameMap.id === 2 && i === 0) {
                continue;
            }
            const action = gameMap.actions[i];
            const tile = this.add.circle(208 + i * 80 - 30 + i * 25, 900, 40, colors[i]);
            this.actions.push(tile);
            tile.action = action;
            const image = this.add.image(208 + i * 80 - 30 + i * 25, 900, `action${action}`);
            tile.image = image;
            tile.setInteractive().on("pointerdown", event => {
                if (!this.canAction) {
                    return;
                }
                this.sound.play('ui_b');
                this.canAction = false;
                this.tween.stop();
                this.tweens.add({
                    y: tile.y + 6,
                    targets: [tile, image],
                    ease: 'Cubic.easeIn', 
                    duration: 0,
                    hold: 200,
                    repeat:0,
                    onComplete: () => {
                        tile.y -= 6;
                        image.y -= 6;
                        this.canAction = true;
                    }
                });
                this.image.alpha = 1;
                this.addCommand(tile.action);
            }, this);
            image.scale = 0.8;
            if (gameMap.id === 1) {
                if (i === 1) {
                    this.image = image;
                    this.tween = this.tweens.add({
                        targets: image,
                        alpha: 0.4,
                        duration: 1000,
                        repeat: -1,
                        yoyo: true,
                    });
                } else {
                    image.alpha = 0.1;
                }
            }
            if (gameMap.id === 2) {
                if (i === 2) {
                    this.image = image;
                    this.tween = this.tweens.add({
                        targets: image,
                        alpha: 0.2,
                        duration: 1000,
                        repeat: -1,
                        yoyo: true,
                    });
                }
                
            }
        }
    }

    createCommands() {
        let w = this.sys.game.canvas.width / 2;
        let c = this.add.image(w, 150, 'commands');
        c.angle = 1;

        for (let i = 0; i < gameMap.commands; i++) {
            const action = gameMap.actions[i];
            let w = 80;
            let x = this.sys.game.canvas.width / 2 - (gameMap.commands * w / 2) + w / 2;
            const tile = this.add.rectangle(x + i * w, 150, w, w, '0xffffff').setStrokeStyle(4, 0x000000);
           
            tile.action = action;
            tile.setInteractive().on("pointerdown", event => {
            }, this); 
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
            this.time.addEvent({ delay: 800, callback: () => {
                this.play = true;
                this.scheduler.visible = true;
            }});
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
        this.star.angle += 0.5;
    }

    bravo() {
        let w = this.sys.game.canvas.width / 2;
        this.sound.play('win');
        this.star.destroy();
        this.onNextLevel();
        this.player.anim.stop();
        this.tweens.add({
            y: this.player.y - 30,
            targets: [this.player], 
            duration: 650,
            ease: 'Bounce.easeIn', 
            repeat:-1,
            yoyo: true
        });
    }

    onNextLevel() {
        this.time.addEvent({ delay: 2000, callback: () => {
            this.cameras.main.fadeOut(800);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                if (gameMap.id > this.cache.json.get('maps').length) {
                    this.scene.start("Over");
                } else {
                    this.scene.start("Game");
                }
            });
        }});
    }

  
}
class GameMap {
    constructor() {
        this.id = 1;
        this.data = [];
        this.actions = [];
        this.direction = 0;
        this.start = 0;
        this.end = 0;
        this.mt = (1024 - 6 * 96) / 2 + 96;
        this.ml = 96 / 2;
    }

    row() {
        return 5;
    }

    setup(scene) {
        const data = scene.cache.json.get('maps')[this.id - 1];
        this.commands = data.commands;
        this.actions = [1, 2, 3];
        this.data = data.map
        this.direction = data.direction;
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
        return (this.start % this.row()) * this.tileWidth() * 2 + this.ml + 48;
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
        this.isWin = false;
        this.direction = gameMap.direction;
        // this.angle = -this.direction * 90
        this.routes = [];
        this.state = 'move';
        this.shiftY = 0
        this.index = -1;
        this.scale = 0.22;
        this.arrow = this.scene.add.image(this.x, this.y, 'direction');
        this.arrow.setDepth(100);
        this.arrow.angle = -this.direction * 90;
        this.arrow.scale = 0.60;
        this.setOrigin(0.5, 0.6);
        this.anim = scene.tweens.add({
            y: this.y - 5,
            targets: this,
            duration: 1200,
            repeat:-1,
            yoyo: true
        });
        this.isStaring = false;
        this.setDepth(3);
    }

    canPass() {
        let new_x = Math.round((this.x + this.xWithDirection(this.direction) - gameMap.ml) / 96 - 0.5);
        let new_y = Math.round((this.y + this.yWithDirection(this.direction) - gameMap.mt) / 96);
        if (new_x >= gameMap.row() || new_y >= gameMap.row() || new_x < 0 || new_y < 0) {
            return false;
        }
        return gameMap.data[new_y * gameMap.row() + new_x] === 0;
    }

    update() {
        if (this.isStaring) {
            this.arrow.angle += 0.5;
        }
        this.arrow.x = this.x;
        this.arrow.y = this.y + 15;
        if (this.state === 'move' && this.scene.play) {
            if (this.checkVictory()) {
                this.isWin = true;
                gameMap.id++;
                this.state = 'wait';
                this.scene.bravo();
                this.arrow.setTexture('star');
                this.arrow.scale = 0.2;
                this.isStaring = true;
                this.setTexture('win');
                // this.scene.scene.start("Game");
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
                this.scene.tile.y = Math.round((this.y - gameMap.mt) / 96) * 96 + gameMap.mt;
                this.scene.tile.x = this.x;
            } else {
                this.clear();
                if (!this.isWin) {
                    this.scene.sound.play('fail_b')
                }
            }
            this.scene.time.addEvent({ delay: 800, callback: () => this.state = 'move'});
        }
    }

    checkVictory() {
        let new_x = (this.x - gameMap.ml) / 96 - 0.5;
        let new_y = Math.round((this.y - gameMap.mt) / 96);
        return new_y * gameMap.row() + new_x === gameMap.end;
    }

    clear() {
        this.anim.stop();
        this.x = this.startX;
        this.y = this.startY;
        this.arrow.angle = -gameMap.direction * 90;
        this.direction = gameMap.direction;
        this.scene.clear();
        this.index = -1;
        let w = 80;
        let x = this.scene.sys.game.canvas.width / 2 - (gameMap.commands * w / 2) + w / 2;
        this.scene.scheduler.x = x + this.index * w;
        this.scene.scheduler.visible = false;
        this.scene.tile.y = this.y;
        this.scene.tile.x = this.x;
        this.anim = this.scene.tweens.add({
            y: this.y - 5,
            targets: this,
            duration: 1200,
            repeat:-1,
            yoyo: true
        });
        this.state = 'wait'
    }

    processMoveCommand(command) {
        this.scene.sound.play('beep');
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
        this.anim.complete();
        if (this.canPass()) {
            this.x += this.xWithDirection();
            this.y += this.yWithDirection();
            this.anim = this.scene.tweens.add({
                y: this.y - 5,
                targets: this,
                duration: 1200,
                repeat:-1,
                yoyo: true
            });
        } else {
            this.scene.sound.play('fail_a');
            this.scene.sound.play('neg');
            this.anim.stop();
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
        this.scene.tweens.add({
            angle: this.arrow.angle - 90,
            targets: this.arrow,
            duration: 200,
            repeat:0,
        });
        // this.arrow.angle -= 90;
    }

    turnRight() {
        this.direction = this.direction - 1;
        this.scene.tweens.add({
            angle: this.arrow.angle + 90,
            targets: this.arrow,
            duration: 200,
            repeat:0,
        });
        if (this.direction === -1) {
            this.direction = 3;
        }
    }

}

class SceneOver extends Phaser.Scene {
    constructor() {
        super();
        this.pos = new Phaser.Math.Vector2();
    }

    init() {
        gameMap.id = 1;
        this.trackEye = false;
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0)
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        let stars = this.add.image(w, h, 'stars');
        // let dog = this.add.image(w + 220, h + 280, 'dog');
        // let cat = this.add.image(w - 240, h + 290, 'cat');
        let ending = this.add.image(w, -400, 'ending');
        ending.angle = 180;
        ending.scale = 0.7;
        this.tweens.add({
            y: -50,
            targets: ending,
            ease: 'Cubic.easeIn', 
            duration: 1000,
            hold: 1000,
            repeat:0,
        });
        // dog.scale = 0.75
        // cat.scale = 0.7
        this.tweens.add({
            y: stars.y - 10,
            targets: [stars],
            duration: 1000,
            repeat:-1,
            yoyo: true,
        });
        this.play = this.add.image(w, 360, 'back1').setOrigin(.5, .5);
        this.play.scale = 2;
        this.play.setInteractive();
        this.play.on('pointerover', () => this.play.setTexture('back2'));
        this.play.on('pointerout', () => this.play.setTexture('back1'));
        this.play.on('pointerdown', () => this.onBack());
        this.createBravo();
        this.createEyes();
    }

    createBravo() {
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        this.hello = this.add.image(w, h * 2, 'bravo').setOrigin(0.5, 0);
        this.hello.scale = 0.75;
        this.tweens.add({
            y: 600,
            targets: [this.hello],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            repeat:0,
        });
    }

    createEyes() {
        let w = this.sys.game.canvas.width / 2;
        let h = this.sys.game.canvas.height / 2;
        this.eye1 = this.add.image(w - 45, 130 - 300, 'eye2');
        this.eye2 = this.add.image(w + 40, 130 - 300, 'eye2');
        this.line1 = new Phaser.Geom.Line(this.eye1.x, 160, 0, 0);
        this.line2 = new Phaser.Geom.Line(this.eye2.x, 160, 0, 0);
        this.tweens.add({
            y: 170,
            targets: [this.eye1, this.eye2],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            repeat:0,
            onComplete: () => this.trackEye = true
        });
        this.circle1 = new Phaser.Geom.Ellipse(w - 45, 160, 30, 30);
        this.circle2 = new Phaser.Geom.Ellipse(w + 40, 160, 30, 30);
        this.circle3 = new Phaser.Geom.Ellipse(w - 45, h * 2 - 345, 25, 25);
        this.circle4 = new Phaser.Geom.Ellipse(w + 60, h * 2 - 345, 25, 25);
        
        this.eye3 = this.add.image(w - 40, h * 2 + 80, 'eye1');
        this.line3 = new Phaser.Geom.Line(this.eye1.x, h * 2 - 345, 0, 0);
        this.eye4 = this.add.image(w + 60, h * 2 + 80, 'eye1');
        this.line4 = new Phaser.Geom.Line(this.eye2.x, h * 2 - 345, 0, 0);
        this.tweens.add({
            y: h * 2 - 345,
            targets: [this.eye3, this.eye4],
            ease: 'Cubic.easeIn', 
            duration: 1000,
            repeat:0,
            onComplete: () => this.trackEye = true
        });
    }

    onBack() {
        this.sound.play('ui_a');
        this.cameras.main.fadeOut(600);
        this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start("Title"));
    }

     update() {
        if (this.trackEye) {
            this.line1.x2 = this.input.activePointer.x;
            this.line1.y2 = this.input.activePointer.y;
            Phaser.Geom.Ellipse.CircumferencePoint(this.circle1, Phaser.Geom.Line.Angle(this.line1), this.pos);
            this.eye1.x = this.pos.x;
            this.eye1.y = this.pos.y;
            this.line2.x2 = this.input.activePointer.x;
            this.line2.y2 = this.input.activePointer.y;
            Phaser.Geom.Ellipse.CircumferencePoint(this.circle2, Phaser.Geom.Line.Angle(this.line2), this.pos);
            this.eye2.x = this.pos.x;
            this.eye2.y = this.pos.y;

            this.line3.x2 = this.input.activePointer.x || this.line3.x1;
            this.line3.y2 = this.input.activePointer.y || this.line3.y1;
            Phaser.Geom.Ellipse.CircumferencePoint(this.circle3, Phaser.Geom.Line.Angle(this.line3), this.pos);
            this.eye3.x = this.pos.x;
            this.eye3.y = this.pos.y;
            this.line4.x2 = this.input.activePointer.x;
            this.line4.y2 = this.input.activePointer.y;
            Phaser.Geom.Ellipse.CircumferencePoint(this.circle4, Phaser.Geom.Line.Angle(this.line4), this.pos);
            this.eye4.x = this.pos.x;
            this.eye4.y = this.pos.y;
            if (this.input.activePointer.x === 0 && this.input.activePointer.y === 0) {
                this.eye3.x = this.circle3.x + 4;
                this.eye3.y = this.circle3.y;
                this.eye4.x = this.circle4.x;
                this.eye4.y = this.circle4.y;
            }
        }
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
