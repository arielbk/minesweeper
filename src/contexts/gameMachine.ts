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
  initial: 'running',
  states: {
    running: {
      on: {
        LOSE: 'lost',
        WIN: 'won',
      },
    },
    lost: {
      on: {
        RESTART: 'running',
      },
    },
    won: {
      on: {
        RESTART: 'running',
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
