export class InputHandler
{
    keyBinds = {
        up: "w",
        down: "s",
        left: "a",
        right: "d"
    };

    

    constructor(eventSystem)
    {
        if(InputHandler.instance != null)
        {
            delete InputHandler.instance;
        }

        InputHandler.instance = this;

        addEventListener("keydown", event => {
            Reflect.ownKeys(this.keyBinds).forEach((direction) => {
                if(Reflect.get(this.keyBinds, direction) === event.key)
                {
                    if(Reflect.has(eventSystem.keyPressed, direction))
                    {
                        dispatchEvent(Reflect.get(eventSystem.keyPressed, direction));
                    }
                }
            });
        });

        addEventListener("keyup", event => {
            Reflect.ownKeys(this.keyBinds).forEach((direction) => {
                if(Reflect.get(this.keyBinds, direction) === event.key)
                {
                    if(Reflect.has(eventSystem.keyReleased, direction))
                    {
                        dispatchEvent(Reflect.get(eventSystem.keyReleased, direction));
                    }
                }
            });
        });
    }
}