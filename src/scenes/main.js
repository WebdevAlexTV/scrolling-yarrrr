import k from "../kaboom";

const level = [
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
];

let score = 0;

const main = () => {
  let lastBlockSpawn = 2;

  k.layers(["bg", "obj", "ui"], "obj");

  k.add([k.sprite("background"), k.layer("bg")]);

  /**
   * Level
   */
  k.addLevel(level, {
    width: 32,
    height: 32,
    pos: k.vec2(0, 0),
  });

  const scoreText = k.add([
    k.text("Score: " + score, 12),
    k.pos(10, 10),
    k.origin("topleft"),
    k.color(0, 0, 0),
  ]);

  addBlock(k.width() / 2, k.height() / 2 + 64);

  /**
   * PLAYER
   */
  const player = k.add([
    k.sprite("player", {
      frame: 28,
    }),
    k.pos(k.width() / 2, k.height() / 2),
    k.scale(1.5),
    k.origin("center"),
    k.body(),
    "player",
  ]);

  player.action(() => {
    if (player.pos.y > k.height() + 64 || player.pos.y < -64) {
      k.go("gameOver", Math.floor(score));
    }
  });

  /**
   * Controls
   */
  k.keyDown("left", function () {
    if (player.pos.x >= 8) {
      player.move(-120, 0);
      if (player.scale.x > 0) {
        player.scale.x *= -1;
      }
    }
  });

  k.keyDown("right", function () {
    if (player.pos.x <= k.width() - 8) {
      player.move(120, 0);
      if (player.scale.x < 0) {
        player.scale.x *= -1;
      }
    }
  });

  k.keyPress("left", function () {
    player.play("run");
  });

  k.keyPress("right", function () {
    player.play("run");
  });

  k.keyRelease("left", function () {
    player.play("idle");
  });

  k.keyRelease("right", function () {
    player.play("idle");
  });

  k.keyPress("space", function () {
    if (player.grounded()) {
      player.jump(300);
    }
  });

  player.play("idle");

  /**
   * Handling blocks
   */
  k.action("moving-block", (tile) => {
    tile.pos.y -= 1;
    if (tile.pos.y > k.height() + 20) {
      k.destroy(tile);
    }
  });

  /**
   * Update loop
   */
  k.action(() => {
    score += k.dt();
    scoreText.text = "Score: " + Math.floor(score);
    lastBlockSpawn += k.dt();
    if (lastBlockSpawn > 2) {
      lastBlockSpawn = 0;
      addBlock((Math.floor(Math.random() * 8) + 1) * 24, k.height());
    }
  });
};

const addBanana = (x, y) => {
  k.add([
    k.sprite("tileset", {
      frame: 233,
    }),
    k.pos(x, y - 20),
    k.origin("center"),
    k.body(),
    "banana",
    {
      redeemed: false,
      add() {
        k.collides("player", "banana", (player, banana) => {
          if (banana.redeemed === false) {
            banana.redeemed = true;
            score += 5;
            banana.jump(300);
            banana.play("banana", false);
            k.wait(0.5, () => {
              k.destroy(banana);
            });
          }
        });
      },
    },
  ]);
};

const addBlock = (x, y) => {
  if (Math.random() > 0.6) {
    addBanana(x, y);
  }

  k.add([
    k.sprite("tileset_half", {
      frame: 1,
    }),
    k.pos(x - 12, y),
    k.origin("center"),
    k.solid(),
    "moving-block",
  ]);
  k.add([
    k.sprite("tileset_half", {
      frame: 1,
    }),
    k.pos(x + 12, y),
    k.origin("center"),
    k.solid(),
    "moving-block",
  ]);
};

export default main;
