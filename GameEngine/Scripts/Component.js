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
    LateRender(context) {}
    OnCollision(collider) {}
    OnTrigger(collider) {}

    static IsComponentClassThrow(type)
    {
        if(!(type.prototype instanceof Component))
        {
            throw new Error("'" + type + "' is not a component class")
        }
    }
}