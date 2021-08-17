import k from "./kaboom";

function addButton(buttonText, pos, callback) {
  const bg = k.add([
    k.pos(pos),
    k.rect(60, 30),
    k.origin("center"),
    k.color(1, 1, 1),
    k.layer("ui"),
  ]);

  k.add([
    k.text(buttonText),
    k.pos(pos),
    k.origin("center"),
    k.color(0, 0, 0),
    k.layer("ui"),
  ]);

  bg.action(() => {
    if (bg.isHovered()) {
      bg.color = k.rgb(0.8, 0.8, 0.8);
      if (k.mouseIsClicked()) {
        callback();
      }
    } else {
      bg.color = k.rgb(1, 1, 1);
    }
  });
}

export default addButton;
