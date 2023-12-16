import { Transform } from "./Structs/Transform.js";
import { Component } from "./Component.js"

export class GameObject
{
    #game;
    #transform;
    #components;

    get game() { return this.#game; }
    get transform() { return this.#transform; }

    set game(game) { this.#game = game; }

    constructor()
    {
        this.#transform = new Transform();
        this.#components = [];
    }

    InternalStart()
    {
        this.Start();
        for(const component of this.#components)
        {
            component.Start();
        }
    }

    InternalRender(context)
    {
        this.Render(context);
        for(const component of this.#components)
        {
            component.Render(context);
        }
    }

    InternalUpdate()
    {
        this.Update();
        for(const component of this.#components)
        {
            component.Update();
        }
    }

    InternalOnDestroy()
    {
        this.OnDestroy();
        for(const component of this.#components)
        {
            component.OnDestroy();
        }
    }

    InternalOnCollision()
    {
        this.OnCollision();
        for(const component of this.#components)
        {
            component.OnCollision();
        }
    }

    Start() {}
    Render(context) {}
    Update() {}
    OnDestroy() {}
    OnCollision(other) {}

    AddComponent(type)
    {
        Component.IsComponentClassThrow(type);

        const component = Reflect.construct(type, [this]);
        this.#components.push(component);
        return component;
    }

    GetComponent(type)
    {
        Component.IsComponentClassThrow(type);

        const returnComp = this.#components.filter(component => component instanceof type);
        return returnComp[0];
    }

    GetAllComponentsOfType(type)
    {
        Component.IsComponentClassThrow(type);

        const returnComp = this.#components.filter(component => component instanceof type);
        return returnComp;
    }

    RemoveComponent(type)
    {
        Component.IsComponentClassThrow(type);

        const toRemove = this.components.findIndex(component => component instanceof type);
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