import { Collider } from "../GameEngine/Scripts/Components/Collider.js";
import { InputHandler } from "../GameEngine/Scripts/Components/InputHandler.js";
import { Rigidbody } from "../GameEngine/Scripts/Components/Rigidbody.js";
import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { TextUI } from "../GameEngine/Scripts/TextUI.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { EntityHealth } from "./EntityHealth.js";
import { Projectile } from "./Projectile.js";
import { Sprites } from "./Resources.js";
import { DefaultScene } from "./DefaultScene.js";
import { Time } from "../GameEngine/Scripts/Time.js";

export class Player extends GameObject
{
    #input;
    #rb;
    #render;
    #collider;
    #health;
    #healthUI;

    #directionHeld = {up: false, down: false, left: false, right: false}

    #ui;
    get ui() { return this.#ui.deref(); }
    set ui(value) { this.#ui = value; }

    Start()
    {
        this.tag = "player";
        this.layer = 1 << 3;

        this.game.camera.target = this;
        this.#rb = this.AddComponent(Rigidbody);
        this.#rb.gravityMultiplier = 0;
        this.#rb.weight = 50;
        this.#rb.drag = 40;
        this.#rb.maxSpeed = 300; 

        this.#input = this.AddComponent(InputHandler);
        this.#input.BindKey("KeyW", this, () => this.#directionHeld.up = true, () => this.#directionHeld.up = false);
        this.#input.BindKey("KeyS", this, () => this.#directionHeld.down = true, () => this.#directionHeld.down = false);
        this.#input.BindKey("KeyA", this, () => this.#directionHeld.left = true, () => this.#directionHeld.left = false);
        this.#input.BindKey("KeyD", this, () => this.#directionHeld.right = true, () => this.#directionHeld.right = false);
        this.#input.BindKey("Space", this, this.Shoot);
        this.#input.BindKey("KeyR", this, this.RestartGame);
        this.#input.BindKey("Enter", this, this.StartGame);

        this.#render = [];
        this.#render[0] = this.AddComponent(SpriteRenderer);
        this.#render[0].size = new Vector2(96,96);
        this.#render[0].texture = Sprites.weapon;
        this.#render[1] = this.AddComponent(SpriteRenderer);
        this.#render[1].size = new Vector2(96,96);
        this.#render[1].texture = Sprites.engine;
        this.#render[2] = this.AddComponent(SpriteRenderer);
        this.#render[2].size = new Vector2(96,96);
        this.#render[2].texture = Sprites.player;

        this.#collider = this.AddComponent(Collider);
        this.#collider.size = new Vector2(50,50);

        this.#health = this.AddComponent(EntityHealth);
        this.#health.health = 5;
        this.#health.enemyTag = "enemyProjectile";

        this.#healthUI = this.AddComponent(TextUI);
    }

    Update()
    {
        this.#rb.acceleration = Vector2.Scale(this.GetVectorFromKeys(this.#directionHeld), 5000);
        this.#healthUI.text = "Health: " + this.#health.health;
    }

    Shoot()
    {
        const proj = this.game.Instantiate(new Projectile, this.transform.position.Copy());
        proj.collider.ignoreLayer |= 1 << 3;
        proj.rb.velocity.Set(0,-1000);
        proj.enemyTag = "enemy";
    }

    GetVectorFromKeys({up, down, left, right})
    {
        const vector = new Vector2(0,0);
        if(up) vector.y -= 1;
        if(down) vector.y += 1;
        if(left) vector.x -= 1;
        if(right) vector.x +=1;
        return vector.normalized;
    }

    StartGame()
    {
        Time.scale = 1;
        this.ui.RemoveComponent(TextUI);
    }

    RestartGame()
    {
        this.game.LoadScene(new DefaultScene());
        this.#input.UnbindKey("KeyR");
    }

    OnDestroy()
    {
        Time.scale = 0;

        this.#input.UnbindKey("KeyW");
        this.#input.UnbindKey("KeyS");
        this.#input.UnbindKey("KeyA");
        this.#input.UnbindKey("KeyD");
        this.#input.UnbindKey("Space");
        this.#input.UnbindKey("Enter");

        const win = this.ui.AddComponent(TextUI);
        win.text = "You lost";
        win.screenPos.Set(this.game.renderer.canvas.width/2-100,this.game.renderer.canvas.height/2-50);
        const win2 = this.ui.AddComponent(TextUI);
        win2.text = "Press R to restart";
        win2.screenPos.Set(this.game.renderer.canvas.width/2-200,this.game.renderer.canvas.height/2+50);
    }


}