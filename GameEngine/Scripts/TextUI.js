import { Component } from "./Component.js";
import { Vector2 } from "./Structs/Vector2.js";

export class TextUI extends Component
{
    #screenPos = new Vector2(100,100);
    #text = "Default Text";
    #font = "50px arial";
    #color = "white";

    get screenPos() { return this.#screenPos; }
    get text() { return this.#text; }
    get font() { return this.#font; }
    get color() { return this.#color; }

    set screenPos(value) { this.#screenPos = value; }
    set text(value) { this.#text = value; }
    set font(value) { this.#font = value; }
    set color(value) { this.#color = value; }

    Render(context)
    {
        const camera = this.gameObject.game.camera;

        context.font = this.#font
        context.fillStyle = this.#color

        context.fillText(this.#text, camera.transform.position.x + this.#screenPos.x, camera.transform.position.y + this.#screenPos.y);
    }
}