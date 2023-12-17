import { Component } from "../GameEngine/Scripts/Component.js";
import { Time } from "../GameEngine/Scripts/Time.js";

export class EntityHealth extends Component
{
    #health = 10;
    #iframes = false;
    #itimer = 0.5;

    get health() { return this.#health; }

    set health(value) { this.#health = value; }

    TakeDamage(amount)
    {
        if(this.#iframes) return;
        this.#iframes = true;
        this.#health -= amount;
        if(this.#health <= 0)
        {
            this.Die();
        }
    }

    Die()
    {
        this.gameObject.game.Destroy(this.gameObject);
    }

    Update()
    {
        if(this.#iframes)
        {
            this.#itimer -= Time.deltaTime;
            if(this.#itimer <= 0)
            {
                this.#iframes = false;
                this.#itimer = 0.5;
            }
        }
    }
}