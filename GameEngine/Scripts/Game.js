
import { Platform } from '../../Game/Platform.js';
import { Camera } from './Camera.js';
import { EventSystem } from './EventSystem.js'
import { GameObject } from './GameObject.js';
import { Renderer } from './Renderer.js';
import { Vector2 } from './Structs/Vector2.js';
import { Time } from './Time.js'

export class Game
{
    static #instance = null;

    #isRunning = false;
    #eventSystem = null;
    #time = null;
    #renderer = null;
    #camera = null;

    #gameObjects = [];
    #removedGameObjects = [];

    get renderer() { return this.#renderer; }
    get camera() { return this.#camera; }
    set camera(value) { this.#camera = value; }

    constructor()
    {
        // Ensure single instance of Game
        if(Game.#instance == null)
        {
            Game.#instance = this;
        }
        else
        {
            return Game.#instance;
        }

        this.#eventSystem = new EventSystem();
        this.#time = new Time();
        this.#renderer = new Renderer("canvas");
        this.#camera = this.Instantiate(new Camera());

        console.log("GameEngine Initialized")
        this.Start();
    }

    GameLoop(currentTimeStamp)
    {
        if(!this.#isRunning) return;

        this.#time.SetDeltaTime(currentTimeStamp);
        this.Update();
        this.Render();

        requestAnimationFrame((currentTimeStamp) => this.GameLoop(currentTimeStamp));
    }

    Start()
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalStart();
        }
        console.log("GameObjects Initialized");
        this.#isRunning = true;
        console.log("GameLoop Begin")
        requestAnimationFrame((currentTimeStamp) => this.GameLoop(currentTimeStamp));
    }

    Update()
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalUpdate();
        }
        this.#camera.Update();
        this.#gameObjects = this.#gameObjects.filter(gameObject => !this.#removedGameObjects.includes(gameObject));
        this.#removedGameObjects = [];
    }

    Render()
    {
        this.#renderer.PrepareCanvas(this.#camera);
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalRender(this.#renderer.context);
        }
        this.#renderer.RestoreCanvas();
    }

    Instantiate(object, position = new Vector2(0, 0), rotation = new Vector2(1,0), scale = new Vector2(1,1), parent = null)
    {
        GameObject.IsGameObjectThrow(object);

        object.game = this;
        object.transform.position = position;
        object.transform.rotation = rotation;
        object.transform.scale = scale;
        object.transform.parent = parent;

        this.#gameObjects.push(object);
        object.InternalStart();

        return object;
    }

    Destroy(object)
    {
        GameObject.IsGameObjectThrow(object);
        this.#removedGameObjects.push(object);
        object.InternalOnDestroy();
    }
}