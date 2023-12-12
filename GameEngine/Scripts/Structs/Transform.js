import { Vector2 } from "./Vector2";

export class Transform
{
    get parent() {
        return this.parent;
    }

    get position() {
        return this.position;
    }

    get rotation() {
        return this.rotation;
    }

    get scale() {
        return this.scale;
    }

    set parent(parent)
    {
        this.parent = parent;
    }

    set position(position) {
        this.position = position;
    }

    set rotation(rotation) {
        this.rotation = rotation;
    }

    set scale(scale) {
        this.scale = scale;
    }

    constructor(parent, position, rotation, scale)
    {
        this.parent = parent;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    constructor(position, rotation, scale)
    {
        this.parent = null;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    constructor()
    {
        this.parent = null;
        this.position = new Vector2(0, 0);
        this.rotation = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
    }
}