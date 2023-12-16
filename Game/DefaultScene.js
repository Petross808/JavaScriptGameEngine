import { Scene } from "../GameEngine/Scripts/Scene.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { Platform } from "./Platform.js";
import { Player } from "./Player.js";

export class DefaultScene extends Scene
{
    Start()
    {
        this.Inst(new Player(), new Vector2(0, 0));
        this.Inst(new Platform(), new Vector2(150, 150));
        this.Inst(new Platform(), new Vector2(-300, -200));
        this.Inst(new Platform(), new Vector2(0, 180));
        this.Inst(new Platform(), new Vector2(-400, 100));
    }
}