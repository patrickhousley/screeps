/**
 * The main global game object containing all the gameplay information.
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

interface Creep {

}

interface Flag {

}

interface Map {

}

interface Room {

}

interface Spawn {

}

interface Structure {

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
 * Represents a hash table maping some object type to a string key.
 */
interface HashTable<T> {
  [key: string]: T
}
