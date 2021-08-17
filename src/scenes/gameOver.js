import addButton from "../button";
import k from "../kaboom";

const gameOver = () => {
  k.layers(["bg", "obj", "ui"], "obj");

  k.add([k.sprite("background"), k.layer("bg")]);

  k.add([
    k.text("Game Over", 12),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
    k.color(0, 0, 0),
  ]);

  addButton("Retry", k.vec2(k.width() / 2, k.height() / 2 + 40), () => {
    k.go("main");
  });
};

export default gameOver;
