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
    
    static get deltaTime() {
        return this.#deltaTime;
    }

    // Update deltaTime (Called in the main GameLoop)
    #lastTimeStamp = 0;
    SetDeltaTime(currentTimeStamp)
    {
        Time.#deltaTime = currentTimeStamp - this.#lastTimeStamp;
        this.#lastTimeStamp = currentTimeStamp;
    }
}