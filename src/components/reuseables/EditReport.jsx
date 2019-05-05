import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import PropTypes from 'prop-types';
import style from '../../styles/editReport.css';

function EditReport(props) {
  const {
    incident,
    alterDisableComment,
    alterDisableLocation,
    disableComment,
    disableLocation,
    handleChange,
    comment,
    incidentLocation,
    location,
    disableStatus,
    alterDisableStatus,
    incidentStatus,
  } = props;
  return (
    <div className={style.editReport}>
      <div className={style.createReport}>
        <p><b>Edit an incident</b></p>
        <div className="edit__body">
          <div className="edit__body__wrapper">
            <div className={style['report-details']}>
              <div className={style['incident-intro']}>
                <FontAwesomeIcon icon='check-circle' />
                <h4>Title: </h4>
              </div>
              <p id="incident-title">{incident.title}</p>
            </div>
            <div className={style['report-details']}>
              <div className={style['incident-intro']}>
                <FontAwesomeIcon icon='check-circle' />
                <h4>Type: </h4>
              </div>
              <p id="incident-type">{incident.type}</p>
            </div>
            <div className={style['report-details']}>
              <div className={style['incident-intro']}>
                <FontAwesomeIcon icon='check-circle' />
                <h4>Created: </h4>
              </div>
              <p id="incident-date">{moment(Number(incident.createdOn)).format('MMMM Do YYYY')}</p>
            </div>
            {
              (location.pathname !== '/admin') ? null : <div className={style['report-details']}>
                <div className={style['incident-intro']}>
                  <FontAwesomeIcon icon='check-circle' />
                  <h4>Status: </h4>
                </div>
                <select
                  name="status"
                  id="incident-status"
                  onChange={handleChange}
                  onBlur={handleChange}
                  disabled={disableStatus}
                  value={incidentStatus}
                >
                  <option value="">Select status</option>
                  <option value="draft">Draft</option>
                  <option value="under-investigation">Under Investigation</option>
                  <option value="rejected">Rejected</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            }
            <div className={style['location-div']}>
              <div className={style['comment-div']}>
                <h4>Location: </h4>
                <textarea
                  name="location"
                  id="incident-location"
                  disabled={disableLocation}
                  value={incidentLocation}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={cx(style['comment-div'], style['location-div'])}>
              <h4>Comment</h4>
              <textarea
                type="text"
                name="comment"
                id="incident-comment"
                disabled={disableComment}
                value={comment}
                onChange={handleChange}
              />
            </div>
            <div className={style['edit-btn-div']}>
              {
                (location.pathname === '/admin') ? null : <button
                  className={cx(style['edit-btn'], style['edit-comment'])}
                  id="edit-comment-btn"
                  onClick={alterDisableComment}
                >
                  Edit Comment
              </button>
              }
              {
                (location.pathname === '/admin') ? null : <button
                  className={cx(style['edit-btn'], style['edit-location'])}
                  id="edit-location-btn"
                  onClick={alterDisableLocation}
                >
                  Edit Location
                </button>
              }
              {
                (location.pathname !== '/admin') ? null : <button
                  className={cx(style['edit-btn'], style['edit-comment'])}
                  id="edit-location-btn"
                  onClick={alterDisableStatus}
                >
                  Edit Status
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EditReport.propTypes = {
  incident: PropTypes.object.isRequired,
  alterDisableComment: PropTypes.func.isRequired,
  alterDisableLocation: PropTypes.func.isRequired,
  disableComment: PropTypes.bool.isRequired,
  disableLocation: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  incidentLocation: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  disableStatus: PropTypes.bool.isRequired,
  alterDisableStatus: PropTypes.func.isRequired,
  incidentStatus: PropTypes.string.isRequired,
};

export default EditReport;
