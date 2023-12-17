import { Collider } from "../GameEngine/Scripts/Components/Collider.js";
import { Rigidbody } from "../GameEngine/Scripts/Components/Rigidbody.js";
import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { Time } from "../GameEngine/Scripts/Time.js";
import { EntityHealth } from "./EntityHealth.js";
import { Sprites } from "./Resources.js";

export class Projectile extends GameObject
{
    #render;
    #rb;
    #collider;

    #destroyTimer = 5;

    #enemyTag = "";

    get render() { return this.#render; }
    get rb() { return this.#rb; }
    get collider() { return this.#collider; }
    get enemyTag() { return this.#enemyTag; }

    set enemyTag(value) { this.#enemyTag = value; }

    Start()
    {
        this.tag = "projectile";
        this.layer = 1 << 4;
        this.#render = this.AddComponent(SpriteRenderer);
        this.#render.texture = Sprites.projectile;
        this.#render.size.Set(32,32);

        this.#rb = this.AddComponent(Rigidbody);
        this.#rb.gravityMultiplier = 0;
        this.#rb.drag = 0;
        this.#rb.weight = 10;

        this.#collider = this.AddComponent(Collider);
        this.#collider.size.Set(32,32);
        this.#collider.ignoreLayer = 1 << 2 | 1 << 4;
    }

    Update()
    {
        this.#destroyTimer -= Time.deltaTime;
        if(this.#destroyTimer <= 0)
        {
            this.game.Destroy(this);
        }
    }

    OnCollision(other)
    {
        if(other.gameObject.tag === this.enemyTag)
        {
            const eh = other.gameObject.GetComponent(EntityHealth);
            if(eh)
            {
                eh.TakeDamage(1);
            }
        }

        this.game.Destroy(this);
    }
}