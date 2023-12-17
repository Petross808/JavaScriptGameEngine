export class Mathf
{
    constructor()
    {
        throw new Error("Class 'Mathf' is not instantiable");
    }

    // Get dot product of two vectors in array form
    static DotProduct(vectorA, vectorB)
    {
        return vectorA.map((a,i)=> a * vectorB[i]).reduce((sum, next) => sum + next);
    }

    // Transpose Matrix in array form
    static TransposeMatrix(matrix)
    {
        let output = [];
        for(let row = 0; row < matrix.length; row++)
        {
            for(let col = 0; col < matrix[row].length; col++)
            {
                if(output[col] == undefined)
                {
                    output[col] = [];
                }
                output[col][row] = matrix[row][col];
            }
        }
        return output;
    }

    // Multiply two matrices in array form
    static MatrixMultiply(matrixA, matrixB)
    {
        const a = matrixA;
        const b = this.TransposeMatrix(matrixB);
        let output = [];
        for(let x = 0; x < a.length; x++)
        {
            for(let y = 0; y < b.length; y++)
            {
                if(output[x] == undefined)
                {
                    output[x] = [];
                }
                output[x][y] = this.DotProduct(a[x],b[y])
            }
        }
        return output;
    }

    // Get hypotenuse of a triangle (Pythogoras theorem)
    static GetHypotenuse(x,y)
    {
        return Math.sqrt(this.DotProduct([x,y],[x,y]));
    }
}