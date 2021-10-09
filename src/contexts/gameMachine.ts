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
  initial: 'paused',
  states: {
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
        RESTART: 'paused',
      },
    },
    lost: {
      on: {
        RESTART: 'paused',
      },
    },
    won: {
      on: {
        RESTART: 'paused',
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
