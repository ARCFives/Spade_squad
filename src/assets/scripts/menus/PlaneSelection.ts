import { BaseMenu } from './base/Base_Menu';
import { IPlayerAircraftMenu } from 'assets/interfaces/IPlayerAircraftMenu';
import { IPlayerAircraftHidden } from 'assets/interfaces/IPlayerAircraftHidden';
import { IPlanesConfig } from 'assets/interfaces/IPlanesConfig';
import { TUCANO } from '../planes/tucano';
import { AMX } from '../planes/amx';
import { GRIPEN } from '../planes/gripen';
import {
  ISelectionMenuLanguage,
  ISelectionMenuText,
} from 'assets/interfaces/texts/ISelectionMenuText';
import {
  selectionMenuInfoText,
  selectionMenuStartInterativeText,
  selectionMenuStartText,
  selectionMenuTitleText,
} from 'assets/utils/textsConfig';

export class PlaneSelection extends BaseMenu {
  private playerAircraft!: IPlayerAircraftMenu;
  private playerAircraftHidden!: IPlayerAircraftHidden;
  private selectionTexts!: ISelectionMenuText;
  private aircrafts_database: IPlanesConfig[] = [TUCANO, AMX, GRIPEN];
  private currentIndex!: number;
  private current_aircraft!: IPlanesConfig;

  constructor() {
    super('plane_selection');
  }

  private addSprites() {
    this.playerAircraft = {
      aircraft_sprite: this.add.sprite(
        250,
        300,
        'aircrafts_menu',
        this.current_aircraft.menu_selection_sprite
      ),
      arrow_next_sprite: this.add
        .sprite(380, 300, 'arrow_next', 0)
        .setInteractive(),
      arrow_prev_sprite: this.add
        .sprite(120, 300, 'arrow_next', 0)
        .setInteractive()
        .setFlipX(true),
      aircraft_guns: this.add.sprite(
        600,
        270,
        'aircraft_info_bar',
        this.current_aircraft.menu_selection_weapons
      ),
      aircraft_fuel: this.add.sprite(
        600,
        310,
        'aircraft_info_bar',
        this.current_aircraft.menu_selection_fuel
      ),
      aircraft_speed: this.add.sprite(
        600,
        350,
        'aircraft_info_bar',
        this.current_aircraft.menu_selection_speed
      ),
      aircraft_name: this.add.text(
        this.current_aircraft.name_menu_x,
        200,
        this.current_aircraft.name,
        {
          fontFamily: 'fontStandard',
          fontSize: 20,
          align: 'center',
        }
      ),
    };
  }

  private addTexts() {
    const getLanguage: ISelectionMenuLanguage = this.checkLanguage(
      'selectionmenu'
    ) as ISelectionMenuLanguage;

    this.selectionTexts = {
      aircraft_fuel_text: this.add.text(
        430,
        300,
        getLanguage.fuel,
        selectionMenuInfoText
      ),
      aircraft_speed_text: this.add.text(
        430,
        340,
        getLanguage.speed,
        selectionMenuInfoText
      ),
      aircraft_weapons_text: this.add.text(
        430,
        260,
        getLanguage.weapons,
        selectionMenuInfoText
      ),
      plane_selection_title: this.add.text(
        225,
        100,
        getLanguage.title,
        selectionMenuTitleText
      ),
      start_mission: this.add
        .text(500, 450, getLanguage.start_mission, selectionMenuStartText)
        .setInteractive(),
    };
  }

  private startMission() {
    this.selectionTexts.start_mission.on('pointerup', () =>
      this.selectPlane(this.current_aircraft.id)
    );
    this.selectionTexts.start_mission.on('pointerover', () => {
      this.selectionTexts.start_mission.setStyle(
        selectionMenuStartInterativeText
      );
    });
    this.selectionTexts.start_mission.on('pointerout', () => {
      this.selectionTexts.start_mission.setColor('#fff');
    });
  }

  private nextAircraftSelection() {
    this.playerAircraft.arrow_next_sprite.on('pointerup', () => {
      if (this.currentIndex < 2) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.updateAircraftInfo();
    });
    this.playerAircraft.arrow_next_sprite.on('pointerover', () =>
      this.playerAircraft.arrow_next_sprite.setFrame(1)
    );
    this.playerAircraft.arrow_next_sprite.on('pointerout', () =>
      this.playerAircraft.arrow_next_sprite.setFrame(0)
    );
  }

  private prevAircraftSelection() {
    this.playerAircraft.arrow_prev_sprite.on('pointerup', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = 2;
      }
      this.updateAircraftInfo();
    });
    this.playerAircraft.arrow_prev_sprite.on('pointerover', () =>
      this.playerAircraft.arrow_prev_sprite.setFrame(1)
    );
    this.playerAircraft.arrow_prev_sprite.on('pointerout', () =>
      this.playerAircraft.arrow_prev_sprite.setFrame(0)
    );
  }

  private updateAircraftInfo() {
    this.sound.play('menuAudio');
    this.current_aircraft = this.aircrafts_database[this.currentIndex];
    if (this.currentIndex === 1 && !this.playerAircraftHidden.amx) {
      this.updateUnlockAndLock(false);
    } else if (this.currentIndex === 2 && !this.playerAircraftHidden.gripen) {
      this.updateUnlockAndLock(false);
    } else {
      this.updateUnlockAndLock(true);
    }
  }

  private updateUnlockAndLock(isHave: boolean) {
    if (isHave) {
      this.playerAircraft.aircraft_sprite.setFrame(
        this.current_aircraft.menu_selection_sprite
      );
      this.playerAircraft.aircraft_name
        .setText(this.current_aircraft.name)
        .setX(this.current_aircraft.name_menu_x);
      this.playerAircraft.aircraft_fuel.setFrame(
        this.current_aircraft.menu_selection_fuel
      );
      this.playerAircraft.aircraft_speed.setFrame(
        this.current_aircraft.menu_selection_speed
      );
      this.playerAircraft.aircraft_guns.setFrame(
        this.current_aircraft.menu_selection_weapons
      );
    } else {
      this.playerAircraft.aircraft_sprite.setFrame(3);
      this.playerAircraft.aircraft_name.setText('');
      this.playerAircraft.aircraft_fuel.setFrame(2);
      this.playerAircraft.aircraft_speed.setFrame(2);
      this.playerAircraft.aircraft_guns.setFrame(2);
    }
  }

  protected addButtons(): void {
    this.addSprites();
    this.nextAircraftSelection();
    this.prevAircraftSelection();
  }

  private selectPlane(plane: string) {
    if (plane === 'amx' && this.playerAircraftHidden.amx) {
      this.startGame(plane);
    } else if (plane === 'gripen' && this.playerAircraftHidden.gripen) {
      this.startGame(plane);
    } else if (plane === 'tucano') {
      this.startGame(plane);
    } else {
    }
  }

  private startGame(plane: string) {
    this.registry.set('playerAircraft', plane);
    this.time.delayedCall(
      500,
      () => {
        this.input.stopPropagation();
        this.scene.start('amazon');
        this.scene.stop('plane_selection');
      },
      undefined,
      this
    );
  }

  create(): void {
    this.currentIndex = 0;
    this.current_aircraft = TUCANO;
    this.playerAircraftHidden = JSON.parse(
      localStorage.getItem('spadePlayerAircraft') as string
    );
    this.add.tileSprite(400, 300, 800, 600, 'hangar');
    this.add.image(540, 300, 'aircraft_card');

    this.backButtonMainMenu();
    this.addButtons();
    this.addTexts();
    this.startMission();
  }
}
