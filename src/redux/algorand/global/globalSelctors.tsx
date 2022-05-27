import { createSelector } from 'reselect';

const selectRaw = (state: any) => state.algorand.global;

const selectPipeConnectState = createSelector(
  [selectRaw],
  (raw: any) => raw.pipeConnectState,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw: any) => Boolean(raw.loading),
);

const selectMarketCapData = createSelector(
  [selectRaw],
  (raw: any) => raw.marketCapData,
);

const selectAlgoPriceData = createSelector(
  [selectRaw],
  (raw: any) => raw.algoPriceData,
);

const globalSelectors = {
  selectPipeConnectState,
  selectLoading,
  selectMarketCapData,
  selectAlgoPriceData,
  selectRaw,
};

export default globalSelectors;
