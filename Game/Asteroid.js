import { Collider } from "../GameEngine/Scripts/Components/Collider.js";
import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { Rigidbody } from "../GameEngine/Scripts/Components/Rigidbody.js";
import { Sprites } from "./Resources.js";
import { EntityHealth } from "./EntityHealth.js";

export class Asteroid extends GameObject
{
    #spriteRenderer;
    #collider;
    #rb;
    #eh;

    get rb() { return this.#rb; }
    
    Start()
    {
        this.tag = "asteroid";
        this.layer = 1 << 6;

        this.#spriteRenderer = this.AddComponent(SpriteRenderer);
        this.#spriteRenderer.size = new Vector2(256,256);
        this.#spriteRenderer.texture = Sprites.asteroid;

        this.#collider = this.AddComponent(Collider);
        this.#collider.size = new Vector2(64,64);
        this.#collider.ignoreLayer = 1 << 2;

        this.#rb = this.AddComponent(Rigidbody);
        this.#rb.gravityMultiplier = 0;
        this.#rb.isPushable = true;
        this.#rb.elasticity = 1;
        this.#rb.weight = 200;
        this.#rb.drag = 0.2;

        this.#eh = this.AddComponent(EntityHealth);
        this.#eh.health = 5;

    }

    Update()
    {
        if(this.transform.position.x > 1000)
        {
            this.game.Destroy(this);
        }
    }

    OnCollision(other)
    {
        if(other.gameObject.tag === "player")
        {
            other.gameObject.GetComponent(EntityHealth).TakeDamage(1);
        }

        this.#eh.TakeDamage(1);
    }
}