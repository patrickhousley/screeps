import * as main from "../src/main";
import { mockInstanceOf } from "screeps-jest/src/mocking";

describe("main", () => {
  beforeEach(() => {
    Game.getObjectById = jest.fn();
  });

  test("main should export a loop function", () => {
    expect(typeof main.loop).toEqual("function");
  });

  test("loop should not have a return value", () => {
    expect(main.loop()).toBeUndefined();
  });

  test("main should delete memory of missing creeps", () => {
    const test1 = mockInstanceOf<Creep>({ memory: { role: "" } });
    const test2 = mockInstanceOf<Creep>({ memory: { role: "" } });

    Memory.creeps = { test1: test1.memory, test2: test2.memory };
    Game.creeps = { test1 };

    main.loop();

    expect(Memory.creeps.test1).toBeDefined();
    expect(Memory.creeps.test2).not.toBeDefined();
  });
});
