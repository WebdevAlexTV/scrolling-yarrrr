import k from "./kaboom";

const loadSprites = () => {
  k.loadRoot("./resources/sprites/");

  k.loadSprite("background", "background.png");

  k.loadSprite("tileset", "tileset2.png", {
    sliceX: 28,
    sliceY: 10,
  });

  k.loadSprite("player", "tileset.png", {
    sliceX: 18,
    sliceY: 9,
    anims: {
      idle: {
        from: 28,
        to: 30,
      },
      run: {
        from: 46,
        to: 49,
      },
    },
  });
};

export default loadSprites;
