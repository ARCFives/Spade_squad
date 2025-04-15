import { Types } from 'phaser';
import { Preload } from '../menus/Preload';
import { LanguageMenu } from '../menus/LanguageMenu';
import { DevScreen } from '../menus/DevScreen';
import { MainMenu } from '../menus/MainMenu';
import { StoreMenu } from '../menus/StoreMenu';
import { ControlsMenu } from '../menus/ControlsMenu';
import { CreditsMenu } from '../menus/CreditsMenu';
import { Amazon } from '../scenes/Amazon';
import { PauseMenu } from '../menus/PauseMenu';
import { Gameover } from '../menus/Gameover';

export const scenesGame: Types.Scenes.SceneType[] = [Preload, LanguageMenu, DevScreen, MainMenu, StoreMenu, ControlsMenu, CreditsMenu ,Amazon, PauseMenu,  Gameover];