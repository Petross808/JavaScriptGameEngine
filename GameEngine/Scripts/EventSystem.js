export class EventSystem
{
    // Ensure single instance of EventSystem
    static #instance = null;
    constructor()
    {
        if(EventSystem.#instance == null)
        {
            EventSystem.#instance = this;
        }
        else
        {
            return EventSystem.#instance;
        }
    }

    static events = {};
}