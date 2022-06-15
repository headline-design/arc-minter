import actions from '../../algorand/global/globalActions';

interface ReducerData {
  type: string;
  payload?: any;
}

interface PipeConnectState {
  myAddress?: string;
  mainNet?: boolean;
  provider?: string;
}

export const algorandGlobalInitialData = {
  pipeConnectState: {
    myAddress: JSON.parse(String(localStorage.getItem('pipeConnectState')))?.myAddress || '',
    mainNet: JSON.parse(String(localStorage.getItem('pipeConnectState')))?.mainNet ?? true,
    provider: JSON.parse(String(localStorage.getItem('pipeConnectState')))?.provider || '',
  } as PipeConnectState,
  loading: false,
  marketCapData: [] as Array<any>,
  algoPriceData: [] as Array<any>,
};

export default (state = algorandGlobalInitialData, { type, payload }: ReducerData) => {
  if (type === actions.PIPE_CONNECT_CHANGE) {
    localStorage.setItem('pipeConnectState', JSON.stringify(payload));
    return {
      ...state,
      pipeConnectState: payload,
    };
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      marketCapData: payload.marketCapData,
      algoPriceData: payload.algoPriceData,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
