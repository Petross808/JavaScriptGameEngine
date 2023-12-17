import { Component } from "../Component.js";
import { Vector2 } from "../Structs/Vector2.js";

export class Collider extends Component
{
    #offset = new Vector2(0, 0);
    #size = new Vector2(10, 10);
    #isTrigger = false;
    #ignoreLayer = 0;

    get offset() { return this.#offset; }
    get size() { return Vector2.Multiply(this.#size,this.gameObject.transform.scale); }
    get isTrigger() { return this.#isTrigger; }
    get ignoreLayer() { return this.#ignoreLayer; }

    set offset(value) { this.#offset = value; }
    set size(value) { this.#size = value; }
    set isTrigger(value) { this.#isTrigger = value; }
    set ignoreLayer(value) { this.#ignoreLayer = value; }

    get anchor() { return Vector2.Add(this.gameObject.transform.position, this.#offset); }
    
    get boundingBox()
    {
        return { 
            top: this.anchor.y - this.size.y/2,
            bottom: this.anchor.y + this.size.y/2,
            left: this.anchor.x - this.size.x/2,
            right: this.anchor.x + this.size.x/2
        }   
    }

    IsOverlapping(other)
    {
        const b1 = this.boundingBox;
        const b2 = other.boundingBox;

        return  b1.left < b2.right &&
                b1.right > b2.left &&
                b1.top < b2.bottom &&
                b1.bottom > b2.top;
        
    }
}