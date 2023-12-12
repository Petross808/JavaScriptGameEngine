import { EventSystem } from './EventSystem.js'
import { InputHandler } from './InputHandler.js'

export class Game
{
    isRunning = false;
    eventSystem = null;
    input = null;
    time = null;

    gameObjects = [];
    removedGameObjects = [];

    constructor()
    {
        this.eventSystem = new EventSystem();
        this.input = new InputHandler(this.eventSystem);
        this.time = new Time();

        this.Start();
    }

    GameLoop(currentTimeStamp)
    {
        if(!this.isRunning) return;

        this.time.SetDeltaTime(currentTimeStamp);
        this.Update();
        this.Render();

        requestAnimationFrame((currentTimeStamp) => this.GameLoop(currentTimeStamp));
    }

    Start()
    {
        for(const gameObject in this.gameObjects)
        {
            gameObject.InternalStart();
        }

        this.isRunning = true;
        requestAnimationFrame((currentTimeStamp) => this.GameLoop(currentTimeStamp));
    }

    Update()
    {
        for(const gameObject in this.gameObjects)
        {
            gameObject.InternalUpdate();
        }
        this.gameObjects = this.gameObjects.filter(gameObject => !this.removedGameObjects.includes(gameObject));
        this.removedGameObjects = [];
    }

    Render(context)
    {
        for(const gameObject in this.gameObjects)
        {
            gameObject.InternalRender(context);
        }
    }

    Instantiate(object)
    {
        object.game = game;
        this.gameObjects.push(object);
        object.InternalStart();
    }

    Destroy(object)
    {
        this.removedGameObjects.push(object);
        object.InternalOnDestroy();
    }
}