export class GameObject
{
    #game;
    #transform;
    #components;

    get game() { return this.#game; }
    get transform() { return this.#transform; }

    set game(game) { this.#game = game; }

    constructor(transform)
    {
        this.#transform = transform;
    }

    InternalStart()
    {
        for(const component of this.#components)
        {
            component.Start();
        }
        Start();
    }

    InternalRender(context)
    {
        for(const component of this.#components)
        {
            component.Render(context);
        }
        Render(context);
    }

    InternalUpdate()
    {
        for(const component of this.#components)
        {
            component.Update();
        }
        Update();
    }

    InternalOnDestroy()
    {
        for(const component of this.#components)
        {
            component.OnDestroy();
        }
        OnDestroy();
    }

    Start() {}
    Render(context) {}
    Update() {}
    OnDestroy() {}

    AddComponent(type)
    {
        if(!(type instanceof Component)) return;
        
        component = Reflect.construct(type, [this], undefined);
        this.#components.push(component);
        return component;
    }

    GetComponent(type)
    {
        if(!(type instanceof Component)) return;

        returnComp = this.#components.filter(component => component instanceof type);
        return returnComp[0];
    }

    RemoveComponent(type)
    {
        if(!(type instanceof Component)) return;

        toRemove = this.components.findIndex(component => component instanceof type);
        toRemove.OnDestroy();
        this.#components = this.#components.filter(component => component !== toRemove );
    }

    static IsGameObjectThrow(object)
    {
        if(!(object instanceof GameObject))
        {
            new Error("Object '" + object + "' is not a GameObject");
        }
    }
}