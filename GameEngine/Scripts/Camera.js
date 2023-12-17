import { GameObject } from "./GameObject.js";
import { Vector2 } from "./Structs/Vector2.js";

export class Camera extends GameObject
{
    #target = null;
    #canvas = null;

    get target() { return this.#target; }
    get canvas() { return this.#canvas; }
    set target(value) { this.#target = value; }
    set canvas(value) { this.#canvas = value; }

    // Get canvas from the renderer
    Start()
    {
        this.#canvas = this.game.renderer.canvas;
    }

    // Set camera position so that the target is in the middle off the canvas every tick
    Update()
    {
        if(this.#target != null && this.#canvas != null)
        {
            this.transform.position = Vector2.Add(this.#target.transform.position, new Vector2(-1*this.#canvas.width/2,-1*this.#canvas.height/2));
        }
    }
}