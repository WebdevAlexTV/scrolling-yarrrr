import k from "./kaboom";

const loadSprites = () => {
  k.loadRoot("./resources/sprites/");

  k.loadSprite("background", "background.png");

  k.loadSprite("wood", "wood.png", {
    sliceX: 1,
    sliceY: 1,
  });

  k.loadSprite("spikes", "spikes.png", {
    sliceX: 1,
    sliceY: 1,
  });

  k.loadSprite("chalice", "chalice.png", {
    sliceX: 1,
    sliceY: 1,
  });

  k.loadSprite("player", "pirate.png", {
    sliceX: 27,
    sliceY: 1,
    anims: {
      idle: {
        from: 1,
        to: 4,
      },
      run: {
        from: 6,
        to: 9,
      },
      jump: {
        from: 11,
        to: 15,
      },
      fall: {
        from: 17,
        to: 18,
      },
      die: {
        from: 20,
        to: 26,
      },
    },
  });
};

export default loadSprites;
