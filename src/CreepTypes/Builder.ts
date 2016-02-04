/// <reference path="./ICreepType.ts" />

module CreepTypes {
  export const BuilderTypes: { [key:string]: Array<String>; } = {
    'Simple': ['WORK', 'CARRY','MOVE']
  };
  
  export class Builder implements CreepType {
    private creep:Creep;
    
    setCreep(creep:Creep) {
      this.creep = creep;
    }

    perform() {
      
    }
  }
}