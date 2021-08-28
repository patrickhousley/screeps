import { mockGlobal } from "screeps-jest/src/mocking";

mockGlobal<Game>("Game", { time: 1, creeps: {} });
mockGlobal<Memory>("Memory", { creeps: {} });
