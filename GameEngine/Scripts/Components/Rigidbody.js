import { Vector2 } from '../Structs/Vector2.js';
import { Time } from '../Time.js';

export class Rigidbody extends Component 
{
    static #gravity = Vector2(0, -10);
    static get gravity() { return this.#gravity; }

    #velocity = Vector2(0, 0);
    #acceleration = Vector2(0, 0);
    #drag = 1;
    #gravityMulitplier = 1;

    get velocity() { return this.#velocity; }
    get acceleration() { return this.#acceleration; }
    get drag() { return this.#drag; }
    get gravityMultiplier() { return this.#gravityMulitplier; }
    get localGravity() { return Vector2.Scale(this.gravity, this.#gravityMulitplier); }

    set drag(value) { this.#drag = value; }
    set gravityMultiplier(value) { this.#gravityMulitplier = value; }

    Start() {}

    Update() 
    {
        // Apply acceleration and gravity to speed
        this.#velocity.Add(Vector2.Add(this.#acceleration, this.localGravity).timeScaled);
        // Apply speed to the object
        this.gameObject.transform.position.Add(this.#velocity.timeScaled);
        
        // Apply drag to the speed
        if(this.#velocity.magnitude > 0)
        {
            this.#velocity.Scale(1 - (this.#drag * Time.deltaTime));
            // Make speed zero if it's close to zero
            if(this.#velocity.magnitude < 0.1)
            {
                this.#velocity.Set(0, 0);
            }
        }
    }

    OnDestroy()


}