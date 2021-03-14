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

const gameMachine = createMachine({
  id: 'game',
  initial: 'fresh',
  states: {
    fresh: {
      on: {
        START: 'running',
      },
    },
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
});

export default gameMachine;
