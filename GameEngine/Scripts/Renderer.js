export class Renderer
{
    #canvas;
    #context;

    get context() { return this.#context; }

    constructor(canvasID)
    {
        this.#canvas = document.getElementById(canvasID);
        this.#context = this.#canvas.getContext("2d");
        this.ResizeCanvas();
        window.addEventListener("resize", () => this.ResizeCanvas());
    }

    ResizeCanvas()
    {
        this.#canvas.width = window.innerWidth - 50;
        this.#canvas.height = window.innerHeight - 50;
    }

    PrepareCanvas(camera) 
    {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.save();
        this.#context.translate(-camera.x, -camera.y);
    }

    RestoreCanvas()
    {
        this.ctx.restore();
    }
}