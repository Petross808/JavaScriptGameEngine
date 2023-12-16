import { Collider } from "../GameEngine/Scripts/Components/Collider.js";
import { InputHandler } from "../GameEngine/Scripts/Components/InputHandler.js";
import { Rigidbody } from "../GameEngine/Scripts/Components/Rigidbody.js";
import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";

export class Player extends GameObject
{
    #input;
    #rb;
    #render;
    #collider;

    #speed = 1000;
    #directionHeld = {up: false, down: false, left: false, right: false}

    Start()
    {
        this.tag = "player";

        this.game.camera.target = this;
        this.#rb = this.AddComponent(Rigidbody);
        this.#rb.gravityMultiplier = 0;
        this.#rb.weight = 50;
        this.#rb.drag = 10;
        this.#rb.maxSpeed = 5000; 

        this.#input = this.AddComponent(InputHandler);
        this.#input.BindKey("KeyW", this, () => this.#directionHeld.up = true, () => this.#directionHeld.up = false);
        this.#input.BindKey("KeyS", this, () => this.#directionHeld.down = true, () => this.#directionHeld.down = false);
        this.#input.BindKey("KeyA", this, () => this.#directionHeld.left = true, () => this.#directionHeld.left = false);
        this.#input.BindKey("KeyD", this, () => this.#directionHeld.right = true, () => this.#directionHeld.right = false);

        this.#render = this.AddComponent(SpriteRenderer);
        this.#render.size = new Vector2(50,50);

        this.#collider = this.AddComponent(Collider);
        this.#collider.size = new Vector2(50,50);

    }

    Update()
    {
        this.#rb.acceleration = Vector2.Scale(this.GetVectorFromKeys(this.#directionHeld),this.#speed);
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


}