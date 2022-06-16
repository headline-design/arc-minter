import { PREFERRED_DECIMALS } from './constants';
import { algorandGlobalInitialData } from '../redux/algorand/global/globalReducers';
import { Dispatch } from 'redux';
import Pipeline from '@pipeline-ui-2/pipeline';
import algorandGlobalActions from '../redux/algorand/global/globalActions';

const _ = require('lodash');

/**
 * Shortens string to `XXXX...XXXX`, with `XXX` padding determined by optional `pad` parameter
 */
export function truncateString(str: string, pad = 6) {
  const { length } = str;
  const start = str.substring(0, pad);
  return `${start}...${str.substring(length - pad, length)}`;
}

/**
 * Rounds a number without unnecessary trailing zeros
 * @param num Number to round.
 * @param decimals Round the number to this many decimals or the default value if missing.
 * @return The rounded number or undefined it the param was undefined.
 * */
export function prettyRound(num: number, decimals = PREFERRED_DECIMALS) {
  if (num !== undefined) {
    return parseFloat(num.toFixed(decimals));
  }
  return num;
}

/**
 * Gets the current Global Pipe State.
 * @param globalPipeState The current pipe state.
 * @return The current state or the initial pipe state values if the state is empty.
 * */
export function getCurrentGlobalPipeState(globalPipeState: any) {
  return _.isEmpty(globalPipeState) ? algorandGlobalInitialData.pipeConnectState : globalPipeState;
}

/**
 * Check whether the Global Pipe State will change with the given input or not.
 * @param globalPipeState The current pipe state.
 * @param newData The presumed changed pipe state.
 * @return Returns true if the input will change the pipe state, false otherwise.
 * */
export function globalPipeStateChanged(globalPipeState: any, newData: object): boolean {
  let changed = false;
  Object.entries(newData).forEach(([key, value]) => {
    if (globalPipeState[key] !== value) {
      changed = true;
      return;
    }
  });
  return changed;
}

/**
 * Switch Algorand network.
 * @param isMainNet True if the network type to set is MainNet, TestNet otherwise.
 * @param dispatch The Redux dispatch function.
 * @param globalPipeState The current pipe state.
 * */
export const switchNet = (isMainNet: boolean, dispatch: Dispatch<any>, globalPipeState: any) => {
  Pipeline.main = isMainNet;
  dispatch(
    algorandGlobalActions.doPipeConnectChange({
      ...getCurrentGlobalPipeState(globalPipeState),
      mainNet: isMainNet,
    }),
  );
};
