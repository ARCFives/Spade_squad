export interface IUpgrades {
  engineLvI: boolean;
  engineLvII: boolean;
  missileI: boolean;
  missileII: boolean;
  mainGunI: boolean;
  airfuelling: boolean;
}

export interface IUpgradesUpdate {
  engineLvI?: boolean;
  engineLvII?: boolean;
  missileI?: boolean;
  missileII?: boolean;
  mainGunI?: boolean;
  airfuelling?: boolean;
  amx?: boolean;
  gripen?: boolean;
}
