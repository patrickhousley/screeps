module Screeps {
  export class StructureType {
    value: string;

    constructor(value: string) {
      this.value = value;
    }

    toString() {
      return this.value;
    }

    static STRUCTURE_EXTENSION = new StructureType('extension');
    static STRUCTURE_RAMPART = new StructureType('rampart');
    static STRUCTURE_ROAD = new StructureType('road');
    static STRUCTURE_SPAWN = new StructureType('spawn');
    static STRUCTURE_LINK = new StructureType('link');
    static STRUCTURE_WALL = new StructureType('constructedWall');
    static STRUCTURE_KEEPER_LAIR = new StructureType('keeperLair');
    static STRUCTURE_CONTROLLER = new StructureType('controller');
    static STRUCTURE_STORAGE = new StructureType('storage');
    static STRUCTURE_TOWER = new StructureType('tower');
    static STRUCTURE_OBSERVER = new StructureType('observer');
    static STRUCTURE_POWER_BANK = new StructureType('powerBank');
    static STRUCTURE_POWER_SPAWN = new StructureType('powerSpawn');
  }
}
