import { Collider } from './Collider.js';
import { Component } from '../Component.js';
import { Vector2 } from '../Structs/Vector2.js';
import { Time } from '../Time.js';

export class Rigidbody extends Component 
{
    static #rigidbodies = [];

    static #gravity = new Vector2(0, 100);
    static get gravity() { return this.#gravity; }

    #velocity = new Vector2(0, 0);
    #acceleration = new Vector2(0, 0);
    #drag = 1;
    #gravityMulitplier = 1;

    get velocity() { return this.#velocity; }
    get acceleration() { return this.#acceleration; }
    get drag() { return this.#drag; }
    get gravityMultiplier() { return this.#gravityMulitplier; }
    get localGravity() { return Vector2.Scale(Rigidbody.gravity, this.#gravityMulitplier); }

    set velocity(value) { this.#velocity = value; }
    set acceleration(value) { this.#acceleration = value; }
    set drag(value) { this.#drag = value; }
    set gravityMultiplier(value) { this.#gravityMulitplier = value; }

    Start()
    {
        Rigidbody.#rigidbodies.push(this);
    }

    Update() 
    {
        // Apply acceleration and gravity to speed
        this.#velocity.Add(Vector2.Add(this.#acceleration, this.localGravity).timeScaled);
        // Apply speed to the object
        this.gameObject.transform.position.Add(this.#velocity.timeScaled);
        
        //Apply drag to the speed
        if(this.#velocity.magnitude > 0 && this.#drag > 0)
        {
            this.#velocity.Scale(1 - (this.#drag * Time.deltaTime));
        }
        
    }

    static CheckCollisions()
    {
        const bodiesWithColliders = Rigidbody.#rigidbodies.map((el) => el.gameObject.GetAllComponentsOfType(Collider));
        if(bodiesWithColliders.length < 2) return;

        for(let i = 0; i < bodiesWithColliders.length; i++)
        {
            for(const collider of bodiesWithColliders[i])
            {
                for(let j = i + 1; j < bodiesWithColliders.length; j++)
                {
                    for(const otherCollider of bodiesWithColliders[j])
                    {
                        if(collider.IsOverlapping(otherCollider))
                        {
                            collider.gameObject.InternalOnCollision(otherCollider);
                            otherCollider.gameObject.InternalOnCollision(collider);
                        }
                    }
                }
            }
        }
    }
}