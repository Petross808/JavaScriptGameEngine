import { Collider } from "../GameEngine/Scripts/Components/Collider.js";
import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { Rigidbody } from "../GameEngine/Scripts/Components/Rigidbody.js";

export class Platform extends GameObject
{
    #spriteRenderer;
    #collider;
    #rb;
    
    Start()
    {
        this.#spriteRenderer = this.AddComponent(SpriteRenderer);
        this.#spriteRenderer.size = new Vector2(100,100);

        this.#collider = this.AddComponent(Collider);
        this.#collider.size = new Vector2(100,100);

        this.#rb = this.AddComponent(Rigidbody);
        this.#rb.gravityMultiplier = 0;
    }
}