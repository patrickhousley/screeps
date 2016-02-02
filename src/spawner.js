
export class Spawner {
  constructor() {
    this[priv] = Object.create(null);
    Object.defineProperties(this[priv], {
      workers: {
        value: new Set(),
        writable: true,
      },
      builders: {
        value: new Set(),
        writable: true,
      },
      defenders: {
        value: new Set(),
        writable: true,
      },
      spawnOrder: {
        value: ['worker', 'builder', 'builder']
      },
      workerPercentile: {
        value: 0.5,
      },
      builderPercentile: {
        value: 0.1,
      },
      defenderPercentile: {
        value: 0.4,
      },
    });

    this.refresh();
  }

  get workers() {
    return this[priv].workers;
  }

  get builders() {
    return this[priv].builders;
  }

  get defenders() {
    return this[priv].defenders;
  }

  refresh() {
    Object.keys(Game.creeps).forEach((creepName) => {
      let creep = Game.creeps[creepName];

      if (!creep || !creep.memory || !creep.memory.role) {
        creep.suicide();
      } else {
        if (!this[priv][creep.memory.role]) {
          Object.defineProperty(this[priv], creep.memory.role, {
            value: new Set(),
            writable: true
          });
        }

        this[priv][creep.memory.role].add(creep);
      }
    });
  }

  spawn() {
    // Loop through the spawn order and test if percentile allows spawning
    let spawnType;
    this[priv].spawnOrder.forEach((type) => {
      const totalScreeps = this[priv].builders.size 
    })
  }
}
