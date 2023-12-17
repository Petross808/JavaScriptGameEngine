import { Vector2 } from './Structs/Vector2.js';

export class Scene
{
    #game = null;
    #gameObjects = [];
    #removedGameObjects = [];

    get game() { return this.#game; }
    get gameObjects() { return this.#gameObjects; }
    get removedGameObjects() { return this.#removedGameObjects; }

    set game(value) { this.#game = value; }
    set gameObjects(value) { this.#gameObjects = value; }



    InternalStart()
    {
        this.Start();
        console.log("Scene loaded");
    }

    // Update all objects in the scene and remove marked objects 
    InternalUpdate()
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalUpdate();
        }
        this.#gameObjects = this.#gameObjects.filter(gameObject => !this.#removedGameObjects.includes(gameObject));
        this.#removedGameObjects = [];
        this.Update();
    }

    // Render all objects in the scene
    InternalRender(context)
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalRender(context);
        }
        this.Render(context);
    }

    // LateRender all objects in the scene
    InternalLateRender(context)
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalLateRender(context);
        }
        this.LateRender(context);
    }

    // Destroy all objects in the scene before the scene is destroyed
    InternalOnDestroy()
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalOnDestroy();
        }
        this.OnDestroy();
    }

    Start() {}
    Render(context) {}
    LateRender(context) {}
    Update() {}
    OnDestroy() {}

    // Shortcut for this.#game.Instantiate()
    Inst(object, position = new Vector2(0, 0), rotation = new Vector2(1,0), scale = new Vector2(1,1), parent = null)
    {
        return this.#game.Instantiate(object, position, rotation, scale, parent);
    }

    // Check if object is a scene object otherwise throw an error
    static IsSceneThrow(object)
    {
        if(!(object instanceof Scene))
        {
            new Error("Object '" + object + "' is not a scene");
        }
    }
}