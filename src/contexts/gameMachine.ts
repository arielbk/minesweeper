/**
 * TODO: use xstate -- use a state machine for the state of the game
 * possible states:
 * - fresh
 * - running
 * - lost
 * - won
 */

// xstate with react and typescript template:
// https://codesandbox.io/s/xstate-react-typescript-template-wjdvn?file=/src/index.tsx:118-124

import { createMachine } from 'xstate';

/**
 * Actions could go here:
 * - handle restart
 * - handle select cell
 * - set mouse down
 */

interface GameContext {
  startTime: number;
  flagCount: number;
  isMouseDown: boolean;
}

const gameMachine = createMachine<GameContext>({
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
