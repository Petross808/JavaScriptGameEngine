export class Mathf
{
    constructor()
    {
        throw new Error("Class 'Mathf' is not instantiable");
    }

    static DotProduct(vectorA, vectorB)
    {
        return vectorA.map((a,i)=> a * vectorB[i]).reduce((sum, next) => sum + next);
    }

    static TranslateMatrix(matrix)
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

    static MatrixMultiply(matrixA, matrixB)
    {
        const a = matrixA;
        const b = this.TranslateMatrix(matrixB);
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

    static GetHypotenuse(x,y)
    {
        return Math.sqrt(this.DotProduct([x,y],[x,y]));
    }
}