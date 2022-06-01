import React from 'react';

function ButtonSpinner({
  id,
  text,
  disabled = false,
  tabIndex = -1,
  styleObj = { marginBottom: 30 },
}) {
  return (
    <button
      className="MuiButtonBase-root MuiButton-root MuiButton-text jss21 jss23 jss22 Mui-disabled Mui-disabled"
      id={id}
      disabled={disabled}
      type="submit"
      style={styleObj}
      tabIndex={tabIndex}
    >
      <span className="MuiButton-label">
        {text}
        <div
          className="MuiCircularProgress-root jss24 MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"
          role="progressbar"
          style={{ width: 24, height: 24 }}
        >
          <svg
            className="MuiCircularProgress-svg css-13o7eu2"
            viewBox="22 22 44 44"
          >
            <circle
              className="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate css-14891ef"
              cx="44"
              cy="44"
              r="20.2"
              fill="none"
              strokeWidth="3.6"
            />
          </svg>
        </div>
      </span>
    </button>
  );
}

export default ButtonSpinner;
