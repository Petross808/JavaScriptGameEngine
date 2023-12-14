import { EventSystem } from './EventSystem.js'
import { GameObject } from './GameObject.js';
import { Time } from './Time.js'

export class Game
{
    static #instance = null;

    #isRunning = false;
    #eventSystem = null;
    #time = null;

    #gameObjects = [];
    #removedGameObjects = [];

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
        this.#gameObjects = this.#gameObjects.filter(gameObject => !this.#removedGameObjects.includes(gameObject));
        this.#removedGameObjects = [];
    }

    Render(context)
    {
        for(const gameObject of this.#gameObjects)
        {
            gameObject.InternalRender(context);
        }
    }

    Instantiate(object)
    {
        GameObject.IsGameObjectThrow(object);
        object.game = this;
        this.#gameObjects.push(object);
        object.InternalStart();
    }

    Destroy(object)
    {
        GameObject.IsGameObjectThrow(object);
        this.#removedGameObjects.push(object);
        object.InternalOnDestroy();
    }
}