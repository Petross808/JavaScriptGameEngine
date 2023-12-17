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

    InternalRender(context)
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalRender(context);
        }
        this.Render(context);
    }

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
    Update() {}
    OnDestroy() {}

    Inst(object, position = new Vector2(0, 0), rotation = new Vector2(1,0), scale = new Vector2(1,1), parent = null)
    {
        return this.#game.Instantiate(object, position, rotation, scale, parent);
    }

    static IsSceneThrow(object)
    {
        if(!(object instanceof Scene))
        {
            new Error("Object '" + object + "' is not a scene");
        }
    }
}