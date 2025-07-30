import { MenuActionType } from './menu/menu-action-type';
import { Color } from './common/color';

export interface IVector2 {
    x: number;
    y: number;
}

export interface IBallConfig {
    diameter: number;
    origin: IVector2;
    minVelocityLength: number;
    maxExpectedVelocity: number;
    maxExpectedCollisionForce: number;
}

export interface ITableConfig {
    cushionWidth: number;
    pocketRadius: number;
    pocketsPositions: IVector2[];
}

export interface IStickConfig {
    origin: IVector2;
    shotOrigin: IVector2;
    powerToAddPerFrame: number;
    movementPerFrame: number;
    maxPower: number;
    aimLineLength: number; // ADDED: This property is required for the aiming line feature
}

export interface IInputConfig {
    mouseSelectButton: number;
    mouseShootButton: number;
    mousePlaceBallButton: number;
    increaseShotPowerKey: number;
    decreaseShotPowerKey: number;
    toggleMenuKey: number;
}

export interface IAssetsConfig {
    basePath?: string;
    paths: {
        [key: string]: string;
    };
}

export interface ILabel {
    text: string;
    position: IVector2;
    font: string;
    color: string;
    alignment: string;
}

export interface ILabelsConfig {
    currentPlayer: ILabel;
    overalScores: ILabel[];
}

export interface IMatchScoreConfig {
    scoresPositions: IVector2[];
    unitMargin: number;
}

export interface IAIConfig {
    on: boolean;
    trainIterations: number;
    playerIndex: number;
    ballDistanceBonus: number;
    validTurnBonus: number;
    pocketedBallBonus: number;
    invalidTurnPenalty: number;
    gameWonBonus: number;
    gameLossPenalty: number;
    shotPowerMutationVariance: number;
    minShotPower: number;
}

export interface IPhysicsConfig {
    friction: number;
    collisionLoss: number;
}

export interface IMenuButton {
    action: MenuActionType;
    position: IVector2;
    sprite: string;
    spriteOnHover: string;
    value?: number;
    text?: string;
}

export interface IMenuConfig {
    labels: ILabel[];
    buttons: IMenuButton[];
    subMenus: IMenuConfig[];
}

export interface IGameConfig {
    gameSize: IVector2;
    soundOn: boolean;
    timeoutToHideStickAfterShot: number;
    timeoutToHideBallAfterPocket: number;
    loadingScreenTimeout: number;
    loadingScreenImagePosition: IVector2;
    timeoutToLoadSubMenu: number;
    labels: ILabelsConfig;
    redBallsPositions: IVector2[];
    yellowBallsPositions: IVector2[];
    cueBallPosition: IVector2;
    eightBallPosition: IVector2;
    matchScore: IMatchScoreConfig;
    sprites: IAssetsConfig;
    sounds: IAssetsConfig;
    physics: IPhysicsConfig;
    table: ITableConfig;
    ball: IBallConfig;
    stick: IStickConfig;
    input: IInputConfig;
    mainMenu: IMenuConfig;
    cursor: {
        default: string;
        button: string;
    };
    ai: IAIConfig;
}
