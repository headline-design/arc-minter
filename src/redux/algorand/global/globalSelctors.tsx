import { createSelector } from 'reselect';

const selectRaw = (state: any) => state.algorand.global;

const selectCurrentPipeConnectState = createSelector(
  [selectRaw],
  (global) => global.pipeConnectState,
);

const selectPipeConnectState = createSelector([selectRaw], (raw: any) => raw.pipeConnectState);

const selectSignedIn = createSelector(
  [selectCurrentPipeConnectState],
  (pipeConnectState) => Boolean(pipeConnectState.myAddress) && Boolean(pipeConnectState.provider),
);

const selectLoading = createSelector([selectRaw], (raw: any) => Boolean(raw.loading));

const selectMarketCapData = createSelector([selectRaw], (raw: any) => raw.marketCapData);

const selectAlgoPriceData = createSelector([selectRaw], (raw: any) => raw.algoPriceData);

const globalSelectors = {
  selectPipeConnectState,
  selectSignedIn,
  selectLoading,
  selectMarketCapData,
  selectAlgoPriceData,
  selectRaw,
};

export default globalSelectors;
