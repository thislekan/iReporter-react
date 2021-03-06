import React from 'react';
import PropTypes from 'prop-types';
import style from '../../styles/modal.css';

function AlertMessage(props) {
  const { openModal, message, resetState } = props;
  return (
    <div>
      {openModal && (
        <div className={style.alert}>
          <div className={style.alert_body}>
            <p>{message}</p>
            <button
              onClick={resetState}
              className={style.alert_btn}
              id='alert-msg-btn'
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string,
  resetState: PropTypes.func.isRequired,
  openModal: PropTypes.bool,
};

AlertMessage.defaultProps = {
  message: '',
  openModal: false,
};

export default AlertMessage;
