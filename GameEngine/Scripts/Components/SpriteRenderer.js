import { Vector2 } from '../Structs/Vector2.js'
import { Component } from '../Component.js';

export class SpriteRenderer extends Component
{
    #offset = new Vector2(0,0);
    #size = new Vector2(1,1);
    #color = "white";
    #texture = null;
    #flipX = false;

    get offset() { return this.#offset; }
    get size() { return this.#size; }
    get color() { return this.#color; }
    get texture() { return this.#texture; }
    get flipX() { return this.#flipX; }

    set offset(value) { this.#offset = value; }
    set size(value) { this.#size = value; }
    set color(value) { this.#color = value; }
    set texture(value) { this.#texture = value; }
    set flipX(value) { this.#flipX = value; }

    // If texture is specified, render it to the screen, otherwise render a rectangle of the specified color
    Render(context)
    {
        const scaled = Vector2.Multiply(this.#size, this.gameObject.transform.scale);
        const pos = Vector2.Add(this.#offset, this.gameObject.transform.position).Add(Vector2.Scale(scaled, -0.5));

        if(this.#texture && this.#texture.complete)
        {
            context.save();
            if(this.#flipX)
            {
                context.translate(scaled.x, 0);
                context.scale(-1,1);
            }
            context.drawImage(this.#texture, pos.x, pos.y, scaled.x, scaled.y);
            context.restore();
        }
        else
        {
            context.fillStyle = this.color;
            context.fillRect(pos.x, pos.y, scaled.x, scaled.y);
        }
    }
}