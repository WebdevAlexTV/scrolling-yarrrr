import k from "./kaboom";

const loadSprites = () => {
  k.loadRoot("./resources/sprites/");

  k.loadSprite("background", "background.png");

  k.loadSprite("tileset_half", "tileset2.png", {
    sliceX: 28,
    sliceY: 20,
  });

  k.loadSprite("tileset", "tileset2.png", {
    sliceX: 28,
    sliceY: 10,
    anims: {
      banana: {
        from: 233,
        to: 235,
      },
    },
  });

  k.loadSprite("player", "pirate.png", {
    sliceX: 10,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 4,
      },
      run: {
        from: 5,
        to: 9,
      },
    },
  });
};

export default loadSprites;
