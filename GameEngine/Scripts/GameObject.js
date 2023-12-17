import { Transform } from "./Structs/Transform.js";
import { Component } from "./Component.js"

export class GameObject
{
    #game;
    #transform;
    #components;

    #tag = "";

    // Collision Layer (bit flag) 1 = Default
    #layer = 1;

    get game() { return this.#game; }
    get transform() { return this.#transform; }
    get tag() { return this.#tag; }
    get layer() { return this.#layer; }

    set game(value) { this.#game = value; }
    set tag(value) { this.#tag = value; }
    set layer(value) { this.#layer = value; }

    constructor()
    {
        this.#transform = new Transform();
        this.#components = [];
    }

    // Call Start of this and all components when the GameObject is cWreated
    InternalStart()
    {
        this.Start();
        for(const component of this.#components)
        {
            component.Start();
        }
    }

    // Call Render of this and all components each Game Update
    InternalRender(context)
    {
        this.Render(context);
        for(const component of this.#components)
        {
            component.Render(context);
        }
    }

    // Call LateRender of this and all components each Game Update
    InternalLateRender(context)
    {
        this.LateRender(context);
        for(const component of this.#components)
        {
            component.LateRender(context);
        }
    }

    // Call update of this and all components each Game Update
    InternalUpdate()
    {
        this.Update();
        for(const component of this.#components)
        {
            component.Update();
        }
    }

    // Destroy all components before destroying this GameObject
    InternalOnDestroy()
    {
        this.OnDestroy();
        for(const component of this.#components)
        {
            component.OnDestroy();
        }
    }

    // Call OnCollision on this and all components when a non-trigger collider registers a collision
    InternalOnCollision(collider)
    {
        this.OnCollision(collider);
        for(const component of this.#components)
        {
            component.OnCollision(collider);
        }
    }

    // Call OnTrigger on this and all components when a trigger collider registers a collision
    InternalOnTrigger(collider)
    {
        this.OnTrigger(collider);
        for(const component of this.#components)
        {
            component.OnTrigger(collider);
        }
    }

    Start() {}
    Render(context) {}
    LateRender(context) {}
    Update() {}
    OnDestroy() {}
    OnCollision(collider) {}
    OnTrigger(collider) {}

    // Add component of type to this GameObject 
    AddComponent(type)
    {
        Component.IsComponentClassThrow(type);

        const component = Reflect.construct(type, [this]);
        this.#components.push(component);
        return component;
    }

    // Get first component of type from this GameObject
    GetComponent(type)
    {
        Component.IsComponentClassThrow(type);

        const returnComp = this.#components.filter(component => component instanceof type);
        return returnComp[0];
    }

    // Get all components of type from this GameObject in an array
    GetAllComponentsOfType(type)
    {
        Component.IsComponentClassThrow(type);

        const returnComp = this.#components.filter(component => component instanceof type);
        return returnComp;
    }

    // Remove first component of type from this GameObject
    RemoveComponent(type)
    {
        Component.IsComponentClassThrow(type);

        const toRemove = this.#components.findIndex(component => component instanceof type);
        this.#components[toRemove].OnDestroy();
        this.#components = this.#components.filter(component => component !== this.#components[toRemove] );
    }

    // Check if object is a GameObject object otherwise throw an error
    static IsGameObjectThrow(object)
    {
        if(!(object instanceof GameObject))
        {
            new Error("Object '" + object + "' is not a GameObject");
        }
    }
}