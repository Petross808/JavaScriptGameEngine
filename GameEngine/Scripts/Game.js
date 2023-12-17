
import { Wall } from '../../Game/Wall.js';
import { Camera } from './Camera.js';
import { Rigidbody } from './Components/Rigidbody.js';
import { GameObject } from './GameObject.js';
import { Renderer } from './Renderer.js';
import { Scene } from './Scene.js';
import { Vector2 } from './Structs/Vector2.js';
import { Time } from './Time.js'

export class Game
{
    static #instance = null;

    #isRunning = false;
    #time = null;
    #renderer = null;
    #camera = null;
    #currentScene = null;

    get renderer() { return this.#renderer; }
    get camera() { return this.#camera; }
    get currentScene() { return this.#currentScene; }

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

        this.#time = new Time();
        // Set initial deltaTime before game starts 
        requestAnimationFrame((currentTimeStamp) => this.#time.SetDeltaTime(currentTimeStamp));
        this.#renderer = new Renderer("canvas");
        this.#currentScene = new Scene(this);
        this.#camera = this.Instantiate(new Camera());


        console.log("GameEngine Initialized")
        this.Start();
    }

    // Every tick, update deltaTime to the time since the last tick, then Update, evaluate physics and Render
    GameLoop(currentTimeStamp)
    {
        if(!this.#isRunning) return;

        this.#time.SetDeltaTime(currentTimeStamp);
        this.Update();
        Rigidbody.CheckCollisions();
        this.Render();

        requestAnimationFrame((currentTimeStamp) => this.GameLoop(currentTimeStamp));
    }

    // Call start on the currentScene, set running to true and start the GameLoop
    Start()
    {
        this.#currentScene.InternalStart();
        this.#isRunning = true;
        console.log("GameLoop Begin")
        requestAnimationFrame((currentTimeStamp) => this.GameLoop(currentTimeStamp));
    }

    // Update the currect scene and the camera, if it exists
    Update()
    {
        this.currentScene.InternalUpdate();
        this.#camera?.Update();
    }

    // Prepare canvas, render the currect scene, then LateRender the current scene and restore canvas
    Render()
    {
        this.#renderer.PrepareCanvas(this.#camera);
        this.#currentScene.InternalRender(this.#renderer.context);
        this.#currentScene.InternalLateRender(this.#renderer.context)
        this.#renderer.RestoreCanvas();
    }

    // Add GameObject object to the current scene with the specified properties
    Instantiate(object, position = new Vector2(0, 0), rotation = new Vector2(1,0), scale = new Vector2(1,1), parent = null)
    {
        GameObject.IsGameObjectThrow(object);

        object.game = this;
        object.transform.position = position;
        object.transform.rotation = rotation;
        object.transform.scale = scale;
        object.transform.parent = parent;

        this.#currentScene.gameObjects.push(object);
        object.InternalStart();

        return object;
    }

    // Remove GameObject object from the current scene
    Destroy(object)
    {
        GameObject.IsGameObjectThrow(object);
        this.#currentScene.removedGameObjects.push(object);
        object.InternalOnDestroy();
    }

    // Destroy current scene and load a new one
    LoadScene(scene)
    {
        Scene.IsSceneThrow(scene);

        this.#currentScene.InternalOnDestroy();
        this.#currentScene = scene;
        this.#currentScene.game = this;
        this.#currentScene.InternalStart();
    }
}