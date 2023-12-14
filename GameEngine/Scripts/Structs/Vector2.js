import { Mathf } from '../Mathf.js'

export class Vector2
{
    #x = 0;
    #y = 0;

    get x() { return this.#x; }
    get y() { return this.#y; }

    set x(value) { this.#x = value; }
    set y(value) { this.#y = value; }
    
    constructor(x, y)
    {
        this.#x = x;
        this.#y = y;
    }
    
    get asArray() 
    {
        return [this.x,this,y];
    }

    get magnitude()
    {
        return Mathf.GetHypotenuse(this.x,this.y);
    }

    get normalized()
    {
        return Vector2.NormalizeVector(this);
    }

    DistanceFrom(other)
    {
        Vector2.IsVectorThrow(other);
        return new Vector2(this.x-other.x, this.y-other.y).magnitude;
    }
    
    Scale(value)
    {
        this.x *= value;
        this.y *= value;
    }

    Add(vector)
    {
        Vector2.IsVectorThrow(vector);
        this.x += vector.x;
        this.y += vector.y;
    }

    Rotate(degrees)
    {
        const rotated = Vector2.RotateVector(degrees);
        this.x = rotated.x;
        this.y = rotated.y;
    }

    RotateTowards(other)
    {
        Vector2.IsVectorThrow(other);
        this.x = other.x - this.x;
        this.y = other.y - this.y;
    }

    Normalize()
    {
        const normalizedVector = Vector2.NormalizeVector(this);
        this.x = normalizedVector.x;
        this.y  = normalizedVector.y;
    }


    static IsVectorThrow(object)
    {
        if(!(object instanceof Vector2))
        {
            new Error("Object '" + object + "' is not a vector");
        }
    }

    static RotateVector(vector, degrees)
    {
        Vector2.IsVectorThrow(vector);
        let rad = degrees * Math.PI/180
        let rotationMatrix = [[Math.cos(rad),-1*Math.sin(rad)],[Math.sin(rad),Math.cos(rad)]];
        let currentRotation = [[vector.x],[vector.y]];
        let final = Mathf.MatrixMultiply(rotationMatrix, currentRotation);
        return new Vector2(final[0][0], final[1][0]);
    }

    static NormalizeVector(vector)
    {
        this.IsVectorThrow(vector);
        return new Vector2(vector.x / vector.magnitude, vector.y / vector.magnitude);
    }
}