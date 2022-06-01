import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pipeline from '@pipeline-ui-2/pipeline';
import algorandGlobalActions from '../../redux/algorand/global/globalActions';
import algorandGlobalSelectors from '../../redux/algorand/global/globalSelctors';
import { algorandGlobalInitialData } from '../../redux/algorand/global/globalReducers';
const _ = require('lodash');

function NetworkSwitch() {
  const onLabel = 'MainNet';
  const offLabel = 'TestNet';
  const dispatch = useDispatch();
  const globalPipeState = useSelector(
    algorandGlobalSelectors.selectPipeConnectState,
  );
  const [checked, setChecked] = useState(!globalPipeState.mainNet);

  const getPrevGlobalPipeState = () =>
    _.isEmpty(globalPipeState)
      ? algorandGlobalInitialData.pipeConnectState
      : globalPipeState;

  const switchNet = (networkType) => {
    Pipeline.main = networkType;
    dispatch(
      algorandGlobalActions.doPipeConnectChange({
        ...getPrevGlobalPipeState(),
        mainNet: networkType,
      }),
    );
  };

  return (
    <div>
      <input
        type="checkbox"
        id="checkedToggle"
        hidden
        className="jss35"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
      <label htmlFor="checkedToggle" className="networkToggleLabel">
        <div onClick={() => switchNet(true)}>{onLabel}</div>
        <div onClick={() => switchNet(false)}>{offLabel}</div>
      </label>
    </div>
  );
}

export default NetworkSwitch;
