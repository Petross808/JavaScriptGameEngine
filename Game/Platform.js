import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";

export class Platform extends GameObject
{
    #spriteRenderer;

    Start()
    {
        this.#spriteRenderer = this.AddComponent(SpriteRenderer);
        this.#spriteRenderer.size = new Vector2(100,100);
    }
}