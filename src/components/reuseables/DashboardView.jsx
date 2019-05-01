/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateReport from '../CreateReport.jsx';
import SingleReport from './SingleReport.jsx';
import ReportDetails from './ReportDetails.jsx';
import FilterComponent from '../search-and-filter/FilterComponent.jsx';
import SearchComponent from '../search-and-filter/SearchComponent.jsx';
import style from '../../styles/UserDashboard.css';
import promoImage from '../../media/promotion.svg';
import Loader from './Loader.jsx';
import EditReport from './EditReport.jsx';

const modalDefaultStyle = { content: { left: '20px', right: '20px', margin: '1rem 0' } };
const customizedStyle = {
  content: {
    left: '20px', right: '20px', padding: '10px', margin: '1rem 0',
  },
};

Modal.setAppElement('#app');

function DashboardView(props) {
  const {
    isLoading,
    closeCreateModal,
    handleChange,
    handleCreateIncident,
    disableFileInput,
    handleMedia,
    // videoBlob,
    imageBlobs,
    clearBlobs,
    openCreateModal,
    isDetailsModalOpen,
    closeDetailsModal,
    incidents,
    location,
    isCreateModalOpen,
    hideCreateButton,
    showCreateButton,
    fetchIncident,
    incident: details,
    mapUrl,
    isDeleteModalOpen,
    alterDeleteModal,
    deleteIncident,
    alterEditModal,
    isEditModalOpen,
    alterDisableComment,
    alterDisableLocation,
    disableComment,
    disableLocation,
    comment,
    incidentLocation,
  } = props;
  return (
    <div className={style.user__dashboard}>
      <div className={style['padded-body']}>
        {isLoading && <Loader isLoading={isLoading} />}
        <div>
          <Modal
            style={modalDefaultStyle}
            isOpen={isCreateModalOpen}
            onRequestClose={closeCreateModal}
            onAfterOpen={hideCreateButton}
            onAfterClose={hideCreateButton}
          >
            <div
              className={style.close__modal}
              onClick={closeCreateModal}
            >
              <FontAwesomeIcon
                icon='times-circle'
                style={{ height: '2rem', width: '2rem' }}
              />
            </div>
            <CreateReport
              handleCreateIncident={handleCreateIncident}
              handleChange={handleChange}
              handleMedia={handleMedia}
              disableFileInput={disableFileInput}
              // videoBlob={videoBlob}
              imageBlobs={imageBlobs}
              clearBlobs={clearBlobs}
            />
          </Modal>
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={alterEditModal}
            style={customizedStyle}
          >
            <div
              className={style.close__modal}
              onClick={alterEditModal}
            >
              <FontAwesomeIcon
                icon='times-circle'
                style={{ height: '2rem', width: '2rem' }}
              />
            </div>
            <EditReport
              incident={details}
              disableComment={disableComment}
              disableLocation={disableLocation}
              alterDisableComment={alterDisableComment}
              alterDisableLocation={alterDisableLocation}
              handleChange={handleChange}
              comment={comment}
              incidentLocation={incidentLocation}
            />
          </Modal>
        </div>
        <p id="welcome-text">Welcome. View your reports.</p>
        {
          (showCreateButton) ? null : <div
            className={style['create-modal']}
            id="create-modal"
            onClick={openCreateModal}
            role='button'
          >
            <img src={promoImage} alt="" />
          </div>}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={alterDeleteModal}
          className={style['delete-modal-box']}
        >
          <div className={style['delete-prompt']}>
            <div className={style['prompt-body']}>
              <h3>Are you sure you want to delete this report?</h3>
              <div className={style['delete-btn-parent-div']}>
                <div>
                  <button
                    className={cx(style['alert-btns'], style['cancel-btn'])}
                    onClick={alterDeleteModal}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    className={cx(style['delete-btn'], style['alert-btns'])}
                    onClick={deleteIncident}
                  >
                    Delete Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          style={customizedStyle}
          isOpen={isDetailsModalOpen}
          onRequestClose={closeDetailsModal}
        >
          <div
            className={style.close__modal}
            onClick={closeDetailsModal}
          >
            <FontAwesomeIcon
              icon='times-circle'
              style={{ height: '2rem', width: '2rem' }}
            />
          </div>
          <ReportDetails
            incident={details}
            mapUrl={mapUrl}
          />
        </Modal>
        <div className={style.body__content}>
          <div className={style.control}>
            <FilterComponent />
            <SearchComponent />
          </div>
          <div className="recently-created">
            {/* <h2 id="current-view-title"></h2> */}
            <div id="all-reports">
              <div
                className={style['list-of-reports']}
                id="incidents-view"
              >
                {
                  (!incidents.length) ? <p>
                    No incident reported yet
                      </p> : incidents.map(incident => <SingleReport
                      key={incident.id}
                      location={location}
                      id={incident.id}
                      createdOn={incident.createdOn}
                      status={incident.status}
                      type={incident.type}
                      incidentLocation={incident.location}
                      fetchIncident={fetchIncident}
                      alterDeleteModal={alterDeleteModal}
                      title={incident.title}
                      alterEditModal={alterEditModal}
                    />)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

DashboardView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  closeCreateModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCreateIncident: PropTypes.func.isRequired,
  disableFileInput: PropTypes.bool.isRequired,
  handleMedia: PropTypes.func.isRequired,
  // videoBlob: PropTypes.array,
  imageBlobs: PropTypes.array,
  clearBlobs: PropTypes.func.isRequired,
  openCreateModal: PropTypes.func.isRequired,
  isDetailsModalOpen: PropTypes.bool.isRequired,
  closeDetailsModal: PropTypes.func.isRequired,
  incidents: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  isCreateModalOpen: PropTypes.bool.isRequired,
  hideCreateButton: PropTypes.func.isRequired,
  fetchIncident: PropTypes.func.isRequired,
  incident: PropTypes.object.isRequired,
  mapUrl: PropTypes.string,
  showCreateButton: PropTypes.bool.isRequired,
  isDeleteModalOpen: PropTypes.bool.isRequired,
  alterDeleteModal: PropTypes.func.isRequired,
  deleteIncident: PropTypes.func.isRequired,
  alterEditModal: PropTypes.func.isRequired,
  isEditModalOpen: PropTypes.bool.isRequired,
  alterDisableComment: PropTypes.func,
  alterDisableLocation: PropTypes.func,
  disableComment: PropTypes.bool,
  disableLocation: PropTypes.bool,
  comment: PropTypes.string,
  incidentLocation: PropTypes.string,
};

DashboardView.defaultProps = {
  mapUrl: '',
  alterDisableComment: f => f,
  alterDisableLocation: f => f,
  disableComment: true,
  disableLocation: true,
  incidentLocation: '',
  comment: '',
};

export default DashboardView;
