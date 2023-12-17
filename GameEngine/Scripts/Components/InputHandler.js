import { Component } from '../Component.js';

export class InputHandler extends Component
{
    #keyBinds = {key: []};

    get keyBinds() { return this.#keyBinds; }

    // Register event listeners for keyup and keydown
    Start()
    {
        document.addEventListener("keydown", (key) => this.KeyPressed(key));
        document.addEventListener("keyup", (key) => this.KeyReleased(key));
    }

    // save an action on press and on release to the specified key code in the #keyBinds object
    BindKey(key, target, actionOnPress = ()=>{}, actionOnRelease = ()=>{}) 
    {
        if(!Reflect.has(this.#keyBinds, key))
        {
            Reflect.set(this.#keyBinds, key, []);
        }

        Reflect.get(this.#keyBinds, key).push({thisObject: target, onPress: actionOnPress, onRelease: actionOnRelease});
    }

    // remove all actions bound to a key
    UnbindKey(key)
    {
        Reflect.deleteProperty(this.#keyBinds, key);
    }

    // Call the onPress action bound to the key
    KeyPressed(key)
    {
        //console.log(key.code);
        if(Reflect.has(this.keyBinds, key.code))
        {
            for(let bind of Reflect.get(this.keyBinds, key.code))
            {
                Reflect.apply(bind.onPress, bind.thisObject, []);
            }
        }
    }

    // Call the onRelease action bound to the key
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