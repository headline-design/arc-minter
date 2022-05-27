import { Dispatch } from 'react';
import Pipeline from '@pipeline-ui-2/pipeline';
import algorandGlobalActions from '../algorand/global/globalActions';

const authActions = {
    doDisconnect: () => async (dispatch: Dispatch<any>) => {
        try {
            Pipeline.pipeConnector = ''
            localStorage.removeItem('pipeConnectState');
            dispatch(algorandGlobalActions.doPipeConnectChange({}));
        } catch (error) {
            console.log(error);
        }
    },
};

export default authActions;
