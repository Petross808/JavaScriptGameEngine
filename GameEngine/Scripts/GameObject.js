export class GameObject
{
    get game() {
        return this.transform;
    }

    set game(game) {
        this.game = game;
    }

    get transform() {
        return this.transform;
    }

    set transform(transform) {
        this.transform = transform;
    }

    get components() {
        return this.components;
    }

    constructor(transform)
    {
        this.transform = transform;
    }

    InternalStart()
    {
        for(component in components)
        {
            component.Start();
        }
        Start();
    }

    InternalRender(context)
    {
        for(component in components)
        {
            component.Render(context);
        }
        Render(context);
    }

    InternalUpdate()
    {
        for(component in components)
        {
            component.Update();
        }
        Update();
    }

    InternalOnDestroy()
    {
        for(component in components)
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
        if(type instanceof Component)
        component = Reflect.construct(componentType, this)
        this.components.push(component);
        return component;
    }

    GetComponent(type)
    {
        returnComp = this.components.filter(component => component instanceof type);
        return returnComp[0];
    }

    RemoveComponent(type)
    {
        toRemove = this.components.findIndex(component => component instanceof type);
        toRemove.OnDestroy();
        this.components = this.components.filter(component => component !== toRemove );
    }
}