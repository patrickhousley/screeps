module Screeps {

  export class Constants {

    public static get OK():number {
      return 0;
    }

    public static get ERR_NOT_OWNER():number {
      return -1;
    }

    public static get ERR_NO_PATH():number {
      return -2;
    }

    public static get ERR_NAME_EXISTS():number {
      return -3;
    }

    public static get ERR_BUSY():number {
      return -4;
    }

    public static get ERR_NOT_FOUND():number {
      return -5;
    }

    public static get ERR_NOT_ENOUGH_ENERGY():number {
      return -6;
    }

    public static get ERR_NOT_ENOUGH_RESOURCES():number {
      return -6;
    }

    public static get ERR_INVALID_TARGET():number {
      return -7;
    }

    public static get ERR_FULL():number {
      return -8;
    }

    public static get ERR_NOT_IN_RANGE():number {
      return -9;
    }

    public static get ERR_INVALID_ARGS():number {
      return -10;
    }

    public static get ERR_TIRED():number {
      return -11;
    }

    public static get ERR_NO_BODYPART():number {
      return -12;
    }

    public static get ERR_NOT_ENOUGH_EXTENSIONS():number {
      return -6;
    }

    public static get ERR_RCL_NOT_ENOUGH():number {
      return -14;
    }

    public static get ERR_GCL_NOT_ENOUGH():number {
      return -15;
    }

    public static get FIND_EXIT_TOP():number {
      return 1;
    }

    public static get FIND_EXIT_RIGHT():number {
      return 3;
    }

    public static get FIND_EXIT_BOTTOM():number {
      return 5;
    }

    public static get FIND_EXIT_LEFT():number {
      return 7;
    }

    public static get FIND_EXIT():number {
      return 10;
    }

    public static get FIND_CREEPS():number {
      return 101;
    }

    public static get FIND_MY_CREEPS():number {
      return 102;
    }

    public static get FIND_HOSTILE_CREEPS():number {
      return 103;
    }

    public static get FIND_SOURCES_ACTIVE():number {
      return 104;
    }

    public static get FIND_SOURCES():number {
      return 105;
    }

    public static get FIND_DROPPED_ENERGY():number {
      return 106;
    }

    public static get FIND_DROPPED_RESOURCES():number {
      return 106;
    }

    public static get FIND_STRUCTURES():number {
      return 107;
    }

    public static get FIND_MY_STRUCTURES():number {
      return 108;
    }

    public static get FIND_HOSTILE_STRUCTURES():number {
      return 109;
    }

    public static get FIND_FLAGS():number {
      return 110;
    }

    public static get FIND_CONSTRUCTION_SITES():number {
      return 111;
    }

    public static get FIND_MY_SPAWNS():number {
      return 112;
    }

    public static get FIND_HOSTILE_SPAWNS():number {
      return 113;
    }

    public static get FIND_MY_CONSTRUCTION_SITES():number {
      return 114;
    }

    public static get FIND_HOSTILE_CONSTRUCTION_SITES():number {
      return 115;
    }

    public static get FIND_MINERALS():number {
      return 116;
    }

    public static get FIND_NUKES():number {
      return 117;
    }

    public static get TOP():number {
      return 1;
    }

    public static get TOP_RIGHT():number {
      return 2;
    }

    public static get RIGHT():number {
      return 3;
    }

    public static get BOTTOM_RIGHT():number {
      return 4;
    }

    public static get BOTTOM():number {
      return 5;
    }

    public static get BOTTOM_LEFT():number {
      return 6;
    }

    public static get LEFT():number {
      return 7;
    }

    public static get TOP_LEFT():number {
      return 8;
    }

    public static get COLOR_RED():number {
      return 1;
    }

    public static get COLOR_PURPLE():number {
      return 2;
    }

    public static get COLOR_BLUE():number {
      return 3;
    }

    public static get COLOR_CYAN():number {
      return 4;
    }

    public static get COLOR_GREEN():number {
      return 5;
    }

    public static get COLOR_YELLOW():number {
      return 6;
    }

    public static get COLOR_ORANGE():number {
      return 7;
    }

    public static get COLOR_BROWN():number {
      return 8;
    }

    public static get COLOR_GREY():number {
      return 9;
    }

    public static get COLOR_WHITE():number {
      return 10;
    }

    public static get LOOK_CREEPS():string {
      return 'creep';
    }

    public static get LOOK_ENERGY():string {
      return 'energy';
    }

    public static get LOOK_RESOURCES():string {
      return 'resource';
    }

    public static get LOOK_SOURCES():string {
      return 'source';
    }

    public static get LOOK_MINERALS():string {
      return 'mineral';
    }

    public static get LOOK_STRUCTURES():string {
      return 'structure';
    }

    public static get LOOK_FLAGS():string {
      return 'flag';
    }

    public static get LOOK_CONSTRUCTION_SITES():string {
      return 'constructionSite';
    }

    public static get LOOK_NUKES():string {
      return 'nuke';
    }

    public static get LOOK_TERRAIN():string {
      return 'terrain';
    }

    public static get OBSTACLE_OBJECT_TYPES():Array<string> {
      return ['spawn', 'creep', 'wall', 'source', 'constructedWall', 'extension', 'link', 'storage', 'tower', 'observer', 'powerSpawn', 'powerBank', 'lab', 'terminal', 'nuker'];
    }

    public static get MOVE():string {
      return 'move';
    }

    public static get WORK():string {
      return 'work';
    }

    public static get CARRY():string {
      return 'carry';
    }

    public static get ATTACK():string {
      return 'attack';
    }

    public static get RANGED_ATTACK():string {
      return 'ranged_attack';
    }

    public static get TOUGH():string {
      return 'tough';
    }

    public static get HEAL():string {
      return 'heal';
    }

    public static get CLAIM():string {
      return 'claim';
    }

    public static get BODYPART_COST():object {
      return {
        'move': 50,
        'work': 100,
        'attack': 80,
        'carry': 50,
        'heal': 250,
        'ranged_attack': 150,
        'tough': 10,
        'claim': 600
      }
    };

    public static get CREEP_LIFE_TIME():number {
      return 1500;
    }

    public static get CREEP_CLAIM_LIFE_TIME():number {
      return 500;
    }

    public static get CREEP_CORPSE_RATE():number {
      return 0.2;
    }

    public static get CARRY_CAPACITY():number {
      return 50;
    }

    public static get HARVEST_POWER():number {
      return 2;
    }

    public static get HARVEST_MINERAL_POWER():number {
      return 1;
    }

    public static get REPAIR_POWER():number {
      return 100;
    }

    public static get DISMANTLE_POWER():number {
      return 50;
    }

    public static get BUILD_POWER():number {
      return 5;
    }

    public static get ATTACK_POWER():number {
      return 30;
    }

    public static get UPGRADE_CONTROLLER_POWER():number {
      return 1;
    }

    public static get RANGED_ATTACK_POWER():number {
      return 10;
    }

    public static get HEAL_POWER():number {
      return 12;
    }

    public static get RANGED_HEAL_POWER():number {
      return 4;
    }

    public static get REPAIR_COST():number {
      return 0.01;
    }

    public static get DISMANTLE_COST():number {
      return 0.005;
    }

    public static get RAMPART_DECAY_AMOUNT():number {
      return 300;
    }

    public static get RAMPART_DECAY_TIME():number {
      return 100;
    }

    public static get RAMPART_HITS():number {
      return 1;
    }

    public static get RAMPART_HITS_MAX():object {
      return {
        2: 300000,
        3: 1000000,
        4: 3000000,
        5: 10000000,
        6: 30000000,
        7: 100000000,
        8: 300000000
      };
    }

    public static get ENERGY_REGEN_TIME():number {
      return 300;
    }

    public static get ENERGY_DECAY():number {
      return 1000;
    }

    public static get SPAWN_HITS():number {
      return 5000;
    }

    public static get SPAWN_ENERGY_START():number {
      return 300;
    }

    public static get SPAWN_ENERGY_CAPACITY():number {
      return 300;
    }

    public static get CREEP_SPAWN_TIME():number {
      return 3;
    }

    public static get SOURCE_ENERGY_CAPACITY():number {
      return 3000;
    }

    public static get SOURCE_ENERGY_NEUTRAL_CAPACITY():number {
      return 1500;
    }

    public static get SOURCE_ENERGY_KEEPER_CAPACITY():number {
      return 4500;
    }

    public static get WALL_HITS():number {
      return 1;
    }

    public static get WALL_HITS_MAX():number {
      return 300000000;
    }

    public static get EXTENSION_HITS():number {
      return 1000;
    }

    public static get EXTENSION_ENERGY_CAPACITY():object {
      return {
        0: 50,
        1: 50,
        2: 50,
        3: 50,
        4: 50,
        5: 50,
        6: 50,
        7: 100,
        8: 200
      }
    }

    public static get ROAD_HITS():number {
      return 5000;
    }

    public static get ROAD_WEAROUT():number {
      return 1;
    }

    public static get ROAD_DECAY_AMOUNT():number {
      return 100;
    }

    public static get ROAD_DECAY_TIME():number {
      return 1000;
    }

    public static get LINK_HITS():number {
      return 1000;
    }

    public static get LINK_HITS_MAX():number {
      return 1000;
    }

    public static get LINK_CAPACITY():number {
      return 800;
    }

    public static get LINK_COOLDOWN():number {
      return 1;
    }

    public static get LINK_LOSS_RATIO():number {
      return 0.03;
    }

    public static get STORAGE_CAPACITY():number {
      return 1000000;
    }

    public static get STORAGE_HITS():number {
      return 10000;
    }

    public static get STRUCTURE_SPAWN():string {
      return 'spawn';
    }

    public static get STRUCTURE_EXTENSION():string {
      return 'extension';
    }

    public static get STRUCTURE_ROAD():string {
      return 'road';
    }

    public static get STRUCTURE_WALL():string {
      return 'constructedWall';
    }

    public static get STRUCTURE_RAMPART():string {
      return 'rampart';
    }

    public static get STRUCTURE_KEEPER_LAIR():string {
      return 'keeperLair';
    }

    public static get STRUCTURE_PORTAL():string {
      return 'portal';
    }

    public static get STRUCTURE_CONTROLLER():string {
      return 'controller';
    }

    public static get STRUCTURE_LINK():string {
      return 'link';
    }

    public static get STRUCTURE_STORAGE():string {
      return 'storage';
    }

    public static get STRUCTURE_TOWER():string {
      return 'tower';
    }

    public static get STRUCTURE_OBSERVER():string {
      return 'observer';
    }

    public static get STRUCTURE_POWER_BANK():string {
      return 'powerBank';
    }

    public static get STRUCTURE_POWER_SPAWN():string {
      return 'powerSpawn';
    }

    public static get STRUCTURE_EXTRACTOR():string {
      return 'extractor';
    }

    public static get STRUCTURE_LAB():string {
      return 'lab';
    }

    public static get STRUCTURE_TERMINAL():string {
      return 'terminal';
    }

    public static get STRUCTURE_CONTAINER():string {
      return 'container';
    }

    public static get STRUCTURE_NUKER():string {
      return 'nuker';
    }

    public static get CONSTRUCTION_COST():object {
      return {
        'spawn': 15000,
        'extension': 3000,
        'road': 300,
        'constructedWall': 1,
        'rampart': 1,
        'link': 5000,
        'storage': 30000,
        'tower': 5000,
        'observer': 8000,
        'powerSpawn': 100000,
        'extractor': 5000,
        'lab': 50000,
        'terminal': 100000,
        'container': 5000,
        'nuker': 100000
      };
    }

    public static get CONSTRUCTION_COST_ROAD_SWAMP_RATIO():number {
      return 5;
    }

    public static get CONTROLLER_LEVELS():object {
      return {
        1: 200,
        2: 45000,
        3: 135000,
        4: 405000,
        5: 1215000,
        6: 3645000,
        7: 10935000
      };
    }

    public static get CONTROLLER_STRUCTURES():object {
      return {
        'spawn': {0: 0, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 2, 8: 3},
        'extension': {0: 0, 1: 0, 2: 5, 3: 10, 4: 20, 5: 30, 6: 40, 7: 50, 8: 60},
        'link': {1: 0, 2: 0, 3: 0, 4: 0, 5: 2, 6: 3, 7: 4, 8: 6},
        'road': {0: 2500, 1: 2500, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
        'constructedWall': {1: 0, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
        'rampart': {1: 0, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
        'storage': {1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1},
        'tower': {1: 0, 2: 0, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 6},
        'observer': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1},
        'powerSpawn': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1},
        'extractor': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1, 8: 1},
        'terminal': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1, 8: 1},
        'lab': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 3, 7: 6, 8: 10},
        'container': {0: 5, 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5},
        'nuker': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1}
      };
    }

    public static get CONTROLLER_DOWNGRADE():object {
      return {
        1: 20000,
        2: 50000,
        3: 50000,
        4: 50000,
        5: 50000,
        6: 50000,
        7: 50000,
        8: 50000
      };
    }

    public static get CONTROLLER_CLAIM_DOWNGRADE():number {
      return 0.2;
    }

    public static get CONTROLLER_RESERVE():number {
      return 1;
    }

    public static get CONTROLLER_RESERVE_MAX():number {
      return 5000;
    }

    public static get CONTROLLER_MAX_UPGRADE_PER_TICK():number {
      return 15;
    }

    public static get CONTROLLER_ATTACK_BLOCKED_UPGRADE():number {
      return 1000;
    }

    public static get TOWER_HITS():number {
      return 3000;
    }

    public static get TOWER_CAPACITY():number {
      return 1000;
    }

    public static get TOWER_ENERGY_COST():number {
      return 10;
    }

    public static get TOWER_POWER_ATTACK():number {
      return 600;
    }

    public static get TOWER_POWER_HEAL():number {
      return 400;
    }

    public static get TOWER_POWER_REPAIR():number {
      return 800;
    }

    public static get TOWER_OPTIMAL_RANGE():number {
      return 5;
    }

    public static get TOWER_FALLOFF_RANGE():number {
      return 20;
    }

    public static get TOWER_FALLOFF():number {
      return 0.75;
    }

    public static get OBSERVER_HITS():number {
      return 500;
    }

    public static get OBSERVER_RANGE():number {
      return 5;
    }

    public static get POWER_BANK_HITS():number {
      return 2000000;
    }

    public static get POWER_BANK_CAPACITY_MAX():number {
      return 5000;
    }

    public static get POWER_BANK_CAPACITY_MIN():number {
      return 500;
    }

    public static get POWER_BANK_CAPACITY_CRIT():number {
      return 0.3;
    }

    public static get POWER_BANK_DECAY():number {
      return 5000;
    }

    public static get POWER_BANK_HIT_BACK():number {
      return 0.5;
    }

    public static get POWER_SPAWN_HITS():number {
      return 5000;
    }

    public static get POWER_SPAWN_ENERGY_CAPACITY():number {
      return 5000;
    }

    public static get POWER_SPAWN_POWER_CAPACITY():number {
      return 100;
    }

    public static get POWER_SPAWN_ENERGY_RATIO():number {
      return 50;
    }

    public static get EXTRACTOR_HITS():number {
      return 500;
    }

    public static get LAB_HITS():number {
      return 500;
    }

    public static get LAB_MINERAL_CAPACITY():number {
      return 3000;
    }

    public static get LAB_ENERGY_CAPACITY():number {
      return 2000;
    }

    public static get LAB_BOOST_ENERGY():number {
      return 20;
    }

    public static get LAB_BOOST_MINERAL():number {
      return 30;
    }

    public static get LAB_COOLDOWN():number {
      return 10;
    }

    public static get GCL_POW():number {
      return 2.4;
    }

    public static get GCL_MULTIPLY():number {
      return 1000000;
    }

    public static get GCL_NOVICE():number {
      return 3;
    }

    public static get MODE_SIMULATION():string {
      return 'simulation';
    }

    public static get MODE_SURVIVAL():string {
      return 'survival';
    }

    public static get MODE_WORLD():string {
      return 'world';
    }

    public static get MODE_ARENA():string {
      return 'arena';
    }

    public static get TERRAIN_MASK_WALL():number {
      return 1;
    }

    public static get TERRAIN_MASK_SWAMP():number {
      return 2;
    }

    public static get TERRAIN_MASK_LAVA():number {
      return 4;
    }

    public static get MAX_CONSTRUCTION_SITES():number {
      return 100;
    }

    public static get MAX_CREEP_SIZE():number {
      return 50;
    }

    public static get MINERAL_REGEN_TIME():number {
      return 50000;
    }

    public static get MINERAL_MIN_AMOUNT():object {
      return {
        'H': 140000,
        'O': 140000,
        'L': 70000,
        'K': 70000,
        'Z': 70000,
        'U': 70000,
        'X': 70000
      };
    }

    public static get MINERAL_RANDOM_FACTOR():number {
      return 2;
    }

    public static get TERMINAL_CAPACITY():number {
      return 300000;
    }

    public static get TERMINAL_HITS():number {
      return 3000;
    }

    public static get TERMINAL_SEND_COST():number {
      return 0.1;
    }

    public static get TERMINAL_MIN_SEND():number {
      return 100;
    }

    public static get CONTAINER_HITS():number {
      return 250000;
    }

    public static get CONTAINER_CAPACITY():number {
      return 2000;
    }

    public static get CONTAINER_DECAY():number {
      return 5000;
    }

    public static get CONTAINER_DECAY_TIME():number {
      return 100;
    }

    public static get CONTAINER_DECAY_TIME_OWNED():number {
      return 500;
    }

    public static get NUKER_HITS():number {
      return 1000;
    }

    public static get NUKER_COOLDOWN():number {
      return 100000;
    }

    public static get NUKER_ENERGY_CAPACITY():number {
      return 200000;
    }

    public static get NUKER_GHODIUM_CAPACITY():number {
      return 5000;
    }

    public static get NUKE_LAND_TIME():number {
      return 50000;
    }

    public static get NUKE_RANGE():number {
      return 5;
    }

    public static get NUKE_DAMAGE():object {
      return {
        0: 10000000,
        1: 1000000,
        4: 100000
      };
    }

    public static get RESOURCE_ENERGY():string {
      return 'energy';
    }

    public static get RESOURCE_POWER():string {
      return 'power';
    }

    public static get RESOURCE_HYDROGEN():string {
      return 'H';
    }

    public static get RESOURCE_OXYGEN():string {
      return 'O';
    }

    public static get RESOURCE_UTRIUM():string {
      return 'U';
    }

    public static get RESOURCE_LEMERGIUM():string {
      return 'L';
    }

    public static get RESOURCE_KEANIUM():string {
      return 'K';
    }

    public static get RESOURCE_ZYNTHIUM():string {
      return 'Z';
    }

    public static get RESOURCE_CATALYST():string {
      return 'X';
    }

    public static get RESOURCE_GHODIUM():string {
      return 'G';
    }

    public static get RESOURCE_HYDROXIDE():string {
      return 'OH';
    }

    public static get RESOURCE_ZYNTHIUM_KEANITE():string {
      return 'ZK';
    }

    public static get RESOURCE_UTRIUM_LEMERGITE():string {
      return 'UL';
    }

    public static get RESOURCE_UTRIUM_HYDRIDE():string {
      return 'UH';
    }

    public static get RESOURCE_UTRIUM_OXIDE():string {
      return 'UO';
    }

    public static get RESOURCE_KEANIUM_HYDRIDE():string {
      return 'KH';
    }

    public static get RESOURCE_KEANIUM_OXIDE():string {
      return 'KO';
    }

    public static get RESOURCE_LEMERGIUM_HYDRIDE():string {
      return 'LH';
    }

    public static get RESOURCE_LEMERGIUM_OXIDE():string {
      return 'LO';
    }

    public static get RESOURCE_ZYNTHIUM_HYDRIDE():string {
      return 'ZH';
    }

    public static get RESOURCE_ZYNTHIUM_OXIDE():string {
      return 'ZO';
    }

    public static get RESOURCE_GHODIUM_HYDRIDE():string {
      return 'GH';
    }

    public static get RESOURCE_GHODIUM_OXIDE():string {
      return 'GO';
    }

    public static get RESOURCE_UTRIUM_ACID():string {
      return 'UH2O';
    }

    public static get RESOURCE_UTRIUM_ALKALIDE():string {
      return 'UHO2';
    }

    public static get RESOURCE_KEANIUM_ACID():string {
      return 'KH2O';
    }

    public static get RESOURCE_KEANIUM_ALKALIDE():string {
      return 'KHO2';
    }

    public static get RESOURCE_LEMERGIUM_ACID():string {
      return 'LH2O';
    }

    public static get RESOURCE_LEMERGIUM_ALKALIDE():string {
      return 'LHO2';
    }

    public static get RESOURCE_ZYNTHIUM_ACID():string {
      return 'ZH2O';
    }

    public static get RESOURCE_ZYNTHIUM_ALKALIDE():string {
      return 'ZHO2';
    }

    public static get RESOURCE_GHODIUM_ACID():string {
      return 'GH2O';
    }

    public static get RESOURCE_GHODIUM_ALKALIDE():string {
      return 'GHO2';
    }

    public static get RESOURCE_CATALYZED_UTRIUM_ACID():string {
      return 'XUH2O';
    }

    public static get RESOURCE_CATALYZED_UTRIUM_ALKALIDE():string {
      return 'XUHO2';
    }

    public static get RESOURCE_CATALYZED_KEANIUM_ACID():string {
      return 'XKH2O';
    }

    public static get RESOURCE_CATALYZED_KEANIUM_ALKALIDE():string {
      return 'XKHO2';
    }

    public static get RESOURCE_CATALYZED_LEMERGIUM_ACID():string {
      return 'XLH2O';
    }

    public static get RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE():string {
      return 'XLHO2';
    }

    public static get RESOURCE_CATALYZED_ZYNTHIUM_ACID():string {
      return 'XZH2O';
    }

    public static get RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE():string {
      return 'XZHO2';
    }

    public static get RESOURCE_CATALYZED_GHODIUM_ACID():string {
      return 'XGH2O';
    }

    public static get RESOURCE_CATALYZED_GHODIUM_ALKALIDE():string {
      return 'XGHO2';
    }

    public static get REACTIONS():object {
      return {
        H: {
          O: 'OH',
          L: 'LH',
          K: 'KH',
          U: 'UH',
          Z: 'ZH',
          G: 'GH'
        },
        O: {
          H: 'OH',
          L: 'LO',
          K: 'KO',
          U: 'UO',
          Z: 'ZO',
          G: 'GO'
        },
        Z: {
          K: 'ZK',
          H: 'ZH',
          O: 'ZO'
        },
        L: {
          U: 'UL',
          H: 'LH',
          O: 'LO'
        },
        K: {
          Z: 'ZK',
          H: 'KH',
          O: 'KO'
        },
        G: {
          H: 'GH',
          O: 'GO'
        },
        U: {
          L: 'UL',
          H: 'UH',
          O: 'UO'
        },
        OH: {
          UH: 'UH2O',
          UO: 'UHO2',
          ZH: 'ZH2O',
          ZO: 'ZHO2',
          KH: 'KH2O',
          KO: 'KHO2',
          LH: 'LH2O',
          LO: 'LHO2',
          GH: 'GH2O',
          GO: 'GHO2'
        },
        X: {
          UH2O: 'XUH2O',
          UHO2: 'XUHO2',
          LH2O: 'XLH2O',
          LHO2: 'XLHO2',
          KH2O: 'XKH2O',
          KHO2: 'XKHO2',
          ZH2O: 'XZH2O',
          ZHO2: 'XZHO2',
          GH2O: 'XGH2O',
          GHO2: 'XGHO2'
        },
        ZK: {
          UL: 'G'
        },
        UL: {
          ZK: 'G'
        },
        LH: {
          OH: 'LH2O'
        },
        ZH: {
          OH: 'ZH2O'
        },
        GH: {
          OH: 'GH2O'
        },
        KH: {
          OH: 'KH2O'
        },
        UH: {
          OH: 'UH2O'
        },
        LO: {
          OH: 'LHO2'
        },
        ZO: {
          OH: 'ZHO2'
        },
        KO: {
          OH: 'KHO2'
        },
        UO: {
          OH: 'UHO2'
        },
        GO: {
          OH: 'GHO2'
        },
        LH2O: {
          X: 'XLH2O'
        },
        KH2O: {
          X: 'XKH2O'
        },
        ZH2O: {
          X: 'XZH2O'
        },
        UH2O: {
          X: 'XUH2O'
        },
        GH2O: {
          X: 'XGH2O'
        },
        LHO2: {
          X: 'XLHO2'
        },
        UHO2: {
          X: 'XUHO2'
        },
        KHO2: {
          X: 'XKHO2'
        },
        ZHO2: {
          X: 'XZHO2'
        },
        GHO2: {
          X: 'XGHO2'
        }
      };
    }

    public static get BOOSTS():object {
      return {
        work: {
          UO: {
            harvest: 2
          },
          UHO2: {
            harvest: 3
          },
          XUHO2: {
            harvest: 4
          },
          LH: {
            build: 1.3,
            repair: 1.3
          },
          LH2O: {
            build: 1.65,
            repair: 1.65
          },
          XLH2O: {
            build: 2,
            repair: 2
          },
          ZH: {
            dismantle: 2
          },
          ZH2O: {
            dismantle: 3
          },
          XZH2O: {
            dismantle: 4
          },
          GH: {
            upgradeController: 1.3
          },
          GH2O: {
            upgradeController: 1.65
          },
          XGH2O: {
            upgradeController: 2
          }
        },
        attack: {
          UH: {
            attack: 2
          },
          UH2O: {
            attack: 3
          },
          XUH2O: {
            attack: 4
          }
        },
        ranged_attack: {
          KO: {
            rangedAttack: 2,
            rangedMassAttack: 2
          },
          KHO2: {
            rangedAttack: 3,
            rangedMassAttack: 3
          },
          XKHO2: {
            rangedAttack: 4,
            rangedMassAttack: 4
          }
        },
        heal: {
          LO: {
            heal: 2,
            rangedHeal: 2
          },
          LHO2: {
            heal: 3,
            rangedHeal: 3
          },
          XLHO2: {
            heal: 4,
            rangedHeal: 4
          }
        },
        carry: {
          KH: {
            capacity: 2
          },
          KH2O: {
            capacity: 3
          },
          XKH2O: {
            capacity: 4
          }
        },
        move: {
          ZO: {
            fatigue: 2
          },
          ZHO2: {
            fatigue: 3
          },
          XZHO2: {
            fatigue: 4
          }
        },
        tough: {
          GO: {
            damage: .7
          },
          GHO2: {
            damage: .5
          },
          XGHO2: {
            damage: .3
          }
        }
      };
    }


    public static get BODYPARTS_ALL():Array<string> {
      return [
        Screeps.Constants.MOVE,
        Screeps.Constants.WORK,
        Screeps.Constants.CARRY,
        Screeps.Constants.ATTACK,
        Screeps.Constants.RANGED_ATTACK,
        Screeps.Constants.TOUGH,
        Screeps.Constants.HEAL,
        Screeps.Constants.CLAIM
      ];
    }

    public static get RESOURCES_ALL():Array<string> {
      return [
        Screeps.Constants.RESOURCE_ENERGY,
        Screeps.Constants.RESOURCE_POWER,

        Screeps.Constants.RESOURCE_HYDROGEN,
        Screeps.Constants.RESOURCE_OXYGEN,
        Screeps.Constants.RESOURCE_UTRIUM,
        Screeps.Constants.RESOURCE_KEANIUM,
        Screeps.Constants.RESOURCE_LEMERGIUM,
        Screeps.Constants.RESOURCE_ZYNTHIUM,
        Screeps.Constants.RESOURCE_CATALYST,
        Screeps.Constants.RESOURCE_GHODIUM,

        Screeps.Constants.RESOURCE_HYDROXIDE,
        Screeps.Constants.RESOURCE_ZYNTHIUM_KEANITE,
        Screeps.Constants.RESOURCE_UTRIUM_LEMERGITE,

        Screeps.Constants.RESOURCE_UTRIUM_HYDRIDE,
        Screeps.Constants.RESOURCE_UTRIUM_OXIDE,
        Screeps.Constants.RESOURCE_KEANIUM_HYDRIDE,
        Screeps.Constants.RESOURCE_KEANIUM_OXIDE,
        Screeps.Constants.RESOURCE_LEMERGIUM_HYDRIDE,
        Screeps.Constants.RESOURCE_LEMERGIUM_OXIDE,
        Screeps.Constants.RESOURCE_ZYNTHIUM_HYDRIDE,
        Screeps.Constants.RESOURCE_ZYNTHIUM_OXIDE,
        Screeps.Constants.RESOURCE_GHODIUM_HYDRIDE,
        Screeps.Constants.RESOURCE_GHODIUM_OXIDE,

        Screeps.Constants.RESOURCE_UTRIUM_ACID,
        Screeps.Constants.RESOURCE_UTRIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_KEANIUM_ACID,
        Screeps.Constants.RESOURCE_KEANIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_LEMERGIUM_ACID,
        Screeps.Constants.RESOURCE_LEMERGIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_ZYNTHIUM_ACID,
        Screeps.Constants.RESOURCE_ZYNTHIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_GHODIUM_ACID,
        Screeps.Constants.RESOURCE_GHODIUM_ALKALIDE,

        Screeps.Constants.RESOURCE_CATALYZED_UTRIUM_ACID,
        Screeps.Constants.RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_CATALYZED_KEANIUM_ACID,
        Screeps.Constants.RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_CATALYZED_LEMERGIUM_ACID,
        Screeps.Constants.RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_CATALYZED_ZYNTHIUM_ACID,
        Screeps.Constants.RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
        Screeps.Constants.RESOURCE_CATALYZED_GHODIUM_ACID,
        Screeps.Constants.RESOURCE_CATALYZED_GHODIUM_ALKALIDE
      ];
    }

    public static get COLORS_ALL():Array<string> {
      return [
        Screeps.Constants.COLOR_RED,
        Screeps.Constants.COLOR_PURPLE,
        Screeps.Constants.COLOR_BLUE,
        Screeps.Constants.COLOR_CYAN,
        Screeps.Constants.COLOR_GREEN,
        Screeps.Constants.COLOR_YELLOW,
        Screeps.Constants.COLOR_ORANGE,
        Screeps.Constants.COLOR_BROWN,
        Screeps.Constants.COLOR_GREY,
        Screeps.Constants.COLOR_WHITE
      ];
    }

  }
  
}
