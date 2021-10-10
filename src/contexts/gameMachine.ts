/**
 * TODO: xstate context for other values
 */

import { createMachine } from 'xstate';

/**
 * TODO: Actions could go here:
 * - handle restart
 * - handle select cell
 * - set mouse down
 */

export interface GameContextType {
  startTime: number;
  flagCount: number;
  isMouseDown: boolean;
}

const gameMachine = createMachine<GameContextType>({
  id: 'game',
  initial: 'fresh',
  states: {
    fresh: {
      on: {
        RESUME: 'running',
      },
    },
    paused: {
      on: {
        RESUME: 'running',
      },
    },
    running: {
      on: {
        PAUSE: 'paused',
        LOSE: 'lost',
        WIN: 'won',
        RESTART: 'fresh',
      },
    },
    lost: {
      on: {
        RESTART: 'fresh',
      },
    },
    won: {
      on: {
        RESTART: 'fresh',
      },
    },
  },
  context: {
    startTime: 0,
    flagCount: 0,
    isMouseDown: false,
  },
});

export default gameMachine;
