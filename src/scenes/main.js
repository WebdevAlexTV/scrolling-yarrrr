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

const main = (retry = false) => {
  let blocksAdded = 0;
  let lastBlockSpawn = 2;
  let playerIsDead = false;

  if (retry === true) {
    score = 0;
  }

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
    k.body({ maxVel: 300 }),
    "player",
    {
      add() {
        this.on("animEnd", (anim) => {
          if (anim === "jump") {
            if (!this.grounded()) {
              this.play("fall");
            }
          }
        });
      },
    },
  ]);

  player.action(() => {
    if (player.pos.y > k.height() + 64 || player.pos.y < -64) {
      player.trigger("died");
    }
  });

  /**
   * Controls
   */
  k.keyDown("left", function () {
    if (playerIsDead) {
      return false;
    }
    if (player.pos.x >= 8) {
      player.move(-120, 0);
      if (player.scale.x > 0) {
        player.scale.x *= -1;
      }
    }
  });

  k.keyDown("right", function () {
    if (playerIsDead) {
      return false;
    }
    if (player.pos.x <= k.width() - 8) {
      player.move(120, 0);
      if (player.scale.x < 0) {
        player.scale.x *= -1;
      }
    }
  });

  k.keyPress("left", function () {
    if (playerIsDead) {
      return false;
    }
    if (player.grounded()) {
      player.play("run");
    }
  });

  k.keyPress("right", function () {
    if (playerIsDead) {
      return false;
    }
    if (player.grounded()) {
      player.play("run");
    }
  });

  k.keyRelease("left", function () {
    if (playerIsDead) {
      return false;
    }
    if (player.grounded()) {
      player.play("idle");
    }
  });

  k.keyRelease("right", function () {
    if (playerIsDead) {
      return false;
    }
    if (player.grounded()) {
      player.play("idle");
    }
  });

  k.keyPress("space", function () {
    if (playerIsDead) {
      return false;
    }
    if (player.grounded()) {
      player.play("jump", false);
      player.jump(300);
    }
  });

  player.play("idle");

  player.on("grounded", () => {
    if (playerIsDead) {
      return false;
    }
    if (player.curAnim() !== "run") {
      player.play("idle");
    }
  });

  player.on("died", () => {
    playerIsDead = true;
    k.wait(2, () => {
      k.go("gameOver", Math.floor(score));
    });
  });

  k.on("block-added", () => {
    blocksAdded++;
  });

  // Player update loop
  player.action(() => {
    if (playerIsDead) {
      return false;
    }
    const curAnim = player.curAnim();
    if (!player.grounded() && curAnim !== "jump" && curAnim !== "fall") {
      player.play("fall");
    }
  });

  /**
   * Handling blocks
   */
  k.action("moving-block", (tile) => {
    if (playerIsDead) {
      return false;
    }
    tile.pos.y -= 1;
    if (tile.pos.y > k.height() + 20) {
      k.destroy(tile);
    }
  });

  /**
   * Update loop
   */
  k.action(() => {
    if (playerIsDead) {
      return false;
    }
    score += k.dt();
    scoreText.text = "Score: " + Math.floor(score);
    lastBlockSpawn += k.dt();
    if (lastBlockSpawn > 2) {
      lastBlockSpawn = 0;
      blocksAdded++;
      const posX = (Math.floor(Math.random() * 8) + 1) * 24;
      const posY = k.height();

      addBlock(posX, posY);
      if (blocksAdded > 3) {
        const random = Math.random();
        if (random > 0.6) {
          addChalice(posX, posY);
        }

        if (random < 0.3) {
          addSpike(posX - 8, posY);
          addSpike(posX + 8, posY);
        }
      }
    }
  });
};

const addChalice = (x, y) => {
  k.add([
    k.sprite("chalice"),
    k.pos(x, y - 20),
    k.scale(0.5),
    k.origin("center"),
    k.body(),
    "chalice",
    {
      redeemed: false,
      add() {
        k.collides("player", "chalice", (player, chalice) => {
          if (chalice.redeemed === false) {
            chalice.redeemed = true;
            score += 5;
            chalice.jump(300);
            k.wait(0.5, () => {
              k.destroy(chalice);
            });
          }
        });
      },
    },
  ]);
};

const addSpike = (x, y) => {
  k.add([
    k.sprite("spikes"),
    k.pos(x, y - 8),
    k.origin("center"),
    "spikes",
    "moving-block",
    {
      collided: false,
      add() {
        k.collides("player", "spikes", (player, spikes) => {
          if (!spikes.collided) {
            spikes.collided = true;
            player.trigger("died");
            player.play("die", false);
          }
        });
      },
    },
  ]);
};

const addBlock = (x, y) => {
  k.add([
    k.sprite("wood"),
    k.pos(x - 8, y),
    k.origin("center"),
    k.solid(),
    "moving-block",
  ]);
  k.add([
    k.sprite("wood", {
      frame: 1,
    }),
    k.pos(x + 8, y),
    k.origin("center"),
    k.solid(),
    "moving-block",
  ]);
};

export default main;
