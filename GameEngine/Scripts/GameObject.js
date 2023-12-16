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
        for(const component of this.#components)
        {
            component.Start();
        }
        this.Start();
    }

    InternalRender(context)
    {
        for(const component of this.#components)
        {
            component.Render(context);
        }
        this.Render(context);
    }

    InternalUpdate()
    {
        for(const component of this.#components)
        {
            component.Update();
        }
        this.Update();
    }

    InternalOnDestroy()
    {
        for(const component of this.#components)
        {
            component.OnDestroy();
        }
        this.OnDestroy();
    }

    Start() {}
    Render(context) {}
    Update() {}
    OnDestroy() {}

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