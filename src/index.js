import k from "./kaboom";
import gameOver from "./scenes/gameOver";
import main from "./scenes/main";
import title from "./scenes/title";
import loadSprites from "./sprites";

loadSprites();

k.scene("title", title);
k.scene("main", main);
k.scene("gameOver", gameOver);

k.start("title");
