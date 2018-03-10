var canvas = null;
var canvas2d = null;
var lastTime = null;
var lkey = false, rkey = false, ukey = false, dkey = false, retKey = false, retKeyLock = false;
var mouseX = 0, mouseY = 0;
var mouseClicked = false, mouseClickLock = false;
var player = null;
var enemyAddTimeLimit = 2000;
var enemyAddTimer = 0;
var shooterList = [];
var playerBulletList = [];
var shooterBulletList = [];
var particleList = [];
var bgY1 = 0, bgY2 = 0;
var state = "intro";
var bgMusic = null;
var explosion = null;
var shoot = null;
var dt = 16;

function initialize() {
	canvas = document.getElementById("canvas");
	canvas.style.cursor = "crosshair";
	canvas2d = canvas.getContext("2d");
	bgMusic = document.createElement("audio");
	bgMusic.src = "assets/bg.mp3";
	explosion = document.createElement("audio");
	explosion.src = "assets/explosion.wav";
	shoot = document.createElement("audio");
	shoot.src = "assets/shoot.wav";
	window.addEventListener("keyup", keyUpListener, false);
	window.addEventListener("keydown", keyDownListener, false);
	window.addEventListener("mousemove", mouseMoveListener, false);
	window.addEventListener("mouseup", mouseUpListener, false);
	window.addEventListener("mousedown", mouseDownListener, false);
	lastTime = new Date().getTime();
	window.requestAnimationFrame(loop);
};
function draw() {
	canvas2d.fillStyle = "black";
	canvas2d.fillRect(0, 0, canvas.width, canvas.height);
	canvas2d.save();
	if(state == "gameover") {
		canvas2d.globalAlpha = 0.4;
	}
	if(state == "intro") {
		canvas2d.font = "30px sans-serif";
		canvas2d.fillStyle = "red";
		canvas2d.fillText("PRESS ENTER", 220, 200);
	}
	if(state != "intro") {
		canvas2d.strokeStyle = "rgb(0, 75, 0)";
		for(var i = 0; i < 6; i++) {
			for(var j = 0; j < 8; j++) {
				canvas2d.strokeRect(j * 80, Math.floor(bgY1) + i * 80, 80, 80);
				canvas2d.strokeRect(j * 80, bgY2 + i * 80, 80, 80);
			}
		}
		for(var i = 0; i < playerBulletList.length; i++) {
			var bullet = playerBulletList[i];
			bullet.draw();
		}
		if(state == "play") {
			if(player.health > 0) {
				player.draw();
			}
		}
		for(var i = 0; i < shooterBulletList.length; i++) {
			shooterBulletList[i].draw(i);
		}
		for(var i = 0; i < shooterList.length; i++) {
			shooterList[i].draw(i);
		}
		for(var i = 0; i < particleList.length; i++) {
			var particle = particleList[i];
			particle.draw();
		}
	}
	canvas2d.restore();
	if(state == "gameover") {
		canvas2d.font = "30px sans-serif";
		canvas2d.fillStyle = "red";
		canvas2d.fillText("GAME OVER", 220, 200);
		canvas2d.font = "20px sans-serif";
		canvas2d.fillStyle = "blue";
		canvas2d.fillText("PRESS ENTER", 220, 300);
	}
};
function update(dt) {
	if(state == "play") {
		player.update(dt);
		if(player.health == 0 && particleList.length == 0) {
			state = "gameover";
			bgMusic.pause();
		}
		for(var i = 0; i < playerBulletList.length; i++) {	// when player-bullet goes out of bounds
			var bullet = playerBulletList[i];
			if((bullet.x + bullet.radius * 2 <= 0) || (bullet.x >= canvas.width) || (bullet.y + bullet.radius * 2 <= 0) || (bullet.y >= canvas.height)) {
				playerBulletList.splice(i, 1);
				i--;
			}
		}
		for(var i = 0; i < playerBulletList.length; i++) {	// when player-bullet collides with shooters
			var pb = playerBulletList[i];
			for(var j = 0; j < shooterList.length; j++) {
				var s = shooterList[j];
				if(pb.x + pb.radius * 2 >= s.x && pb.x <= s.x + s.radius * 2 && pb.y + pb.radius * 2 >= s.y && pb.y <= s.y + s.radius * 2) {
					shooterList.splice(j, 1);
					playerBulletList.splice(i, 1);
					particleList.push(new Particle(s.x + s.radius, s.y + s.radius, Math.PI - Math.PI / 4));
					particleList.push(new Particle(s.x + s.radius, s.y + s.radius, Math.PI + Math.PI / 4));
					particleList.push(new Particle(s.x + s.radius, s.y + s.radius, -Math.PI / 4));
					particleList.push(new Particle(s.x + s.radius, s.y + s.radius, Math.PI / 4));
					explosion.currentTime = 0;
					explosion.play();
					i--;
					break;
				}
			}
		}
		for(var i = 0; i < playerBulletList.length; i++) {
			var bullet = playerBulletList[i];
			bullet.update(dt);
		}
		for(var i = 0; i < shooterList.length; i++) {
			var shooter = shooterList[i];
			if(shooter.y > canvas.height) {
				shooterList.splice(i, 1);
				i--;
			}
		}
		for(var i = 0; i < shooterBulletList.length; i++) {		// when shooter-bullets go out of bounds
			var bullet = shooterBulletList[i];
			if((bullet.x + bullet.radius * 2 <= 0) || (bullet.x >= canvas.width) || (bullet.y + bullet.radius * 2 <= 0) || (bullet.y >= canvas.height)) {
				shooterBulletList.splice(i, 1);
				i--;
			}
		}
		for(var i = 0; i < shooterBulletList.length; i++) {		// when shooter-bullets collide with player
			var sb = shooterBulletList[i];
			if((sb.x + sb.radius * 2 >= player.x) && (sb.x <= player.x + player.radius * 2) && (sb.y + sb.radius * 2 >= player.y) && (sb.y <= player.y + player.radius * 2)) {
				shooterBulletList.splice(i, 1);
				if(player.health > 0) {
					player.health--;
					if(player.health == 0) {
						particleList.push(new Particle(player.x + player.radius, player.y + player.radius, Math.PI - Math.PI / 4));
						particleList.push(new Particle(player.x + player.radius, player.y + player.radius, Math.PI + Math.PI / 4));
						particleList.push(new Particle(player.x + player.radius, player.y + player.radius, -Math.PI / 4));
						particleList.push(new Particle(player.x + player.radius, player.y + player.radius, Math.PI / 4));
						explosion.currentTime = 0;
						explosion.play();
					}
				}
				i--;
			}
		}
		for(var i = 0; i < shooterBulletList.length; i++) {
			var bullet = shooterBulletList[i];
			bullet.update(dt);
		}
		enemyAddTimer += dt;
		if(enemyAddTimer >= enemyAddTimeLimit) {
			enemyAddTimer = 0;
			shooterList.push(new Shooter());
		}
		for(var i = 0; i < shooterList.length; i++) {
			shooterList[i].update(dt);
		}
		bgY1 += 0.1 * dt;
		bgY2 = bgY1 - canvas.height;
		if(bgY1 > canvas.height) {
			bgY1 = bgY2;
		}
		for(var i = 0; i < particleList.length; i++) {
			var particle = particleList[i];
			if(particle.alpha == 0) {
				particleList.splice(i, 1);
				i--;
			}
		}
		for(var i = 0; i < particleList.length; i++) {
			var particle = particleList[i];
			particle.update(dt);
		}
	}
	else if(state == "gameover") {
		if(retKey) {
			state = "intro";
		}
	}
	else if(state == "intro") {
		if(retKey) {
			reset();
			state = "play";
		}
	}
	mouseClicked = false;
	retKey = false;
};
function reset() {
	player = new Player();
	playerBulletList = [];
	shooterBulletList = [];
	particleList = [];
	shooterList = [];
	enemyAddTimer = 0;
	bgMusic.currentTime = 0;
	bgMusic.loop = true;
	bgMusic.play();
};
function loop() {
	draw();
	update(dt);
	window.requestAnimationFrame(loop);
}
function keyUpListener(e) {
	if(e.which == 37 || e.which == 65) {
		lkey = false;
	}
	if(e.which == 39 || e.which == 68) {
		rkey = false;
	}
	if(e.which == 38 || e.which == 87) {
		ukey = false;
	}
	if(e.which == 40 || e.which == 83) {
		dkey = false;
	}
	if(e.which == 13) {
		retKeyLock = false;
	}
};
function keyDownListener(e) {
	if(e.which == 37 || e.which == 65) {
		lkey = true;
	}
	if(e.which == 39 || e.which == 68) {
		rkey = true;
	}
	if(e.which == 38 || e.which == 87) {
		ukey = true;
	}
	if(e.which == 40 || e.which == 83) {
		dkey = true;
	}
	if(e.which == 13) {
		if(!retKeyLock) {
			retKey = true;
			retKeyLock = true;
		}
	}
};
function mouseMoveListener(e) {
	var canvasRect = canvas.getBoundingClientRect();
	var canvasX = canvasRect.x;
	var canvasY = canvasRect.y;
	if(e.clientX >= canvasX && e.clientX <= canvasX + canvas.width && e.clientY >= canvasY && e.clientY <= canvasY + canvas.height) {
		mouseX = e.clientX - canvasX;
		mouseY = e.clientY - canvasY;
	}
	if(mouseX < 0) {
		mouseX = 0;
	}
	if(mouseX > canvas.width) {
		mouseX = canvas.width;
	}
	if(mouseY < 0) {
		mouseY = 0;
	}
	if(mouseY > canvas.height) {
		mouseY = canvas.height;
	}
};
function mouseUpListener(e) {
	mouseClickLock = false;
};
function mouseDownListener(e) {
	mouseClicked = true;
	mouseClickLock = true;
};
window.addEventListener("load", initialize, false);
function Particle(sourceX, sourceY, angle) {
	this.centerX = sourceX;
	this.centerY = sourceY;
	this.speed = 0.5;
	this.veloX = this.speed * Math.cos(angle);
	this.veloY = this.speed * Math.sin(angle);
	this.alpha = 1;
	this.draw = function() {
		canvas2d.save();
		canvas2d.beginPath();
		canvas2d.arc(this.centerX, this.centerY, 10, 0, 2 * Math.PI);
		canvas2d.closePath();
		canvas2d.globalAlpha = this.alpha;
		canvas2d.fillStyle = "yellow";
		canvas2d.fill();
		canvas2d.restore();
	};
	this.update = function(dt) {
		this.centerX += this.veloX * dt;
		this.centerY += this.veloY * dt;
		this.alpha -= 0.005 * dt;
		if(this.alpha < 0) {
			this.alpha = 0;
		}
	};
}
function Player() {
	this.x = 200;
	this.y = 200;
	this.radius = 16;
	this.veloX = 0;
	this.veloY = 0;
	this.maxSpeed = 0.35;
	this.accMag = 0.007;
	this.frictionMag = this.accMag / 2;
	this.angle = 0;
	this.health = 5;
	this.draw = function() {
		canvas2d.save();
		canvas2d.translate(this.x + this.radius, this.y + this.radius);
		canvas2d.rotate(this.angle);
		canvas2d.fillStyle = "blue";
		canvas2d.fillRect(0, -5, 30, 10);
		canvas2d.restore();
		canvas2d.beginPath();
		canvas2d.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
		canvas2d.fillStyle = "red";
		canvas2d.fill();
		canvas2d.closePath();
		canvas2d.fillStyle = "red";
		canvas2d.font = "25px sans-serif";
		canvas2d.fillText("H: ", 5, 30);
		for(var i = 0; i < this.health; i++) {
			canvas2d.fillRect(40 + i*10 + i*5, 10, 10, 20);
		}
	};
	this.update = function(dt) {
		var accX = 0, accY = 0;
		if(lkey && !rkey && !ukey && !dkey) {
			accX = -this.accMag;
		}
		else if(!lkey && rkey && !ukey && !dkey) {
			accX = this.accMag;
		}
		else if(!lkey && !rkey && ukey && !dkey) {
			accY = -this.accMag;
		}
		else if(!lkey && !rkey && !ukey && dkey) {
			accY = this.accMag;
		}
		else if(lkey && !rkey && ukey && !dkey) {
			var angle = Math.PI + Math.PI / 4;
			accX = this.accMag * Math.cos(angle);
			accY = this.accMag * Math.sin(angle);
		}
		else if(lkey && !rkey && !ukey && dkey) {
			var angle = Math.PI - Math.PI / 4;
			accX = this.accMag * Math.cos(angle);
			accY = this.accMag * Math.sin(angle);
		}
		else if(!lkey && rkey && ukey && !dkey) {
			var angle = -Math.PI / 4;
			accX = this.accMag * Math.cos(angle);
			accY = this.accMag * Math.sin(angle);
		}
		else if(!lkey && rkey && !ukey && dkey) {
			var angle = Math.PI / 4;
			accX = this.accMag * Math.cos(angle);
			accY = this.accMag * Math.sin(angle);
		}
		this.veloX += accX * dt;
		this.veloY += accY * dt;
		if(this.veloX != 0 || this.veloY != 0) {
			if(this.veloX != 0 && this.veloY == 0) {
				if(this.veloX < 0) {
					this.veloX += this.frictionMag * dt;
					if(this.veloX > 0) {
						this.veloX = 0;
					}
				}
				else if(this.veloX > 0) {
					this.veloX -= this.frictionMag * dt;
					if(this.veloX < 0) {
						this.veloX = 0;
					}
				}
			}
			else if(this.veloY != 0 && this.veloX == 0) {
				if(this.veloY < 0) {
					this.veloY += this.frictionMag * dt;
					if(this.veloY > 0) {
						this.veloY = 0;
					}
				}
				else if(this.veloY > 0) {
					this.veloY -= this.frictionMag * dt;
					if(this.veloY < 0) {
						this.veloY = 0;
					}
				}
			}
			else {
				var veloAngle = Math.atan2(this.veloY, this.veloX);
				var frictionX = this.frictionMag * Math.cos(veloAngle + Math.PI);
				var frictionY = this.frictionMag * Math.sin(veloAngle + Math.PI);
				var prevVeloX = this.veloX;
				var prevVeloY = this.veloY;
				this.veloX += frictionX * dt;
				this.veloY += frictionY * dt;
				if((this.veloX > 0 && prevVeloX < 0) || (this.veloX < 0 && prevVeloX > 0)) {
					this.veloX = 0;
				}
				if((this.veloY > 0 && prevVeloY < 0) || (this.veloY < 0 && prevVeloY > 0)) {
					this.veloY = 0;
				}
			}
		}
		if(this.veloX < 0 && this.x == 0) {
			this.veloX = 0;
		}
		if(this.veloX > 0 && this.x == canvas.width - this.radius * 2) {
			this.veloX = 0;
		}
		if(this.veloY < 0 && this.y == 0) {
			this.veloY = 0;
		}
		if(this.veloY > 0 && this.y == canvas.height - this.radius * 2) {
			this.veloY = 0
		}
		var speed = Math.sqrt(this.veloX * this.veloX + this.veloY * this.veloY);
		if(speed > this.maxSpeed) {
			if(this.veloX != 0 && this.veloY == 0) {
				if(this.veloX < 0) {
					this.veloX = -this.maxSpeed;
				}
				else if(this.veloX > 0) {
					this.veloX = this.maxSpeed;
				}
			}
			else if(this.veloY != 0 && this.veloX == 0) {
				if(this.veloY < 0) {
					this.veloY = -this.maxSpeed;
				}
				else if(this.veloY > 0) {
					this.veloY = this.maxSpeed;
				}
			}
			else {
				var veloAngle = Math.atan2(this.veloY, this.veloX);
				this.veloX = this.maxSpeed * Math.cos(veloAngle);
				this.veloY = this.maxSpeed * Math.sin(veloAngle);
			}
		}
		this.x += this.veloX * dt;
		if(this.x < 0) {
			this.x = 0;
		}
		if(this.x + this.radius * 2 > canvas.width) {
			this.x = canvas.width - this.radius * 2;
		}
		this.y += this.veloY * dt;
		if(this.y < 0) {
			this.y = 0;
		}
		if(this.y + this.radius * 2 > canvas.height) {
			this.y = canvas.height - this.radius * 2;
		}
		var vectorX = mouseX - (this.x + this.radius);
		var vectorY = mouseY - (this.y + this.radius);
		this.angle = Math.atan2(vectorY, vectorX);
		if(mouseClicked) {
			playerBulletList.push(new Bullet(this.x + this.radius, this.y + this.radius, this.angle, "white"));
			shoot.currentTime = 0;
			shoot.play();
		}
	};
};
function Shooter() {
	this.speed = 0.1;
	this.veloX = 0;
	this.veloY = this.speed;
	this.angle = 0;
	this.veloTimer = 0;
	this.veloTimeLimit = 1000;
	this.radius = 16;
	this.x = Math.floor(Math.random() * canvas.width - this.radius * 2) + 1;
	this.y = -this.radius * 2;
	this.fireBulletTimer = 0;
	this.fireBulletTimeLimitList = [1000, 2000, 3000];
	var index = Math.floor(Math.random() * 3);
	this.fireBulletTimeLimit = this.fireBulletTimeLimitList[index];
	this.draw = function() {
		canvas2d.save();
		canvas2d.translate(this.x + this.radius, this.y + this.radius);
		canvas2d.rotate(this.angle);
		canvas2d.fillStyle = "rgb(100, 50, 10)";
		canvas2d.fillRect(0, -5, 30, 10);
		canvas2d.restore();
		canvas2d.beginPath();
		canvas2d.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
		canvas2d.fillStyle = "rgb(200, 50, 10)";
		canvas2d.fill();
		canvas2d.closePath();
	};
	this.update = function(dt) {
		this.veloTimer += dt;
		if(this.veloTimer >= this.veloTimeLimit) {
			this.veloTimer = 0;
			this.changeVelo();
		}
		if(this.veloX < 0 && this.x == 0) {
			this.changeVelo();
			this.veloTimer = 0;
		}
		if(this.veloX > 0 && this.x == canvas.width - this.radius * 2) {
			this.changeVelo();
			this.veloTimer = 0;
		}
		this.x += this.veloX * dt;
		if(this.x < 0) {
			this.x = 0;
		}
		if(this.x + this.radius * 2 > canvas.width) {
			this.x = canvas.width - this.radius * 2;
		}
		this.y += this.veloY * dt;
		var targetX = player.x + player.radius;
		var targetY = player.y + player.radius;
		var sourceX = this.x + this.radius;
		var sourceY = this.y + this.radius;
		var vectorX = targetX - sourceX;
		var vectorY = targetY - sourceY;
		this.angle = Math.atan2(vectorY, vectorX);
		this.fireBulletTimer += dt;
		if(this.fireBulletTimer >= this.fireBulletTimeLimit) {
			this.fireBulletTimer = 0;
			shooterBulletList.push(new Bullet(this.x + this.radius, this.y + this.radius, this.angle, "yellow"));
			var index = Math.floor(Math.random() * 3);
			this.fireBulletTimeLimit = this.fireBulletTimeLimitList[index];
		}
	};
	this.changeVelo = function() {
		var option = Math.floor(Math.random() * 5) + 1;
		if(option == 1) {
			this.veloX = -this.speed;
			this.veloY = 0;
		}
		else if(option == 2) {
			this.veloX = this.speed;
			this.veloY = 0;
		}
		else if(option == 3) {
			this.veloX = 0;
			this.veloY = this.speed;
		}
		else if(option == 4) {
			var dir = Math.PI - Math.PI / 4;
			this.veloX = this.speed * Math.cos(dir);
			this.veloY = this.speed * Math.sin(dir);		
		}
		else if(option == 5) {
			var dir = Math.PI / 4;
			this.veloX = this.speed * Math.cos(dir);
			this.veloY = this.speed * Math.sin(dir);		
		}
	}
};
function Bullet(launcherX, launcherY, launcherAngle, color) {
	this.radius = 5;
	this.x = launcherX - this.radius;
	this.y = launcherY - this.radius;
	this.speed = 0.5;
	this.veloX = this.speed * Math.cos(launcherAngle);
	this.veloY = this.speed * Math.sin(launcherAngle);
	this.color = color;
	this.draw = function() {
		canvas2d.beginPath();
		canvas2d.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
		canvas2d.fillStyle = this.color;
		canvas2d.fill();
		canvas2d.closePath();
	};
	this.update = function(dt) {
		this.x += this.veloX * dt;
		this.y += this.veloY * dt;
	};
};
