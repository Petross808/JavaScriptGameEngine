export class InputHandler extends Component
{
    #keyBinds = {};

    Start()
    {
        document.addEventListener("keydown", this.KeyPressed);
        document.addEventListener("keyup", this.KeyReleased);
    }

    BindKey(key, actionOnPress = ()=>{}, actionOnRelease = ()=>{}) 
    {
        if(Reflect.get(this.#keyBinds.onPress, key) === undefined)
        {
            Reflect.set(this.#keyBinds, key, []);
        }

        Reflect.get(this.#keyBinds, key).push({onPress: actionOnPress, onRelease: actionOnRelease});
    }

    UnbindKey()
    {
        Reflect.set(this.#keyBinds, key, undefined);
    }

    KeyPressed(key)
    {
        if((action = Reflect.get(this.#keyBinds,key.code)) != undefined)
        {
            Reflect.apply(action.onPress);
        }
    }

    KeyReleased(key)
    {
        if((action = Reflect.get(this.#keyBinds,key.code)) != undefined)
        {
            Reflect.apply(action.onRelease);
        }
    }

    OnDestroy()
    {
        document.removeEventListener("keydown", this.KeyPressed);
        document.removeEventListener("keyup", this.KeyReleased);
    }
}