module Screeps {
  export enum ResultCode {
    'OK' = 0,
    'ERR_NOT_OWNER' = -1,
    'ERR_NO_PATH' = -2,
    'ERR_NAME_EXISTS' = -3,
    'ERR_BUSY' = -4,
    'ERR_NOT_FOUND' = -5,
    'ERR_NOT_ENOUGH_RESOURCES' = -6,
    'ERR_INVALID_TARGET' = -7,
    'ERR_FULL' = -8,
    'ERR_NOT_IN_RANGE' = -9,
    'ERR_INVALID_ARGS' = -10,
    'ERR_TIRED' = -11,
    'ERR_NO_BODYPART' = -12,
    'ERR_NOT_ENOUGH_EXTENSIONS' = -6,
    'ERR_RCL_NOT_ENOUGH' = -14,
    'ERR_GCL_NOT_ENOUGH' = -15
  }
  
  export enum RoomFind {
    'FIND_EXIT_TOP' = 1,
    'FIND_EXIT_RIGHT' = 3,
    'FIND_EXIT_BOTTOM' = 5,
    'FIND_EXIT_LEFT' = 7,
    'FIND_EXIT' = 10,
    'FIND_CREEPS' = 101,
    'FIND_MY_CREEPS' = 102,
    'FIND_HOSTILE_CREEPS' = 103,
    'FIND_SOURCES_ACTIVE' = 104,
    'FIND_SOURCES' = 105,
    'FIND_DROPPED_RESOURCES' = 106,
    'FIND_STRUCTURES' = 107,
    'FIND_MY_STRUCTURES' = 108,
    'FIND_HOSTILE_STRUCTURES' = 109,
    'FIND_FLAGS' = 110,
    'FIND_CONSTRUCTION_SITES' = 111,
    'FIND_MY_CONSTRUCTION_SITES' = 114,
    'FIND_HOSTILE_CONSTRUCTION_SITES' = 115,
    'FIND_MY_SPAWNS' = 112,
    'FIND_HOSTILE_SPAWNS' = 113
  }
  
  export enum Direction {
    'TOP' = 1,
    'TOP_RIGHT' = 2,
    'RIGHT' = 3,
    'BOTTOM_RIGHT' = 4,
    'BOTTOM' = 5,
    'BOTTOM_LEFT' = 6,
    'LEFT' = 7,
    'TOP_LEFT' = 8
  }
  
  export class BodyPart {
    type: string;
    cost: number;
    hits: number;

    constructor(type: string, cost: number) {
      this.type = type;
      this.cost = cost;
      this.hits = 100; // I think this is the default for all body part.
    }

    toString(): string {
      return this.type;
    }
    
    /**
     * Moves a creep 1 square per tick per 1 other body part.
     * Cost: 50
     */
    static MOVE = new BodyPart('move', 50);
    
    /**
     * Harvests 2 energy units from a source per tick.
     * Builds a structure for 5 energy units per tick.
     * Repairs a structure for 100 hits per tick consuming 1 energy unit per tick.
     * Dismantles a structure for 100 hits per tick returning 0.5 energy unit per tick.
     * Upgrades a controller for 1 energy unit per tick.
     * Cost: 100
     */
    static WORK = new BodyPart('work', 100);
    
    /**
     * Can contain up to 50 resource units.
     * Cost: 50
     */
    static CARRY = new BodyPart('carry', 50);
    
    /**
     * Attacks another creep/structure with 30 hits per tick in a short-ranged attack.
     * Cost: 80
     */
    static ATTACK = new BodyPart('attack', 80);
    
    /**
     * Attacks another single creep/structure with 10 hits per tick in a long-range attack up to 3 squares long.
     * Attacks all hostile creeps/structures within 3 squares range with 1-4-10 hits (depending on the range).
     * Cost: 150
     */
    static RANGED_ATTACK = new BodyPart('ranged_attack', 150);
    
    /**
     * No effect, just additional hit points to the creep's body.
     * Cost: 10
     */
    static TOUGH = new BodyPart('tough', 10);
    
    /**
     * Heals self or another creep restoring 12 hits per tick in short range or 4 hits per tick at a distance.
     * Cost: 250
     */
    static HEAL = new BodyPart('heal', 250);
    
    /**
     * Claims a neutral room controller.
     * Reserves a neutral room controller for 1 tick per body part.
     * Attacks a hostile room controller downgrade or reservation timer with 1 tick per 5 body parts.
     * A creep with this body part will have a reduced life time of 500 ticks and cannot be renewed.
     * Cost: 600
     */
    static CLAIM = new BodyPart('claim', 600);
  }
  
  export class StructureType {
    value: string;

    constructor(value: string) {
      this.value = value;
    }

    toString(): string {
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
  
  export class Color {
    value: string;

    constructor(value: string) {
      this.value = value;
    }

    toString(): string {
      return this.value;
    }

    static COLOR_RED = new StructureType('red');
    static COLOR_PURPLE = new StructureType('purple');
    static COLOR_BLUE = new StructureType('blue');
    static COLOR_CYAN = new StructureType('cyan');
    static COLOR_GREEN = new StructureType('green');
    static COLOR_YELLOW = new StructureType('yellow');
    static COLOR_ORANGE = new StructureType('orange');
    static COLOR_BROWN = new StructureType('brown');
    static COLOR_GREY = new StructureType('grey');
    static COLOR_WHITE = new StructureType('white');
  }
  
  export class RoomMode {
    value: string;

    constructor(value: string) {
      this.value = value;
    }

    toString(): string {
      return this.value;
    }

    static MODE_SIMULATION = new RoomMode('simulation');
    static MODE_WORLD = new RoomMode('world');
  }
  
  export class ResourceType {
    value: string;

    constructor(value: string) {
      this.value = value;
    }

    toString(): string {
      return this.value;
    }

    static RESOURCE_ENERGY = new ResourceType('energy');
    static RESOURCE_POWER = new ResourceType('power');
  }
}
