import addButton from "../button";
import k from "../kaboom";

const title = () => {
  k.layers(["bg", "obj", "ui"], "obj");

  k.add([k.sprite("background"), k.layer("bg")]);

  k.add([
    k.text("Scrolling Yarrrr!", 12),
    k.pos(k.width() / 2, k.height() / 2 - 40),
    k.origin("center"),
    k.color(0, 0, 0),
  ]);

  k.add([
    k.sprite("player"),
    k.scale(2),
    {
      add() {
        this.play("idle");
      },
    },
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2),
  ]);

  addButton("Start", k.vec2(k.width() / 2, k.height() / 2 + 40), () => {
    k.go("main");
  });
};

export default title;
