/// <reference path="./screeps.lib.ts"/>

declare module Screeps {
  /**
   * The main global game object containing all the gameplay information.
   * http://support.screeps.com/hc/en-us/articles/203016382-Game
   */
  interface Game {
    /**
     * An object containing information about your CPU usage.
     */
    cpu: CPU;

    /**
     * A hash containing all your creeps with creep names as hash keys.
     */
    creeps: HashTable<Creep>;

    /**
     * A hash containing all your flags with flag names as hash keys.
     */
    flags: HashTable<Flag>;

    /**
     * Main game indicator affecting cpu limit and amount of rooms you can control.
     * http://support.screeps.com/hc/en-us/articles/203086021-Territory-control
     */
    gcl: GCL;

    /**
     * A global object representing world map.
     */
    map: Map;

    /**
     * A hash containing all the rooms available to you with room names as hash
     * keys.
     */
    rooms: HashTable<Room>;

    /**
     * A hash containing all your spawns with spawn names as hash keys.
     */
    spawns: HashTable<Spawn>;

    /**
     * A hash containing all your structures with structure id as hash keys.
     */
    strictures: HashTable<Structure>;

    /**
     * System game tick counter. It is automatically incremented on every tick.
     * Learn more:
     * http://support.screeps.com/hc/en-us/articles/203032752-Understanding-game-loop-time-and-ticks
     */
    timer: number;

    /**
     * Get amount of CPU time used from the beginning of the current game tick.
     * Always returns 0 in the Simulation mode.
     * @returns Currently used CPU time as a float number.
     */
    getUsed(): number;

    /**
     * Get an object with the specified unique ID. It may be a game object of any
     * type. Only objects from the rooms which are visible to you can be accessed.
     * @param id The unique identificator.
     * @returns An object instance or null if it cannot be found.
     */
    getObjectById(id: string): any;

    /**
     * Send a custom message at your profile email. This way, you can set up
     * notifications to yourself on any occasion within the game. You can schedule
     * up to 20 notifications during one game tick. Not available in the Simulation Room.
     * @param message Custom text which will be sent in the message. Maximum
     * length is 1000 characters.
     * @param groupInterval If set to 0 (default), the notification will be scheduled
     * immediately. Otherwise, it will be grouped with other notifications and mailed
     * out later using the specified time in minutes.
     */
    notify(message: string, groupInterval?: number): void;
  }

  /**
   * Global game object all game objects decend from such as roads and extensions.
   * http://support.screeps.com/hc/en-us/articles/203079221-Structure
   */
  interface Structure {
    /**
     * The current amount of hit points of the structure.
     */
    hits: number;

    /**
     * The total amount of hit points of the structure.
     */
    hitsMax: number;

    /**
     * A unique object identificator. You can use Game.getObjectById method to
     * retrieve an object instance by its id.
     */
    id: string;

    /**
     * Whether this is your own structure. Walls and roads don't have this
     * property as they are considered neutral structures.
     */
    my: boolean;

    /**
     * An object with the structure’s owner info (if present).
     */
    owner: Owner;

    /**
     * An object representing the position of this structure in the room.
     */
    pos: RoomPosition;

    /**
     * The link to the Room object. May not be available in case a flag is placed
     * in a room which you do not have access to.
     */
    room: Room;

    /**
     * One of the STRUCTURE_* constants.
     */
    structureType: StructureType;
    
    /**
     * Destroy this structure immediately. You are not allowed to destroy a structure
     * when there are hostile creeps in the room.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     */
    destroy(): ResultCode;
    
    /**
     * Toggle auto notification when the structure is under attack. The notification
     * will be sent to your account email. Turned on by default.
     * @param enabled Whether to enable notification or disable.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     * ERR_INVALID_ARGS => -10 : enable argument is not a boolean value.
     */
    notifyWhenAttacked(enabled: boolean): ResultCode;
  }
  
  /**
   * Claim this structure to take control over the room.
   */
  interface Controller extends Structure {
    /**
     * Current controller level, from 0 to 8.
     */
    level: number;
    
    /**
     * The current progress of upgrading the controller to the next level.
     */
    progress: number;
    
    /**
     * The progress needed to reach the next level.
     */
    progressTotal: number;
    
    /**
     * An object with the controller reservation info if present.
     */
    reservation: Reservation;
    
    /**
     * The amount of game ticks when this controller will lose one level. This timer
     * can be reset by using Creep.upgradeController.
     * http://support.screeps.com/hc/en-us/articles/203013212-Creep#upgradeController
     */
    ticksToDowngrade: number;
    
    /**
     * Make your claimed controller neutral again.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     */
    unclaim(): ResultCode;
  }
  
  /**
   * Contains up to 50 energy units which can be spent on spawning bigger creeps.
   * Controller level: 2
   * Cost: 3,000
   * Hits when created: 1,000
   * Max hits: 1,000
   */
  interface Extension extends Structure {
    /**
     * The amount of energy containing in the extension.
     */
    energy: number;
    
    /**
     * The total amount of energy the extension can contain.
     */
    energyCapacity: number;
    
    /**
     * Transfer the energy from the extension to a creep.
     * @param target The creep object which energy should be transferred to.
     * @param amount The amount of energy to be transferred. If omitted, all the
     * remaining amount of energy will be used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The extension contains less energy than the given amount.
     * ERR_INVALID_TARGET => -7 : The specified target object is not a creep.
     * ERR_FULL => -8 : The target creep can not carry the given amount of energy.
     * ERR_NOT_IN_RANGE => -9 : The target creep is too far away.
     */
    transferEnergy(target: Creep): ResultCode;
    transferEnergy(target: Creep, amount: number): ResultCode;
  }
  
  /**
   * Non-player structure. Spawns source keepers.
   * Controller level: --
   * Cost: --
   * Hits when created: --
   * Max hits: --
   */
  interface KeeperLair extends Structure {
    /**
     * Time to spawning of the next Source Keeper.
     */
    ticksToSpawn: number;
  }
  
  /**
   * Remotely transfers up to 500 energy to another Link. Cooldown period equals to 1 tick per tile
   * of the linear distance to the target.
   * Controller level: 5
   * Cost: 5,000
   * Hits when created: 1,000
   * Max hits: 1,000
   */
  interface Link extends Structure {
    /**
     * The amount of game ticks the link has to wait until the next transfer is possible.
     */
    cooldown: number;
    
    /**
     * The amount of energy containing in the link.
     */
    energy: number;
    
    /**
     * The total amount of energy the link can contain.
     */
    energyCapacity: number;
    
    /**
     * Transfer energy from the link to another link or a creep. If the target is a
     * creep, it has to be at adjacent square to the link. If the target is a link,
     * it can be at any location in the same room. Remote transfer process implies
     * 3% energy loss and cooldown delay depending on the distance.
     * @param target The target object.
     * @param amount The amount of energy to be transferred. If omitted, all the
     * available energy is used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this link.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not have the given amount of energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid Link or Creep object.
     * ERR_FULL => -8 : The target cannot receive any more energy.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_INVALID_ARGS => -10 : The energy amount is incorrect.
     * ERR_TIRED => -11 : The link is still cooling down.
     * ERR_RCL_NOT_ENOUGH : -14 => The Room Controller Level is not enough to use this link.
     */
    transferEnergy(target: Creep): ResultCode;
    transferEnergy(target: Creep, amount: number): ResultCode;
    transferEnergy(target: Structure): ResultCode;
    transferEnergy(target: Structure, amount: number): ResultCode;
  }
  
  /**
   * 	Provides visibility into a distant room from your script.
   * Controller level: 8
   * Cost: 8,000
   * Hits when created: 500
   * Max hits: 500
   */
  interface Observer extends Structure {
    /**
     * Provide visibility into a distant room from your script. The target room
     * object will be available on the next tick. The maximum range is 5 rooms.
     * @param roomName The name of the target room.
     */
    observeRoom(roomName: string): ResultCode;
  }
  
  /**
   * Non-player structure. Contains power resource.
   * Controller level: --
   * Cost: --
   * Hits when created: 2M
   * Max hits: 2M
   */
  interface PowerBank extends Structure {
    /**
     * The amount of power containing.
     */
    power: number;
    
    /**
     * The amount of game ticks when this structure will disappear.
     */
    ticksToDecay: number;
  }
  
  /**
   * Spawns power creeps with special unique powers.
   * Controller level: 8
   * Cost: 100,000
   * Hits when created: 5,000
   * Max hits: 5,000
   */
  interface PowerSpawn extends Structure {
    /**
     * The amount of energy containing in this structure.
     */
    energy: number;
    
    /**
     * The total amount of energy this structure can contain.
     */
    energyCapacity: number;
    
    /**
     * The amount of power containing in this structure.
     */
    power: number;
    
    /**
     * The total amount of power this structure can contain.
     */
    powerCapacity: number;
    
    /**
     * Create a power creep. This method is under development.
     */
    createPowerCreep(name: string): ResultCode;
    
    /**
     * Register power resource units into your account. Registered power allows to
     * develop power creeps skills. Consumes 1 power resource unit and 50 energy
     * resource units.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The structure does not have enough energy or power resource units.
     * ERR_RCL_NOT_ENOUGH => -14 : The Room Controller Level is not enough to use this structure.
     */
    processPower(): ResultCode;
    
    /**
     * Transfer the energy from this structure to a creep.
     * @param target The creep object which energy should be transferred to.
     * @param amount The amount of energy to be transferred. If omitted, all the
     * remaining amount of energy will be used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : This structure less energy than the given amount.
     * ERR_INVALID_TARGET => -7 : The specified target object is not a creep.\
     * ERR_FULL => -8 : The target creep can not carry the given amount of energy.
     * ERR_NOT_IN_RANGE => -9 : The target creep is too far away.
     */
    transferEnergy(target: Creep): ResultCode;
    transferEnergy(target: Creep, amount: number): ResultCode;
  }
  
  /**
   * Blocks movement of hostile creeps, and defends your creeps and structures. Decays for 300 hits per
   * 100 game ticks. Ramparts max hits depend on Controller Level.
   * Controller level: 2
   * Cost: 1
   * Hits when created: 1
   * Max hits: 300K-300M
   */
  interface Rampart extends Structure {
    /**
     * The amount of game ticks when this rampart will lose some hit points.
     */
    ticksToDecay: number;
  }
  
  /**
   * Road at plain land:
   * Decreases movement cost to 1. Decays for 100 hits per 1000 ticks.
   * Controller level: --
   * Cost: 300
   * Hits when created: 5,000
   * Max hits: 5,000
   * 
   * Road at swamp:
   * Decreases movement cost to 1. Decays for 500 hits per 1000 ticks.
   * Controller level: --
   * Cost: 1,500
   * Hits when created: 25,000
   * Max hits: 25,000
   * 
   * Every creep step decreases the decay timer for 1 tick per each creep body part.
   */
  interface Road extends Structure {
    /**
     * The amount of game ticks when this road will lose some hit points.
     */
    ticksToDecay: number;
  }
  
  /**
   * Stores up to 1M resource units.
   * Controller level: 4
   * Cost: 30,000
   * Hits when created: 10,000
   * Max hits: 10,000
   */
  interface Storage extends Structure {
    /**
     * An object with the storage contents.
     */
    store: Store;
    
    /**
     * The total amount of resources the storage can contain.
     */
    storeCapacity: number;
    
    /**
     * Transfer resource from this storage to a creep. The target has to
     * be at adjacent square.
     * @param target The target object.
     * @param resourceType One of the RESOURCE_* constants.
     * @param amount The amount of resources to be transferred. If omitted, all
     * the available amount is used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The structure does not have the given amount of energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid object which can contain energy.
     * ERR_FULL => -8 : The target cannot receive any more energy.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_INVALID_ARGS => -10 : The energy amount is incorrect.
     */
    transfer(target: Creep, resourceType: ResourceType): ResultCode;
    transfer(target: Creep, resourceType: ResourceType, amount: number): ResultCode;
  
    /**
     * An alias for storage.transfer(target, RESOURCE_ENERGY, amount). This method
     * is deprecated.
     * @param target The target object.
     * @param amount The amount of resources to be transferred. If omitted, all
     * the available amount is used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The structure does not have the given amount of energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid object which can contain energy.
     * ERR_FULL => -8 : The target cannot receive any more energy.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_INVALID_ARGS => -10 : The energy amount is incorrect.
     */
    transferEnergy(target: Creep): ResultCode;
    transferEnergy(target: Creep, amount: number): ResultCode;
  }
  
  /**
   * Remotely attacks or heals any creep in a room, or repairs a structure.
   * Controller level: 3
   * Cost: 5,000
   * Hits when created: 3,000
   * Max hits: 3,000
   */
  interface Tower extends Structure {
    /**
     * The amount of energy containing in this structure.
     */
    energy: number;
    
    /**
     * The total amount of energy this structure can contain.
     */
    energyCapacity: number;
    
    /**
     * Remotely attack any creep in the room. Consumes 10 energy units per tick. Attack power
     * depends on the distance to the target: from 600 hits at range 5 to 150 hits at range 20.
     * @param target The target creep.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The tower does not have enough energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid attackable object.
     * ERR_RCL_NOT_ENOUGH => -14 : The Room Controller Level is not enough to use this structure.
     */
    attach(target: Creep): ResultCode;
    
    /**
     * Remotely heal any creep in the room. Consumes 10 energy units per tick. Heal power depends on
     * the distance to the target: from 400 hits at range 5 to 100 hits at range 20.
     * @param target The target creep.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The tower does not have enough energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid creep object.
     * ERR_RCL_NOT_ENOUGH => -14 : The Room Controller Level is not enough to use this structure.
     */
    heal(target: Creep): ResultCode;
    
    /**
     * Remotely repair any structure in the room. Consumes 10 energy units per tick. Repair power depends
     * on the distance to the target: from 800 hits at range 5 to 200 hits at range 20.
     * @param target The target structure.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The tower does not have enough energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid repairable object.
     * ERR_RCL_NOT_ENOUGH => -14 : The Room Controller Level is not enough to use this structure.
     */
    repair(target: Structure): ResultCode;
  
    /**
     * Transfer energy from the structure to a creep.
     * @param target The creep object which energy should be transferred to.
     * @param amount The amount of energy to be transferred. If omitted, all the remaining amount of
     * energy will be used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this structure.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The structure contains less energy than the given amount.
     * ERR_INVALID_TARGET => -7 : The specified target object is not a creep.
     * ERR_FULL => -8 : The target creep can not carry the given amount of energy.
     * ERR_NOT_IN_RANGE => -9 : The target creep is too far away.
     */
    transferEnergy(target: Creep): ResultCode;
    transferEnergy(target: Creep, amount: number): ResultCode;
  }
  
  /**
   * Blocks movement of all creeps.
   * Controller level: 2
   * Cost: 1
   * Hits when created: 1
   * Max hits: 300M
   */
  interface Wall extends Structure {
    /**
     * The amount of game ticks when the wall will disappear (only for automatically placed border
     * walls at the start of the game).
     */
    ticksToLive: number;
  }

  interface Creep {

  }

  interface Flag {

  }

  interface Map {

  }

  interface Room {

  }

  interface Spawn extends Structure {

  }

  interface RoomPosition {

  }

  /**
   * An object containing information about your CPU usage.
   */
  interface CPU {
    /**
     * Your CPU limit depending on your Global Control Level.
     * http://support.screeps.com/hc/en-us/articles/203086021-Territory-control
     */
    limit: number;

    /**
     * An amount of available CPU time at the current game tick.
     * It can be higher than Game.cpu.limit. Learn more:
     * http://support.screeps.com/hc/en-us/articles/204332302
     */
    tickLimit: number;

    /**
     * An amount of unused CPU accumulated in your bucket.
     * http://support.screeps.com/hc/en-us/articles/204332302
     */
    bucket: number;
  }

  /**
   * Main game indicator affecting cpu limit and amount of rooms you can control.
   * http://support.screeps.com/hc/en-us/articles/203086021-Territory-control
   */
  interface GCL {
    /**
     * The current level.
     */
    level: number;

    /**
     * The current progress to the next level.
     */
    progress: number;

    /**
     * The progress required to reach the next level.
     */
    progressTotal: number;
  }

  /**
   * An object with the structure’s owner info (if present).
   */
  interface Owner {
    /**
     * The name of the owner user.
     */
    username: string;
  }
  
  /**
   * An object with the controller reservation info if present.
   */
  interface Reservation {
    /**
     * The name of a player who reserved this controller.
     */
    username: string;
    
    /**
     * The amount of game ticks when the reservation will end.
     */
    ticksToEnd: number;
  }
  
  /**
   * An object with the storage contents.
   */
  interface Store {
    /**
     * The amount of energy resource units.
     */
    energy: number;
    
    /**
     * The amount of power resource units if present, undefined otherwise.
     */
    power: number|void;
  }

  /**
   * Represents a hash table maping some object type to a string key.
   */
  interface HashTable<T> {
    [key: string]: T
  }
}
