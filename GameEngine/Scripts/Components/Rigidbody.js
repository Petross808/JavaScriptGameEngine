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
    #maxSpeed = Infinity;
    #drag = 1;
    #gravityMulitplier = 1;
    #isPushable = true;
    #weight = 1;
    #elasticity = 0.2;

    get velocity() { return this.#velocity; }
    get acceleration() { return this.#acceleration; }
    get maxSpeed() { return this.#maxSpeed; }
    get drag() { return this.#drag; }
    get gravityMultiplier() { return this.#gravityMulitplier; }
    get localGravity() { return Vector2.Scale(Rigidbody.gravity, this.#gravityMulitplier); }
    get isPushable() { return this.#isPushable; }
    get weight() { return this.#weight; }
    get elasticity() { return this.#elasticity; }

    set velocity(value) { this.#velocity = value; }
    set acceleration(value) { this.#acceleration = value; }
    set maxSpeed(value) { this.#maxSpeed = value; }
    set drag(value) { this.#drag = value; }
    set gravityMultiplier(value) { this.#gravityMulitplier = value; }
    set isPushable(value) { this.#isPushable = value; }
    set weight(value) { this.#weight = value; }
    set elasticity(value) { this.#elasticity = value; }

    // Add this to the static rigidbody array to be accessible to other rigidbodies for collision checking
    Start()
    {
        Rigidbody.#rigidbodies.push(this);
    }

    Update() 
    {
        // Apply acceleration and gravity to speed
        this.#velocity.Add(Vector2.Add(this.#acceleration, this.localGravity).timeScaled);
        
        // Apply drag to the speed
        if(this.#velocity.magnitude > 0 && this.#drag > 0)
        {
            this.#velocity.Add(Vector2.Scale(this.#velocity.normalized.negative, this.#drag*this.#weight).timeScaled);
        }

        // Set speed to zero if close to zero;
        if(this.#velocity.magnitude < 0.01)
        {
            this.#velocity.Set(0,0);
        }

        // Set velocity to max speed if over max speed 
        if(this.#velocity.magnitude > this.#maxSpeed)
        {
            this.#velocity = this.#velocity.normalized.Scale(this.#maxSpeed);
        }

        // Apply speed to the object
        this.gameObject.transform.position.Add(this.#velocity.timeScaled);
    }

    // When destroyed, remove this from the static rigidbody array
    OnDestroy()
    {
        Rigidbody.#rigidbodies = Rigidbody.#rigidbodies.filter((el) => el != this);
    }

    // Check for all collisions in the game and handle them
    static CheckCollisions()
    {
        // Get all colliders of all rigidbodies
        const bodiesWithColliders = Rigidbody.#rigidbodies.map((el) => el.gameObject.GetAllComponentsOfType(Collider));
        // If there is not more than one rigidbody with colliders, return
        if(bodiesWithColliders.length < 2) return;

        // Check each collider with each other collider
        for(let i = 0; i < bodiesWithColliders.length; i++)
        {
            for(let collider of bodiesWithColliders[i])
            {
                for(let j = i + 1; j < bodiesWithColliders.length; j++)
                {
                    for(let otherCollider of bodiesWithColliders[j])
                    {
                        // If the two colliders are not overlapping, skip
                        if(!collider.IsOverlapping(otherCollider)) continue;
                        // If either of the two colliders ignores the layer of the other, skip
                        if((otherCollider.ignoreLayer | collider.gameObject.layer) === otherCollider.ignoreLayer) continue;
                        if((collider.ignoreLayer | otherCollider.gameObject.layer) === collider.ignoreLayer) continue;

                        // If neither of the colliders is a trigger, handle the collision
                        if(!collider.isTrigger || !otherCollider.isTrigger)
                        {
                            Rigidbody.HandleCollision(collider, otherCollider);
                        }

                        // Call each collider's OnCollision or OnTrigger method
                        if(collider.isTrigger)
                        {
                            collider.gameObject.InternalOnTrigger(otherCollider);
                        }
                        else
                        {
                            collider.gameObject.InternalOnCollision(otherCollider);
                        }

                        if(otherCollider.isTrigger)
                        {
                            otherCollider.gameObject.InternalOnTrigger(collider);
                        }
                        else
                        {
                            otherCollider.gameObject.InternalOnCollision(collider);
                        }
                    }
                }
            }
        }
    }

    // Handle a collison of two colliders
    static HandleCollision(collider1, collider2)
    {
        let rb1 = collider1.gameObject.GetComponent(Rigidbody);
        let rb2 = collider2.gameObject.GetComponent(Rigidbody);

        const offset = Vector2.Add(collider1.anchor, collider2.anchor.negative);

        // Move one of the colliding objects out of the other collider (If only one is pushable, move the pushable one)
        // First find on which side the two objects collided based on their offset and size, then update their position
        if(!rb1.isPushable && rb2.isPushable)
        {
            if(Math.abs(offset.x/(collider1.size.x+collider2.size.x)) > Math.abs(offset.y/(collider1.size.y+collider2.size.y)))
            {
                if(offset.x > 0) rb2.gameObject.transform.position.x = collider1.anchor.x - collider1.size.x/2 - collider2.size.x/2;
                else rb2.gameObject.transform.position.x = collider1.anchor.x + collider2.size.x/2 + collider1.size.x/2;
            }
            else
            {
                if(offset.y > 0) rb2.gameObject.transform.position.y = collider1.anchor.y - collider2.size.y/2 - collider1.size.y/2;
                else rb2.gameObject.transform.position.y = collider1.anchor.y + collider2.size.y/2 + collider1.size.y/2;
            }
        }
        else
        {
            if(Math.abs(offset.x/(collider1.size.x+collider2.size.x)) > Math.abs(offset.y/(collider1.size.y+collider2.size.y)))
            {
                if(offset.x > 0) rb1.gameObject.transform.position.x = collider2.anchor.x + collider2.size.x/2 + collider1.size.x/2;
                else rb1.gameObject.transform.position.x = collider2.anchor.x - collider2.size.x/2 - collider1.size.x/2;
            }
            else
            {
                if(offset.y > 0) rb1.gameObject.transform.position.y = collider2.anchor.y + collider2.size.y/2 + collider1.size.y/2;
                else rb1.gameObject.transform.position.y = collider2.anchor.y - collider2.size.y/2 - collider1.size.y/2;
            }
        }
        
        // Set the elasticity coefficient to the average of the two objects
        const elasticity = (rb1.elasticity + rb2.elasticity) / 2;

        // Physics formulas taken from here (http://mircosoft.mzf.cz/texty/kolize.htm), the website is in czech, but the formulas are there

        // Calculate the final horizontal velocity of the objects
        const vx = (rb1.velocity.x * rb1.weight + rb2.velocity.x * rb2.weight) / (rb1.weight + rb2.weight);
        const v1x = vx - (elasticity * rb2.weight * (rb1.velocity.x - rb2.velocity.x))/(rb1.weight + rb2.weight);
        const v2x = vx + (elasticity * rb1.weight * (rb1.velocity.x - rb2.velocity.x))/(rb1.weight + rb2.weight);

        // Calculate the final vertical velocity of the objects
        const vy = (rb1.velocity.y * rb1.weight + rb2.velocity.y * rb2.weight) / (rb1.weight + rb2.weight);
        const v1y = vy - (elasticity * rb2.weight * (rb1.velocity.y - rb2.velocity.y))/(rb1.weight + rb2.weight);
        const v2y = vy + (elasticity * rb1.weight * (rb1.velocity.y - rb2.velocity.y))/(rb1.weight + rb2.weight);

        // If the objects are pushable, set their velocity to the new one
        if(rb1.isPushable) rb1.velocity = new Vector2(v1x, v1y);
        if(rb2.isPushable) rb2.velocity = new Vector2(v2x, v2y);
        
    }
}