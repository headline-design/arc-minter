import AlgorandService from '../../../services/algorandService';
import { Dispatch } from 'react';

const prefix = 'ALGORAND_GLOBAL';

const globalActions = {
  PIPE_CONNECT_CHANGE: `${prefix}_PIPE_CONNECT_CHANGE`,
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doPipeConnectChange: (obj: any) => async (dispatch: Dispatch<any>) => {
    dispatch({
      type: globalActions.PIPE_CONNECT_CHANGE,
      payload: obj,
    });
  },

  doFetch: () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: globalActions.FETCH_STARTED,
      });

      const data = await AlgorandService.getAlgorandGlobal();

      dispatch({
        type: globalActions.FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: globalActions.FETCH_ERROR,
      });
    }
  },
};

export default globalActions;
