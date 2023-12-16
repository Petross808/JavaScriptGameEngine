import { Component } from '../Component.js';

export class InputHandler extends Component
{
    #keyBinds = {key: []};

    get keyBinds() { return this.#keyBinds; }

    Start()
    {
        document.addEventListener("keydown", (key) => this.KeyPressed(key));
        document.addEventListener("keyup", (key) => this.KeyReleased(key));
    }

    BindKey(key, target, actionOnPress = ()=>{}, actionOnRelease = ()=>{}) 
    {
        if(!Reflect.has(this.#keyBinds, key))
        {
            Reflect.set(this.#keyBinds, key, []);
        }

        Reflect.get(this.#keyBinds, key).push({thisObject: target, onPress: actionOnPress, onRelease: actionOnRelease});
    }

    UnbindKey()
    {
        Reflect.set(this.#keyBinds, key, undefined);
    }

    KeyPressed(key)
    {
        if(Reflect.has(this.keyBinds, key.code))
        {
            for(let bind of Reflect.get(this.keyBinds, key.code))
            {
                Reflect.apply(bind.onPress, bind.thisObject, []);
            }
        }
    }

    KeyReleased(key)
    {
        if(Reflect.has(this.keyBinds, key.code))
        {
            for(let bind of Reflect.get(this.keyBinds, key.code))
            {
                Reflect.apply(bind.onRelease, bind.thisObject, []);
            }
        }
    }
}