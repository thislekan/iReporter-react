import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles/ReportDetails.css';

function ReportDetails(props) {
  const { incident, mapUrl } = props;
  return (
    <div className={style['report-body-wrapper']}>
      <div id="detailed-incident">
        <div className={cx(style['report-body-wrapper'], style.pushed)}>
          <div className={style['report-details']}>
            <div className={style['incident-intro']}>
              <FontAwesomeIcon icon='check-circle' />
              <h4>ID: </h4>
            </div>
            <p id="incident-id">{incident.id}</p>
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
            <p id="incident-date">{moment(Number(incident.createdOn)).format('MMM Do YY')}</p>
          </div>
          <div className={style['report-details']}>
            <div className={style['incident-intro']}>
              <FontAwesomeIcon icon='check-circle' />
              <h4>Status: </h4>
            </div>
            <p id="incident-status">{incident.status}</p>
          </div>
          <div className={style['report-details']}>
            <div className={style['incident-intro']}>
              <FontAwesomeIcon icon='check-circle' />
              <h4>Title: </h4>
            </div>
            <p id="incident-title">{incident.title}</p>
          </div>
          <div className={style['location-div']}>
            <div className={style['report-details']}>
              <div className={style['incident-intro']}>
                <FontAwesomeIcon icon='check-circle' />
                <h4>Location: </h4>
              </div>
              <p id="incident-location">{incident.location}</p>
            </div>
            <div className={style.map}>
              <h4>Map</h4>
              <div className={style['map-region']}>
                <iframe
                  src={mapUrl}
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  title={`${incident.location}'s map`}
                  style={{ border: 0, position: 'absolute' }}
                  allowFullScreen
                />
              </div>
            </div>
            <div className={style['comment-div']}>
              <h4>Comment: </h4>
              <textarea
                name="comment"
                id="incident-comment"
                disabled
                value={(incident.comment) ? incident.comment : ''}
              />
            </div>
          </div>
          {(incident.images || incident.video) && <div className={style['image-and-video-div']}>
            <h4>Images or Videos: </h4>
            <div className={style['content-wrapper']}>
              <div id="incident-video-div"></div>
              {incident.images && incident.images.length >= 1 && (
                <div className={style['image-container']} id="incident-img-div">
                  {incident.images.map((image, index) => <img src={image} key={index} alt="" />)}
                </div>
              )}
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

ReportDetails.propTypes = {
  incident: PropTypes.object.isRequired,
  mapUrl: PropTypes.string,
};

ReportDetails.defaultProps = {
  mapUrl: '',
};

export default ReportDetails;
