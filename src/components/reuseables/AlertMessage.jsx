import React from 'react';
import PropTypes from 'prop-types';
import style from '../../styles/modal.css';

function AlertMessage(props) {
  const { openModal, message, resetState } = props;
  return (
    <div>
      {openModal && (
        <div className={style.modal}>
          <div className={style.modal_body}>
            <p>{message}</p>
            <button
              onClick={resetState}
              className={style.modal_btn}
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
  resetState: PropTypes.func,
  openModal: PropTypes.bool,
};

AlertMessage.defaultProps = {
  message: '',
  resetState: f => f,
  openModal: false,
};

export default AlertMessage;
