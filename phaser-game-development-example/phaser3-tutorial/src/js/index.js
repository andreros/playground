var common = {

    scope: undefined,

    preload: function (scope) {
        common.scope = scope;
        scope.load.image('star', 'src/assets/img/star.png');
        scope.load.image('bomb', 'src/assets/img/bomb.png');
        scope.load.spritesheet('dude', 'src/assets/img/dude.png', { frameWidth: 32, frameHeight: 48 });
        scope.load.audio('collectStar', ['src/assets/audio/key.wav']);
    },

    create: function (scope) {
        //  A simple background for our game
        scope.add.image(400, 300, 'background');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        game.platforms = scope.physics.add.staticGroup();

        // The player and its settings
        game.player = scope.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        game.player.setBounce(0.2);
        game.player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        scope.anims.create({
            key: 'left',
            frames: scope.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scope.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        scope.anims.create({
            key: 'right',
            frames: scope.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        game.cursors = scope.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        game.stars = scope.physics.add.group({
            key: 'star',
            repeat: 23,
            setXY: { x: 12, y: 0, stepX: 33.5 }
        });

        game.stars.children.iterate(function (child) {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        game.bombs = scope.physics.add.group();

        //  The score and level
        game.scoreText = scope.add.text(16, 16, 'Score: ' + game.score, { fontSize: '32px', fill: '#0F0' });
        game.levelText = scope.add.text(620, 16, 'Level: ' + game.level, { fontSize: '32px', fill: '#0F0' });

        //  Collide the player and the stars with the platforms
        scope.physics.add.collider(game.player, game.platforms);
        scope.physics.add.collider(game.stars, game.platforms);
        scope.physics.add.collider(game.bombs, game.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        scope.physics.add.overlap(game.player, game.stars, common.collectStar, null, this);

        scope.physics.add.collider(game.player, game.bombs, common.hitBomb, null, this);

        //  Load music theme and play it
        game.music = scope.sound.add('theme', {
            loop: true,
            volume: 1
        });
        game.music.play();
    },

    update: function () {
        if (game.gameOver) {
            game.music.destroy();
            return;
        }
        if (game.cursors.left.isDown) {
            game.player.setVelocityX(-160);
            game.player.anims.play('left', true);
        } else if (game.cursors.right.isDown) {
            game.player.setVelocityX(160);
            game.player.anims.play('right', true);
        } else {
            game.player.setVelocityX(0);
            game.player.anims.play('turn');
        }
        if (game.cursors.up.isDown && game.player.body.touching.down) {
            game.player.setVelocityY(-330);
        }
    },

    collectStar: function (player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        game.score += 10;
        game.scoreText.setText('Score: ' + game.score);

        //  Load sound fx and play it
        var collectStar = common.scope.sound.add('collectStar');
        collectStar.play();

        if (game.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            game.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (game.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = game.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    },

    hitBomb: function (player, bomb) {
        common.scope.physics.pause();

        game.player.setTint(0xff0000);

        game.player.anims.play('turn');

        game.gameOver = true;
    },

    completeLevel: function (config) {
        game.instance.destroy(true);
        game.level += 1;
        game.config = config;
        game.instance = new Phaser.Game(game.config);
    }
}

var level1 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level1.jpg');
        this.load.image('ground', 'src/assets/img/platform1.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]01)Smells_like_teen_spirit.mp3']);
    },

    create: function () {
        common.create(this);
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        game.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        //  Now let's create some ledges
        game.platforms.create(600, 400, 'ground');
        game.platforms.create(50, 250, 'ground');
        game.platforms.create(750, 220, 'ground');
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level2.preload,
                    create: level2.create,
                    update: level2.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level2 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level2.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]02)In_bloom.mp3']);
    },

    create: function () {
        common.create(this);
        game.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        game.platforms.create(100, 180, 'ground').setScale(0.5).refreshBody();
        game.platforms.create(200, 300, 'ground').setScale(0.5).refreshBody();
        game.platforms.create(200, 400, 'ground');
        game.platforms.create(50, 300, 'ground');
        game.platforms.create(550, 150, 'ground');
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level3.preload,
                    create: level3.create,
                    update: level3.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level3 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level3.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]03)Come_as_you_are.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level4.preload,
                    create: level4.create,
                    update: level4.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level4 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level4.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]04)Breed.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level5.preload,
                    create: level5.create,
                    update: level5.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level5 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level5.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]05)Lithium.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level6.preload,
                    create: level6.create,
                    update: level6.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level6 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level6.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]06)Polly.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level7.preload,
                    create: level7.create,
                    update: level7.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level7 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level7.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]07)Territorial_Pissings.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level8.preload,
                    create: level8.create,
                    update: level8.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level8 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level8.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]08)Drain_you.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level9.preload,
                    create: level9.create,
                    update: level9.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level9 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level9.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]09)Lounge_act.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level10.preload,
                    create: level10.create,
                    update: level10.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level10 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level10.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]10)Stay_away.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level11.preload,
                    create: level11.create,
                    update: level11.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level11 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level11.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]11)On_a_plain.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            common.completeLevel({
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: {
                    preload: level12.preload,
                    create: level12.create,
                    update: level12.update
                },
                audio: {
                    disableWebAudio: true
                }
            });
        }
    }
}

var level12 = {

    preload: function () {
        common.preload(this);
        this.load.image('background', 'src/assets/img/level12.jpg');
        this.load.image('ground', 'src/assets/img/platform.png');
        this.load.audio('theme', ['src/assets/audio/themes/[Nirvana]12)Something_in_the_way.mp3']);
    },

    create: function () {
        common.create(this);
    },

    update: function () {
        common.update();
        if (game.score >= (game.levelScoreGoal * game.level)) {
            // game over, go to final credits
        }
    }
}

var game = {
    player: undefined,
    stars: undefined,
    bombs: undefined,
    platforms: undefined,
    cursors: undefined,
    score: 0,
    level: 1,
    levelScoreGoal: 240,
    gameOver: false,
    scoreText: undefined,
    levelText: undefined,
    music: undefined,
    instance: undefined,
    config: {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: level1.preload,
            create: level1.create,
            update: level1.update
        },
        audio: {
            disableWebAudio: true
        }
    }
}

game.instance = new Phaser.Game(game.config);
