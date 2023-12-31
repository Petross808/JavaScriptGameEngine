import { Mathf } from '../Mathf.js'
import { Time } from '../Time.js';

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

    get timeScaled()
    {
        return new Vector2(this.x * Time.deltaTime, this.y * Time.deltaTime);
    }

    get negative()
    {
        return new Vector2(this.x * -1, this.y * -1);
    }

    Set(x,y)
    {
        this.x = x;
        this.y = y;
        return this;
    }

    // Get the distance between this and another vector
    DistanceFrom(other)
    {
        Vector2.IsVectorThrow(other);
        return Vector2.Add(this, other.negative).magnitude;
    }
    
    Scale(value)
    {
        this.x *= value;
        this.y *= value;
        return this;
    }

    Add(vector)
    {
        Vector2.IsVectorThrow(vector);
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    // Rotate this vector around origin by degrees
    Rotate(degrees)
    {
        const rot = Vector2.RotateVector(this, degrees)
        this.Set(rot.x,rot.y);
        return this;
    }

    Normalize()
    {
        const normalizedVector = Vector2.NormalizeVector(this);
        this.x = normalizedVector.x;
        this.y  = normalizedVector.y;
        return this;
    }

    Copy()
    {
        return new Vector2(this.x, this.y);
    }

    // Check if objecct is a Vector2 object otherwise throw an error
    static IsVectorThrow(object)
    {
        if(!(object instanceof Vector2))
        {
            new Error("Object '" + object + "' is not a vector");
        }
    }

    static Add(vectorA, vectorB)
    {
        return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y);   
    }

    static Scale(vector, scale)
    {
        return new Vector2(vector.x * scale, vector.y * scale);
    }

    static Multiply(vectorA, vectorB)
    {
        return new Vector2(vectorA.x*vectorB.x, vectorA.y*vectorB.y);
    }

    // Get a new Vector2 rotated around origin by degrees from vector
    static RotateVector(vector, degrees)
    {
        Vector2.IsVectorThrow(vector);
        let rad = degrees * Math.PI/180;
        let rotationMatrix = [[Math.cos(rad),-1*Math.sin(rad)],[Math.sin(rad),Math.cos(rad)]];
        let currentRotation = [[vector.x],[vector.y]];
        let final = Mathf.MatrixMultiply(rotationMatrix, currentRotation);
        return new Vector2(final[0][0], final[1][0]);
    }

    // Get a new normalized Vector2 from vector
    static NormalizeVector(vector)
    {
        this.IsVectorThrow(vector);
        if(vector.magnitude === 0) return new Vector2(0,0);
        else return new Vector2(vector.x / vector.magnitude, vector.y / vector.magnitude);
    }
}