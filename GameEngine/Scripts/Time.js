export class Time
{
    // Ensure single instance of Time
    static #instance = null;
    constructor()
    {
        if(Time.#instance == null)
        {
            Time.#instance = this;
        }
        else
        {
            return Time.#instance;
        }

    }

    static #deltaTime = 0;
    static #scale = 1;
    
    static get deltaTime() { return this.#deltaTime * this.#scale; }
    static get scale() { return this.#scale; }

    static set scale(value) { this.#scale = value; }

    // Calculate deltaTime from the time since the previous tick (Called in the main GameLoop)
    #lastTimeStamp = 0;
    SetDeltaTime(currentTimeStamp)
    {
        Time.#deltaTime = (currentTimeStamp - this.#lastTimeStamp) * 0.001;
        this.#lastTimeStamp = currentTimeStamp;
    }
}