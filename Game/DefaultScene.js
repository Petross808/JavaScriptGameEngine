import { Scene } from "../GameEngine/Scripts/Scene.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { Wall } from "./Wall.js";
import { Player } from "./Player.js";
import { Enemy } from "./Enemy.js";
import { Asteroid } from "./Asteroid.js";
import { Time } from "../GameEngine/Scripts/Time.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { TextUI } from "../GameEngine/Scripts/TextUI.js";

export class DefaultScene extends Scene
{
    #timer = 1;

    Start()
    {
        Time.scale = 0;

        this.Inst(new Wall(), new Vector2(0, -500), new Vector2(0, 1), new Vector2(21, 1));
        this.Inst(new Wall(), new Vector2(0, 500), new Vector2(0, 1), new Vector2(21, 1));
        this.Inst(new Wall(), new Vector2(-500, 0), new Vector2(0, 1), new Vector2(1, 21));
        this.Inst(new Wall(), new Vector2(500, 0), new Vector2(0, 1), new Vector2(1, 21));

        const player = this.Inst(new Player(), new Vector2(0, 0));
        const enemy = this.Inst(new Enemy(), new Vector2(0, -700));
        const ui = this.Inst(new GameObject());
        const startText = ui.AddComponent(TextUI);
        startText.text = "Press Enter to Start";
        startText.screenPos.Set(this.game.renderer.canvas.width/2-200,this.game.renderer.canvas.height/2-50);;

        enemy.player = new WeakRef(player);
        enemy.ui = new WeakRef(ui);
        player.ui = new WeakRef(ui);
    }

    Update()
    {

        this.#timer -= Time.deltaTime;
        if(this.#timer <= 0)
        {
            this.SpawnAsteroid();
            this.#timer = 1;
        }
    }

    SpawnAsteroid()
    {
        let aster = this.Inst(new Asteroid(), new Vector2(-1000, Math.random()*1000-500));
        aster.rb.velocity.Set(500,Math.random()*20-10);
    }
}