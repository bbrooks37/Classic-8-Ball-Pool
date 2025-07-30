// File: src/menu/menu-label.ts

import { IVector2, ILabel } from './../game.config.type'; // Ensure ILabel is imported
import { Canvas2D } from '../canvas';
import { Vector2 } from '../geom/vector2'; // This might not be needed if not used directly in MenuLabel

export class MenuLabel {
    private _text: string;
    private _position: IVector2;
    private _font: string;
    private _color: string;
    private _textAlign: CanvasTextAlign;    // Explicitly type as CanvasTextAlign
    private _textBaseline: CanvasTextBaseline; // Explicitly type as CanvasTextBaseline

    // MODIFIED CONSTRUCTOR:
    constructor(label: ILabel) { // Accept the full ILabel object
        this._text = label.text;
        this._position = label.position;
        this._font = label.font;
        this._color = label.color;

        // Logic to determine textAlign and textBaseline based on the 'alignment' from config
        if (label.alignment === 'top' || label.alignment === 'middle' || label.alignment === 'bottom') {
            this._textBaseline = label.alignment as CanvasTextBaseline;
            this._textAlign = 'center'; // Default horizontal alignment if baseline is specified
        } else {
            this._textAlign = (label.alignment || 'left') as CanvasTextAlign; // Use provided alignment or default to 'left'
            this._textBaseline = 'alphabetic'; // Default vertical alignment
        }
    }

    // MODIFIED draw METHOD:
    public draw(): void {
        Canvas2D.drawText(
            this._text,
            this._font,
            this._color,
            this._position,
            this._textAlign,    // Pass the determined textAlign
            this._textBaseline   // Pass the determined textBaseline
        );
    }
}