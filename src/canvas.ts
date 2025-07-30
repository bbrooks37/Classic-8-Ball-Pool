import { IVector2 } from './game.config.type';
import { GameConfig } from './game.config';
import { Vector2 } from './geom/vector2';

class Canvas2D_Singleton {

    //------Members------//

    private _canvasContainer: HTMLElement;
    private _canvas : HTMLCanvasElement;
    private _context : CanvasRenderingContext2D;
    private _scale: Vector2;
    private _offset: Vector2;

    //------Properties------//

    public get scaleX() {
        return this._scale.x;
    }

    public get scaleY() {
        return this._scale.y;
    }

    public get offsetX() {
        return this._offset.x;
    }

    public get offsetY() {
        return this._offset.y;
    }

    //------Constructor------//

    constructor(canvas : HTMLCanvasElement, canvasContainer: HTMLElement) {
        this._canvasContainer = canvasContainer;
        this._canvas = canvas;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D; // Added type assertion for safety
        this.resizeCanvas();
    }

    //------Public Methods------//

    public resizeCanvas(): void {

        const originalCanvasWidth = GameConfig.gameSize.x;
        const originalCanvasHeight = GameConfig.gameSize.y;
        const widthToHeight: number = originalCanvasWidth / originalCanvasHeight;

        let newHeight: number = window.innerHeight;
        let newWidth: number = window.innerWidth;

        const newWidthToHeight: number = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        this._canvasContainer.style.width = newWidth + 'px';
        this._canvasContainer.style.height = newHeight + 'px';
        this._canvasContainer.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
        this._canvasContainer.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
        this._canvasContainer.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
        this._canvasContainer.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';
        this._scale = new Vector2(newWidth / originalCanvasWidth, newHeight / originalCanvasHeight);

        this._canvas.width = newWidth;
        this._canvas.height = newHeight;

        if (this._canvas.offsetParent) {
            this._offset = new Vector2(this._canvas.offsetLeft, this._canvas.offsetTop);
        }
    }


    public clear() : void {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public drawImage(
            sprite: HTMLImageElement,
            position: IVector2 = { x: 0, y: 0 },
            rotation: number = 0,
            origin: IVector2 = { x: 0, y: 0 }
        ) {
        this._context.save();
        this._context.scale(this._scale.x, this._scale.y);
        this._context.translate(position.x, position.y);
        this._context.rotate(rotation);
        this._context.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
        this._context.restore();
    }

    /**
     * Draws text on the canvas with specified properties.
     * @param text The text string to draw.
     * @param font The font style (e.g., "20px Arial").
     * @param color The text color.
     * @param position The {x, y} coordinates for the text.
     * @param textAlign Horizontal text alignment ('start', 'end', 'left', 'right', 'center').
     * @param textBaseline Vertical text alignment ('top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom').
     */
    public drawText(
        text: string,
        font:string,
        color: string,
        position: IVector2,
        textAlign: string = 'left',
        textBaseline: string = 'alphabetic' // Added textBaseline parameter
    ): void {
        this._context.save();
        this._context.scale(this._scale.x, this._scale.y);
        this._context.fillStyle = color;
        this._context.font = font;
        this._context.textAlign = textAlign as CanvasTextAlign;
        this._context.textBaseline = textBaseline as CanvasTextBaseline; // Set textBaseline
        this._context.fillText(text, position.x, position.y);
        this._context.restore();
    }

    /**
     * Draws a dotted line on the canvas.
     * @param startPoint The starting {x, y} coordinates of the line.
     * @param endPoint The ending {x, y} coordinates of the line.
     * @param color The color of the line.
     * @param lineWidth The width of the line.
     * @param dashPattern An array specifying the line and gap lengths (e.g., [5, 5] for 5px line, 5px gap).
     */
    public drawDottedLine(
        startPoint: Vector2,
        endPoint: Vector2,
        color: string = "white",
        lineWidth: number = 2,
        dashPattern: number[] = [5, 5]
    ): void {
        this._context.save();
        this._context.beginPath();

        // Apply scaling to the coordinates
        const transformedStart = new Vector2(startPoint.x * this._scale.x, startPoint.y * this._scale.y);
        const transformedEnd = new Vector2(endPoint.x * this._scale.x, endPoint.y * this._scale.y);

        this._context.moveTo(transformedStart.x, transformedStart.y);
        this._context.lineTo(transformedEnd.x, transformedEnd.y);

        this._context.strokeStyle = color;
        this._context.lineWidth = lineWidth;
        this._context.setLineDash(dashPattern); // Set the dotted/dashed pattern

        this._context.stroke();
        this._context.restore();
        this._context.setLineDash([]); // Reset line dash to solid for subsequent drawings
    }

    public changeCursor(cursor: string): void {
        this._canvas.style.cursor = cursor;
    }
}

const canvas : HTMLCanvasElement = document.getElementById('screen') as HTMLCanvasElement;
const container : HTMLElement = document.getElementById('gameArea') as HTMLElement;
export const Canvas2D = new Canvas2D_Singleton(canvas, container);

window.addEventListener('resize', Canvas2D.resizeCanvas.bind(Canvas2D));
