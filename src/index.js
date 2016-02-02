import {Spawner} from './spawner.js';

export function loop() {
  let spawner = new Spawner();
  
  spawner.builders.push('test');
}
