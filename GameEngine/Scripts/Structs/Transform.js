import { GameObject } from "../GameObject";
import { Vector2 } from "./Vector2";

export class Transform
{
    #parent;
    #position;
    #rotation;
    #scale;

    get parent() { return this.#parent; }
    get position() { return this.#position; }
    get rotation() { return this.#rotation; }
    get scale() { return this.#scale; }

    set parent(parent) { this.#parent = parent; }
    set position(position) { this.#position = position; }
    set rotation(rotation) { this.#rotation = rotation; }
    set scale(scale) { this.#scale = scale; }

    constructor(parent = null, position = new Vector2(0, 0), rotation = new Vector2(1, 0), scale = new Vector2(1, 1))
    {
        if(parent != null) GameObject.IsGameObjectThrow(parent);
        Vector2.IsVectorThrow(position);
        Vector2.IsVectorThrow(rotation);
        Vector2.IsVectorThrow(scale);
        
        this.#parent = parent;
        this.#position = position;
        this.#rotation = rotation;
        this.#scale = scale;
    }

    get forward() { this.rotation; }
    get left() { return Vector2.RotateVector(this.rotation, 90); }
    get right() { return Vector2.RotateVector(this.rotation, 270); }
    get back() { return Vector2.RotateVector(this.rotation, 180); }
}