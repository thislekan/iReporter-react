import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles/SingleReport.css';

function SingleReport(props) {
  const {
    location,
    id,
    incidentLocation,
    type,
    createdOn,
    status,
    // openDetails,
    fetchIncident,
    alterDeleteModal,
    title,
    alterEditModal,
  } = props;
  return (
    <div>
      <div className={style['report-body-wrapper']}>
        <div className={style['report-details']}>
          <div className={style['incident-intro']}>
            <FontAwesomeIcon icon='check-circle' />
            <h4>Title: </h4>
          </div>
          <p>{title}</p>
        </div>
        <div className={style['report-details']}>
          <div className={style['incident-intro']}>
            <FontAwesomeIcon icon='check-circle' />
            <h4>Type: </h4>
          </div>
          <p>{type}</p>
        </div>
        <div className={style['report-details']}>
          <div className={style['incident-intro']}>
            <FontAwesomeIcon icon='check-circle' />
            <h4>Date: </h4>
          </div>
          <p>{moment(Number(createdOn)).format('MMMM Do YYYY')}</p>
        </div>
        <div className={style['report-details']}>
          <div className={style['incident-intro']}>
            <FontAwesomeIcon icon='check-circle' />
            <h4>Status: </h4>
          </div>
          <p>{status}</p>
        </div>
        <div className={style['report-details']}>
          <div className={style['incident-intro']}>
            <FontAwesomeIcon icon='check-circle' />
            <h4>Location: </h4>
          </div>
          <p>{incidentLocation}</p>
        </div>
        <div className={style['bottom-div']}>
          <div className={style['btn-div']}>
            <button
              className={style['view-btn']}
              onClick={() => fetchIncident(id, incidentLocation)}
            >
              Details
            </button>
            <button
              className={style['edit-btn']}
              onClick={() => alterEditModal(id)}
            >
              Edit
            </button>
            {
              (location.pathname === '/admin') ? '' : <button
                className={style['delete-btn']}
                onClick={() => {
                  alterDeleteModal();
                  sessionStorage.setItem('id', id);
                  sessionStorage.setItem('type', type);
                }}
              >
                Delete
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

SingleReport.propTypes = {
  // openDetails: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  incidentLocation: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  fetchIncident: PropTypes.func.isRequired,
  alterDeleteModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  alterEditModal: PropTypes.func.isRequired,
};

export default SingleReport;
