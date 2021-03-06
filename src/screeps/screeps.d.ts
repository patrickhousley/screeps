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
  interface Structure extends RoomPositionContainer {
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
     * An object with the structure???s owner info (if present).
     */
    owner: Owner;

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
    transferEnergy(target: Creep, amount?: number): ResultCode;
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
    transferEnergy(target: Creep|Structure, amount?: number): ResultCode;
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
    transferEnergy(target: Creep, amount?: number): ResultCode;
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
    transfer(target: Creep, resourceType: ResourceType, amount?: number): ResultCode;

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
    transferEnergy(target: Creep, amount?: number): ResultCode;
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
    transferEnergy(target: Creep, amount?: number): ResultCode;
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

  /**
   * A site of a structure which is currently under construction. A construction site can be created using
   * the 'Construct' button at the left of the game field or the Room.createConstructionSite() method. To build
   * a structure on the construction site, give a worker creep some amount of energy and perform Creep.build() action.
   * http://support.screeps.com/hc/en-us/articles/203016342-ConstructionSite
   */
  interface ConstructionSite extends RoomPositionContainer {
    /**
     * A unique object identificator. You can use Game.getObjectById method to retrieve an object instance by its id.
     * http://support.screeps.com/hc/en-us/articles/203016382-Game#getObjectById
     */
    id: string;

    /**
     * Whether this is your own construction site.
     */
    my: boolean;

    /**
     * An object with the structure???s owner info.
     */
    owner: Owner;

    /**
     * The current construction progress.
     */
    progress: number;

    /**
     * The total construction progress needed for the structure to be built.
     */
    progressTotal: number;

    /**
     * The link to the Room object of this structure.
     */
    room: Room;

    /**
     * One of the STRUCTURE_* constants.
     */
    structureType: StructureType;

    /**
     * Remove the construction site.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this construction site.
     */
    remove(): ResultCode;
  }

  /**
   * Creeps are your units. Creeps can move, harvest energy, construct structures,
   * attack another creeps, and perform other actions. Each creep consists of up to 50 body parts
   */
  interface Creep extends RoomPositionContainer {
    /**
     * An array describing the creep???s body.
     */
    body: Array<BodyPart>;

    /**
     * An object with the creep's cargo contents.
     */
    carry: Store;

    /**
     * The total amount of resources the creep can carry.
     */
    carryCapacity: number;

    /**
     * The movement fatigue indicator. If it is greater than zero, the creep cannot move.
     */
    fatigue: number;

    /**
     * The current amount of hit points of the creep.
     */
    hits: number;

    /**
     * The maximum amount of hit points of the creep.
     */
    hitsMax: number;

    /**
     * A unique object identificator. You can use Game.getObjectById method to retrieve an object instance by its id.
     * http://support.screeps.com/hc/en-us/articles/203016382-Game#getObjectById
     */
    id: string;

    /**
     * A shorthand to Memory.creeps[creep.name]. You can use it for quick access the creep???s specific memory data object.
     * Note: you can't access the memory property of the creep object which has been just scheduled to spawn, but you still
     * can write its memory like that
     */
    memory: Object;

    /**
     * Whether it is your creep or foe.
     */
    my: boolean;

    /**
     * Creep???s name. You can choose the name while creating a new creep, and it cannot be changed later. This name is a hash key
     * to access the creep via the Game.creeps object.
     */
    name: string;

    /**
     * An object with the creep???s owner info.
     */
    owner: Owner;

    /**
     * The link to the Room object of this creep.
     */
    room: Room;

    /**
     * Whether this creep is still being spawned.
     */
    spawning: boolean;

    /**
     * The remaining amount of game ticks after which the creep will die.
     */
    ticksToLive: number;

    /**
     * Attack another creep or structure in a short-ranged attack. Requires the ATTACK body part. If the target is
     * inside a rampart, then the rampart is attacked instead. The target has to be at adjacent square to the creep.
     * If the target is a creep with ATTACK body parts and is not inside a rampart, it will automatically hit back
     * at the attacker.
     * @param target The target object to be attacked.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid attackable object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no ATTACK body parts in this creep???s body.
     */
    attack(target: Creep|Structure): ResultCode;

    /**
     * Build a structure at the target construction site using carried energy. Requires WORK and CARRY body parts. The
     * target has to be within 3 squares range of the creep.
     * @param target The target construction site to be built.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.\
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not have any carried energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid construction site object or the structure cannot be built
     * here (probably because of a creep at the same square).
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no WORK body parts in this creep???s body.
     * ERR_RCL_NOT_ENOUGH => -14 : The Room Controller Level is not enough. Learn more
     */
    build(target: ConstructionSite): ResultCode;

    /**
     * Cancel the order given during the current game tick.
     * @param methodName The name of a creep's method to be cancelled.
     * @returns One of the following codes:
     * OK => 0 : The operation has been cancelled successfully.
     * ERR_NOT_FOUND => -5 : The order with the specified name is not found.
     */
    cancelOrder(methodName: string): ResultCode;

    /**
     * Requires the CLAIM body part. If applied to a neutral controller, claims it under your control. If applied to a
     * hostile controller, decreases its downgrade or reservation timer depending on the CLAIM body parts count. The
     * target has to be at adjacent square to the creep.
     * @param target The target controller object.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid neutral controller object.
     * ERR_FULL => -8 : You cannot claim more than 3 rooms in the Novice Area.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no CLAIM body parts in this creep???s body.
     * ERR_GCL_NOT_ENOUGH => -15 : Your Global Control Level is not enough. Learn more
     */
    claimController(target: Controller): ResultCode;

    /**
     * Dismantles any (even hostile) structure returning 50% of the energy spent on its repair. Requires the WORK body
     * part. If the creep has an empty CARRY body part, the energy is put into it; otherwise it is dropped on the ground.
     * The target has to be at adjacent square to the creep.
     * @param target The target structure.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.\
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid creep object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no WORK body parts in this creep???s body.
     */
    dismantle(target: Structure): ResultCode;

    /**
     * Drop this resource on the ground.
     * @param resopurceType One of the RESOURCE_* constants.
     * @param amount The amount of resource units to be dropped. If omitted, all the available carried amount is used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not have the given amount of energy.
     */
    drop(resourceType: ResourceType, amount?: number): ResultCode;

    /**
     * An alias for creep.drop(RESOURCE_ENERGY, amount). This method is deprecated.
     * @param resopurceType One of the RESOURCE_* constants.
     * @param amount The amount of resource units to be dropped. If omitted, all the available carried amount is used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not have the given amount of energy.
     */
    dropEnergy(): ResultCode;
    dropEnergy(amount: number): ResultCode;

    /**
     * Get the quantity of live body parts of the given type. Fully damaged parts do not count.
     * @param type A body part type.
     * @returns A number representing the quantity of body parts.
     */
    getActiveBodyparts(type: BodyPart): number;

    /**
     * Harvest energy from the source. Requires the WORK body part. If the creep has an empty CARRY body part, the harvested
     * energy is put into it; otherwise it is dropped on the ground. The target has to be at an adjacent square to the creep.
     * @param target The source object to be harvested.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep, or the room controller is owned or reserved by another player.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The target source does not contain any harvestable energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid source object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no WORK body parts in this creep???s body.
     */
    harvest(target: Source): ResultCode;

    /**
     * Heal self or another creep. It will restore the target creep???s damaged body parts function and increase the hits
     * counter. Requires the HEAL body part. The target has to be at adjacent square to the creep.
     * @param target The target creep object.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid creep object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.\
     * ERR_NO_BODYPART => -12 : There are no HEAL body parts in this creep???s body.
     */
    heal(target: Creep): ResultCode;

    /**
     * Move the creep one square in the specified direction. Requires the MOVE body part.
     * @param direction One of the Direction enum values.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_TIRED => -11 : The fatigue indicator of the creep is non-zero.
     * ERR_NO_BODYPART => -12 : There are no MOVE body parts in this creep???s body.
     */
    move(direction: Direction): ResultCode;

    /**
     * Move the creep using the specified predefined path. Requires the MOVE body part.
     * @param path A path value as returned from Room.findPath or RoomPosition.findPathTo methods. Both array
     * form and serialized string form are accepted.
     * http://support.screeps.com/hc/en-us/articles/203079011-Room#findPath
     * http://support.screeps.com/hc/en-us/articles/203079201-RoomPosition#findPathTo
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_FOUND => -5 : The specified path doesn't match the creep's location.
     * ERR_INVALID_ARGS => -10 : path is not a valid path array.
     * ERR_TIRED => -11 : The fatigue indicator of the creep is non-zero.
     * ERR_NO_BODYPART => -12 : There are no MOVE body parts in this creep???s body.
     */
    moveByPath(path: Array<Path>): ResultCode;

    /**
     * Find the optimal path to the target within the same room and move to it. A shorthand to consequent calls of
     * pos.findPathTo() and move() methods. If the target is in another room, then the corresponding exit will be
     * used as a target. Requires the MOVE body part.
     * @param x X position of the target in the room.
     * @param y Y position of the target in the room.
     * @param target Can be a RoomPosition object or any object containing RoomPosition.
     * @param opts An object containing pathfinding options flags.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_TIRED => -11 : The fatigue indicator of the creep is non-zero.
     * ERR_NO_BODYPART => -12 : There are no MOVE body parts in this creep???s body.
     * ERR_INVALID_TARGET => -7 : The target provided is invalid.
     * ERR_NO_PATH => -2 : No path to the target could be found.
     */
    moveTo(x: number, y: number, opts?: CreepPathfindingOpts): ResultCode;
    moveTo(target: RoomPosition, opts?: CreepPathfindingOpts): ResultCode;

    /**
     * Toggle auto notification when the creep is under attack. The notification will be sent to your account email.
     * Turned on by default.
     * @param enable Whether to enable notification or disable.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_INVALID_ARGS => -10 : enable argument is not a boolean value.
     */
    notifyWhenAttacked(enabled: boolean): ResultCode;

    /**
     * Pick up an item (a dropped piece of energy). Requires the CARRY body part. The target has to be at adjacent
     * square to the creep or at the same square.
     * @param target The target object to be picked up.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid object to pick up.
     * ERR_FULL => -8 : The creep cannot receive any more energy.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     */
    pickup(target: Resource): ResultCode;

    /**
     * A ranged attack against another creep or structure. Requires the RANGED_ATTACK body part. If the target is
     * inside a rampart, the rampart is attacked instead. The target has to be within 3 squares range of the creep.
     * @param target The target object to be attacked.
     * @returns One of the following codes:
     * OK=> 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid attackable object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no RANGED_ATTACK body parts in this creep???s body.
     */
    rangedAttack(target: Creep|Structure): ResultCode;

    /**
     * Heal another creep at a distance. It will restore the target creep???s damaged body parts function and increase
     * the hits counter. Requires the HEAL body part. The target has to be within 3 squares range of the creep.
     * @param target The target creep object.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid creep object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no HEAL body parts in this creep???s body.
     */
    rangedHeal(target: Creep): ResultCode;

    /**
     * A ranged attack against all hostile creeps or structures within 3 squares range. Requires the RANGED_ATTACK
     * body part. The attack power depends on the range to each target. Friendly units are not affected.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NO_BODYPART => -12 : There are no RANGED_ATTACK body parts in this creep???s body.
     */
    rangedMassAttack(): ResultCode;

    /**
     * Repair a damaged structure using carried energy. Requires the WORK and CARRY body parts. The target has to be
     * within 3 squares range of the creep.
     * @param target The target structure to be repaired.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not carry any energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid creep object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no WORK body parts in this creep???s body.
     */
    repair(target: Structure): ResultCode;

    /**
     * Temporarily block a neutral controller from claiming by other players. Each tick, this command increases
     * the counter of the period during which the controller is unavailable by 1 tick per each CLAIM body part.
     * The maximum reservation period to maintain is 5,000 ticks. The target has to be at adjacent square to the
     * creep.
     * @param target The target controller object to be reserved.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_INVALID_TARGET => -7 : The target is not a valid neutral controller object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no CLAIM body parts in this creep???s body.
     */
    reserveController(target: Controller): ResultCode;

    /**
     * Display a visual speech balloon above the creep with the specified message. The message will disappear
     * after a few seconds. Useful for debugging purposes. Only the creep's owner can see the speech message.
     * @param message The message to be displayed. Maximum length is 10 characters.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     */
    say(message: string): ResultCode;

    /**
     * Kill the creep immediately.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     */
    suicide(): ResultCode;

    /**
     * Transfer resource from the creep to another object. The target has to be at adjacent square to the creep.
     * @param target The target object.
     * @param resourceType One of the RESOURCE_* constants.
     * @param amount The amount of resources to be transferred. If omitted, all the available carried amount is used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not have the given amount of energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid object which can contain energy.
     * ERR_FULL => -8 : The target cannot receive any more energy.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_INVALID_ARGS => -10 : The energy amount is incorrect.
     */
    transfer(target: Creep|Structure, resourceType: ResourceType, amount?: number): ResultCode;

    /**
     * An alias for creep.transfer(target, RESOURCE_ENERGY, amount). This method is deprecated.
     * @param target The target object.
     * @param amount The amount of resources to be transferred. If omitted, all the available carried amount is used.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not have the given amount of energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid object which can contain energy.
     * ERR_FULL => -8 : The target cannot receive any more energy.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_INVALID_ARGS => -10 : The energy amount is incorrect.
     */
    transfer(target: Creep|Structure, amount?: number): ResultCode;

    /**
     * Upgrade your controller to the next level using carried energy. Upgrading controllers raises your Global
     * Control Level in parallel. Requires WORK and CARRY body parts. The target has to be at adjacent square to
     * the creep. A fully upgraded level 8 controller can't be upgraded with the power over 15 energy units per
     * tick regardless of creeps power. The cumulative effect of all the creeps performing upgradeController in
     * the current tick is taken into account.
     * @param target The target controller object to be upgraded.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_NOT_OWNER => -1 : You are not the owner of this creep.
     * ERR_BUSY => -4 : The creep is still being spawned.
     * ERR_NOT_ENOUGH_RESOURCES => -6 : The creep does not have any carried energy.
     * ERR_INVALID_TARGET => -7 : The target is not a valid controller object.
     * ERR_NOT_IN_RANGE => -9 : The target is too far away.
     * ERR_NO_BODYPART => -12 : There are no WORK body parts in this creep???s body.
     */
    upgradeController(target: Controller): ResultCode;
  }

  /**
   * A flag. Flags can be used to mark particular spots in a room. Flags are visible to their owners only.
   */
  interface Flag extends RoomPositionContainer {
    /**
     * A unique object identificator. You can use Game.getObjectById method to retrieve an object instance by its id.
     */
    id: string;

    /**
     * Flag color.
     */
    color: Color;

    /**
     * A shorthand to Memory.flags[flag.name]. You can use it for quick access the flag's specific memory data object.
     */
    memory: Object;

    /**
     * Flag???s name. You can choose the name while creating a new flag, and it cannot be changed later. This name is a
     * hash key to access the spawn via the Game.flags object.
     */
    name: string;

    /**
     * The link to the Room object. May not be available in case a flag is placed in a room which you do not have access to.
     */
    room: Room;

    /**
     * The name of the room in which this flag is in. This property is deprecated and will be removed soon. Use pos.roomName instead.
     */
    roomName: string;

    /**
     * Remove the flag.
     * @returns s One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     */
    remove(): ResultCode;

    /**
     * Set new color of the flag.
     * @param color One of the color contants.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_INVALID_ARGS => -10 : color is not a valid color constant.
     */
    setColor(color: Color): ResultCode;

    /**
     * Set new position of the flag.
     * @param x The X position in the room.
     * @param y The Y position in the room.
     * @param pos Can be a RoomPosition object or any object containing RoomPosition.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_INVALID_TARGET => -7 : The target provided is invalid.
     */
    setPosition(x: number, y: number): ResultCode;
    setPosition(pos: RoomPosition|RoomPositionContainer): ResultCode;
  }

  /**
   * A global object representing world map. Use it to navigate between rooms. The
   * object is accessible via Game.map property.
   * http://support.screeps.com/hc/en-us/articles/203016382-Game#map
   */
  interface Map {
    /**
     * List all exits available from the room with the given name.
     * @param roomName The room name.
     * @returns The exits information.
     * TODO: Find a better way to describe the output of this function.
     */
    describeExits(roomName: string): Object|void;
    
    /**
     * Find the exit direction from the given room en route to another room.
     * @param fromRoom Start room name or room object.
     * @param toRoom Finish room name or room object.
     * @returns The room direction constant or an error code:
     * ERR_NO_PATH => -2 : Path can not be found.
     * ERR_INVALID_ARGS => -10 : The location is incorrect.
     */
    findExit(fromRoom: string|Room, toRoom: string|Room): Direction|ResultCode;
    
    /**
     * Find route from the given room to another room.
     * @param fromRoom Start room name or room object.
     * @param toRoom Finish room name or room object.
     * @returns The route array or one of the following error code:
     * ERR_NO_PATH => -2 : Path can not be found.
     */
    findRoute(fromRoom: string|Room, toRoom: string|Room): Array<RoomExit>|ResultCode;
    
    /**
     * Check if the room with the given name is protected by temporary "newbie" walls.
     * @param roomName The room name.
     * @returns A boolean value.
     */
    isRoomProtected(roomName: string): boolean;
  }
  
  /**
   * RawMemory object allows to implement your own memory stringifier instead of built-in serializer based on
   * JSON.stringify.
   * http://support.screeps.com/hc/en-us/articles/203016642-Working-with-Memory
   */
  interface RawMemory {
    /**
     * Get a raw string representation of the Memory object.
     * @returns Returns a string value.
     */
    get(): string;
    
    /**
     * Set new memory value.
     * @param value New memory value as a string.
     */
    set(value: string): void;
  }

  /**
   * A dropped piece of resource. It will decay after a while if not picked up. Dropped resource pile decays
   * for ceil(amount/1000) units per tick. 
   */
  interface Resource extends RoomPositionContainer {
    /**
     * The amount of resource units containing.
     */
    amount: number;

    /**
     * A unique object identificator. You can use Game.getObjectById method to retrieve an object instance by
     * its id.
     */
    id: string;

    /**
     * One of the RESOURCE_* constants.
     */
    resourceType: ResourceType;

    /**
     * The link to the Room object of this object.
     */
    room: Room;
  }

  /**
   * An object representing the room in which your units and structures are in. It can be used to look around,
   * find paths, etc. Every object in the room contains its linked Room instance in the room property.
   */
  interface Room {
    /**
     * The Controller structure of this room, if present, otherwise undefined.
     */
    controller: Controller;
    
    /**
     * Total amount of energy available in all spawns and extensions in the room.
     */
    energyAvailable: number;
    
    /**
     * Total amount of energyCapacity of all spawns and extensions in the room.
     */
    energyCapacityAvailable: number;
    
    /**
     * A shorthand to Memory.rooms[room.name]. You can use it for quick access the room???s specific memory
     * data object.
     */
    memory: Object;
    
    /**
     * One of the game mode constants.
     */
    mode: GameMode;
    
    /**
     * The name of the room.
     */
    name: string;
    
    /**
     * The Storage structure of this room, if present, otherwise undefined.
     */
    storage: Structure|void;
    
    /**
     * An object with survival game info.
     */
    survivalInfo: SurvivalInfo;
    
    /**
     * Serialize a path array into a short string representation, which is suitable to store in memory.
     * Todo: Function is actually static and found on the global Room object. No way to realy implement
     * this in Typescript.
     * @param path A path array retrieved from Room.findPath.
     * http://support.screeps.com/hc/en-us/articles/203079011-Room#findPath
     * @returns A serialized string form of the given path.
     */
    serializePath(path: Array<Path>): string;
    
    /**
     * Deserialize a short string path representation into an array form.
     * Todo: Function is actually static and found on the global Room object. No way to realy implement
     * this in Typescript.
     * @param path A serialized path string.
     * @returns A path array.
     * http://support.screeps.com/hc/en-us/articles/203079011-Room#findPath
     */
    serializePath(path: string): Array<Path>;
    
    /**
     * Create new ConstructionSite at the specified location.
     * @param x The X position.
     * @param y The Y position.
     * @param pos Can be a RoomPosition object or any object containing RoomPosition.
     * @param structureType One of the STRUCTURE_* constants.
     * @returns One of the following codes:
     * OK => 0 : The operation has been scheduled successfully.
     * ERR_INVALID_TARGET => -7 : The structure cannot be placed at the specified location.
     * ERR_FULL => -8 : You have too many construction sites. The maximum number of construction sites per player is 100.
     * ERR_INVALID_ARGS => -10 : The location is incorrect.
     * ERR_RCL_NOT_ENOUGH => -14 : The Room Controller Level is not enough. Learn more
     */
    createConstructionSite(x: number, y: number, structureType: StructureType): ResultCode;
    createConstructionSite(pos: RoomPosition|RoomPositionContainer, structureType: StructureType): ResultCode;
    
    /**
     * Create new Flag at the specified location.
     * @param x The X position.
     * @param y The Y position.
     * @param pos Can be a RoomPosition object or any object containing RoomPosition.
     * @param name The name of a new flag. It should be unique, i.e. the Game.flags object should not contain
     * another flag with the same name (hash key). If not defined, a random name will be generated.
     * @param color The color of a new flag.
     * @returns The name of a new flag, or one of the following error codes:
     * ERR_NAME_EXISTS => -3 : There is a flag with the same name already.
     * ERR_INVALID_ARGS => -10 : The location or the color constant is incorrect.
     */
    createFlag(x: number, y: number, name?: string, color?: Color): string|ResultCode;
    createFlag(pos: RoomPosition|RoomPositionContainer, name?: string, color?: Color): string|ResultCode;
    
    /**
     * Find all objects of the specified type in the room.
     * @param type One of the room find constants.
     * @param opts An object with additional options.
     * @returns An array of the objects found.
     */
    find(type: RoomFind, opts?: RoomObjectfindingOpts): Array<Object>;
    
    /**
     * Find the exit direction en route to another room.
     * @param room Another room name or room object.
     * @returns One of the room direction constant or one of the following error codes:
     * ERR_NO_PATH => -2 : Path can not be found.
     * ERR_INVALID_ARGS => -10 : The location is incorrect.
     */
    findExitTo(room: string|Room): ExitFind;
    
    /**
     * Find an optimal path inside the room between fromPos and toPos using A* search algorithm.
     * http://en.wikipedia.org/wiki/A*_search_algorithm
     * @param fromPos The start position.
     * @param toPos The end position.
     * @param opts An object containing additonal pathfinding flags.
     * @returns An array with path steps.
     */
    findPath(fromPos: RoomPosition, toPos: RoomPosition, opts?: RoomPathfindingOpts): Array<Path>;
    
    /**
     * Creates a RoomPosition object at the specified location.
     * @param x The X position.
     * @param y The Y position.
     * @returns A RoomPosition object or null if it cannot be obtained.
     */
    getPositionAt(x: number, y: number): RoomPosition|void;
    
    /**
     * Get the list of objects at the specified room position.
     * http://support.screeps.com/hc/en-us/articles/203079011-Room#lookAt
     * @param x X position in the room.
     * @param y Y position in the room.
     * @param target Can be a RoomPosition object or any object containing RoomPosition.
     * @returns An array with objects at the specified position.
     */
    lookAt(x: number, y: number): Array<Object>;
    lookAt(target: RoomPosition): Array<Object>;
    
    /**
     * Get the list of objects at the specified room area.
     * http://support.screeps.com/hc/en-us/articles/203079011-Room#lookAtArea
     * @param top The top Y boundary of the area.
     * @param left The left X boundary of the area.
     * @param bottom The bottom Y boundary of the area.
     * @param right The right X boundary of the area.
     * @returns An object with all the objects in the specified area.
     */
    lookAtArea(top: number, left: number, bottom: number, right: number): Object;
    
    /**
     * Get an object with the given type at the specified room position.
     * @param type One of the look for types.
     * @param x X position in the room.
     * @param y Y position in the room.
     * @param target Can be a RoomPosition object or any object containing RoomPosition.
     * @returns An array of objects of the given type at the specified position if found. 
     */
    lookForAt(type: LookForType, x: number, y: number): Array<Object>;
    lookForAt(type: LookForType, target: RoomPosition): Array<Object>;
    
    /**
     * Get the list of objects with the given type at the specified room area.
     * @param type One of the look for types.
     * @param top The top Y boundary of the area.
     * @param left The left X boundary of the area.
     * @param bottom The bottom Y boundary of the area.
     * @param right The right X boundary of the area.
     * @returns An object with all the objects of the given type in the specified area.
     */
    lookForAtArea(type: LookForType, top: number, left: number, bottom: number, right: number): Object;
  }

  /**
   * An object representing the specified position in the room. Every object in the room contains RoomPosition
   * as the pos property. The position object of a custom location can be obtained using the
   * Room.getPositionAt() method or using the constructor.
   */
  interface RoomPosition {
    /**
     * You can create new RoomPosition object using its constructor.
     * @param x X position in the room.
     * @param y Y position in the room.
     * @param roomName The room name.
     */
    constructor(x: number, y: number, roomName: string): RoomPosition;
    
    /**
     * The name of the room.
     */
    roomName: string;
    
    /**
     * X position in the room.
     */
    x: number;
    
    /**
     * Y position in the room.
     */
    y: number;
    
    
  }

  /**
   * An energy source object. Can be harvested by creeps with a WORK body part.
   */
  interface Source extends RoomPositionContainer {
    /**
     * The remaining amount of energy.
     */
    energy: number;
    
    /**
     * The total amount of energy in the source.
     */
    energyCapacity: number;
    
    /**
     * A unique object identificator. You can use Game.getObjectById method to retrieve
     * an object instance by its id.
     */
    id: string;
    
    /**
     * The link to the Room object of this structure.
     */
    room: Room;
    
    /**
     * The remaining time after which the source will be refilled.
     */
    ticksToRegeneration: number;
  }

  /**
   * Spawns are your colony centers. You can transfer energy into it and create new creeps
   * using createCreep() method. 
   */
  interface Spawn extends Structure,RoomPositionContainer {
    /**
     * The amount of energy containing in the spawn.
     */
    energy: number;
    
    /**
     * The total amount of energy the spawn can contain.
     */
    energyCapacity: number;
    
    /**
     * The current amount of hit points of the spawn.
     */
    hits: number;
    
    /**
     * The maximum amount of hit points of the spawn.
     */
    hitsMax: number;
    
    /**
     * A unique object identificator. You can use Game.getObjectById method to retrieve an
     * object instance by its id.
     */
    id: string;
    
    /**
     * A shorthand to Memory.spawns[spawn.name]. You can use it for quick access the spawn???s
     * specific memory data object.
     */
    memory: Object;
    
    /**
     * Whether it is your spawn or foe.
     */
    my: boolean;
    
    /**
     * Spawn???s name. You choose the name upon creating a new spawn, and it cannot be changed
     * later. This name is a hash key to access the spawn via the Game.spawns object.
     */
    name: string;
    
    /**
     * An object with the spawn???s owner info.
     */
    owned: Owner;
    
    /**
     * The link to the Room object of this spawn.
     */
    room: Room;
    
    /**
     * Always equal to ???spawn???.
     */
    structureType: StructureType;
    
    /**
     * If the spawn is in process of spawning a new creep, this object
     * will contain the new creep???s information, or null otherwise.
     */
    spawning: SpawningCreep;
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
   * An object with the structure???s owner info (if present).
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
   * Depicts a single path step typeically used in an array to provide a path for a creep to move.
   */
  interface Path {
    /**
     * x position starting point.
     */
    x: number;

    /**
     * y position starting point.
     */
    y: number;

    /**
     * x position spaces to move.
     */
    dx: number;

    /**
     * y position spaces to move.
     */
    dy: number;

    /**
     * Direction to move.
     */
    direction: Direction;
  }
  
  interface SurvivalInfo {
    /**
     * Current score.
     */
    score: number;
    
    /**
     * Time to the next wave of invaders.
     */
    timeToWave: number;
    
    /**
     * Number of the next wave.
     */
    wave: number;
  }
  
  /**
   * Contains information about a spawning creep.
   */
  interface SpawningCreep {
    /**
     * The name of a new creep.
     */
    name: string;
    
    /**
     * Time needed in total to complete the spawning.
     */
    needTime: number;
    
    /**
     * Remaining time to go.
     */
    remainingTime: number;
  }
  
  /**
   * Interface for all objects that contains a room position.
   */
  interface RoomPositionContainer {
    /**
     * An object representing the position of this spawn in a room.
     */
    pos: RoomPosition;
  }
  
  /**
   * Represents a single room exit route returned as part of an array in map.findRoute.
   */
  interface RoomExit {
    exit: ExitFind;
    room: string;
  }

  /**
   * Represents a hash table maping some object type to a string key.
   */
  interface HashTable<T> {
    [key: string]: T;
  }
}
