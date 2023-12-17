import { Collider } from "../GameEngine/Scripts/Components/Collider.js";
import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { Rigidbody } from "../GameEngine/Scripts/Components/Rigidbody.js";

export class Wall extends GameObject
{
    #spriteRenderer;
    #collider;
    #rb;
    
    Start()
    {
        this.tag = "wall";
        this.layer = 1 << 2;

        this.#spriteRenderer = this.AddComponent(SpriteRenderer);
        this.#spriteRenderer.size = new Vector2(50,50);
        this.#spriteRenderer.color = "#111"

        this.#collider = this.AddComponent(Collider);
        this.#collider.size = new Vector2(50,50);
        this.#collider.ignoreLayer = 1 << 2;

        this.#rb = this.AddComponent(Rigidbody);
        this.#rb.gravityMultiplier = 0;
        this.#rb.isPushable = false;
        this.#rb.weight = 500;
        this.#rb.elasticity = 1;
    }
}