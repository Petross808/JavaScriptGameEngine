export class Component 
{
    #gameObject;

    get gameObject() { return this.#gameObject; }

    constructor(gameObject) 
    {
        this.#gameObject = gameObject;
    }

    Start() {}
    Update() {}
    OnDestroy() {}
    Render(context) {}
}