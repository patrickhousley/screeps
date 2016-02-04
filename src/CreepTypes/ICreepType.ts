///<reference path="../../typings/screeps.d.ts"/>

module CreepTypes {
  export interface CreepType {
    setCreep(value:Creep): void;
    perform(): void;
  }
}