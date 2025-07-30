import { IVector2, IAssetsConfig } from './../game.config.type'; // Removed ICursorConfig
import { IMenuCommand } from './commands/menu-command';
import { Assets } from '../assets';
import { Canvas2D } from '../canvas';
import { Mouse } from '../input/mouse';
import { GameConfig } from '../game.config'; // Import GameConfig to access cursorConfig
import { Vector2 } from '../geom/vector2'; // Ensure Vector2 is imported

//------Configurations------//

const cursorConfig = GameConfig.cursor; // Access cursorConfig directly from GameConfig
const sprites: IAssetsConfig = GameConfig.sprites;

export class MenuButton {

    //------Members------//

    private _sprite: HTMLImageElement;
    private _spriteOnHover: HTMLImageElement;
    private _hovered: boolean;

    //------Constructor------//

    constructor(
        private _action: IMenuCommand,
        private _value: any,
        private _position: IVector2,
        sprite: string,
        spriteOnHover: string,
    ) {
        this._sprite = Assets.getSprite(sprites.paths[sprite]);
        this._spriteOnHover = Assets.getSprite(sprites.paths[spriteOnHover]);
    }

    //------Private Methods------//

    private isHovered(): boolean {
        const mouseX = Mouse.position.x;
        const mouseY = Mouse.position.y;
        const buttonX = this._position.x - this._sprite.width / 2;
        const buttonY = this._position.y - this._sprite.height / 2;
        const buttonWidth = this._sprite.width;
        const buttonHeight = this._sprite.height;

        return mouseX >= buttonX &&
               mouseX <= buttonX + buttonWidth &&
               mouseY >= buttonY &&
               mouseY <= buttonY + buttonHeight;
    }

    //------Public Methods------//

    public update(): void {
        const prevHovered = this._hovered;
        this._hovered = this.isHovered();

        if (this._hovered) {
            Canvas2D.changeCursor(cursorConfig.button);
            if (Mouse.isPressed(GameConfig.input.mouseSelectButton)) {
                this._action.execute(this._value);
            }
        } else if (prevHovered) {
            Canvas2D.changeCursor(cursorConfig.default);
        }
    }

    public draw(): void {
        const spriteToDraw = this._hovered ? this._spriteOnHover : this._sprite;
        Canvas2D.drawImage(spriteToDraw, this._position, 0, new Vector2(this._sprite.width / 2, this._sprite.height / 2));
    }
}
