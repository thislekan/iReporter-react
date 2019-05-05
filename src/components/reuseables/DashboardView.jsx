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
import modalStyle from '../../styles/dashboardView.css';
import promoImage from '../../media/promotion.svg';
import Loader from './Loader.jsx';
import EditReport from './EditReport.jsx';


if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

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
    disableStatus,
    alterDisableStatus,
    incidentStatus,
    message,
    resetState,
    openModal,
  } = props;
  return (
    <div className={style.user__dashboard}>
      <div className={style['padded-body']}>
        {isLoading && <Loader isLoading={isLoading} />}
        <div>
          {
            (location.pathname === '/admin') ? null : <Modal
              className={style['form-modals']}
              isOpen={isCreateModalOpen}
              onRequestClose={closeCreateModal}
              onAfterOpen={hideCreateButton}
              onAfterClose={hideCreateButton}
            >
              <div
                className={style.close__modal}
                onClick={closeCreateModal}
                aria-hidden
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
          }
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={alterEditModal}
            className={style['form-modals']}
          >
            <div
              className={style.close__modal}
              onClick={alterEditModal}
              aria-hidden
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
              location={location}
              disableStatus={disableStatus}
              alterDisableStatus={alterDisableStatus}
              incidentStatus={incidentStatus}
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
            aria-hidden
          >
            <img src={promoImage} alt="" />
          </div>
        }
        {
          (location.pathname === '/admin') ? null : <Modal
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
        }
        <Modal
          className={style['form-modals']}
          isOpen={isDetailsModalOpen}
          onRequestClose={closeDetailsModal}
        >
          <div
            className={style.close__modal}
            onClick={closeDetailsModal}
            aria-hidden
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
          {
            (message && message !== 'Incidents successfully fetched') && <Modal
              isOpen={openModal}
              onRequestClose={resetState}
              className={modalStyle['notification-modal-box']}
            >
              <p>{message}</p>
              <button
                onClick={resetState}
              >
                OK
              </button>
            </Modal>
          }
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
  closeCreateModal: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  handleCreateIncident: PropTypes.func,
  disableFileInput: PropTypes.bool,
  handleMedia: PropTypes.func,
  // videoBlob: PropTypes.array,
  imageBlobs: PropTypes.array,
  clearBlobs: PropTypes.func,
  openCreateModal: PropTypes.func,
  isDetailsModalOpen: PropTypes.bool.isRequired,
  closeDetailsModal: PropTypes.func.isRequired,
  incidents: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  isCreateModalOpen: PropTypes.bool,
  hideCreateButton: PropTypes.func,
  fetchIncident: PropTypes.func.isRequired,
  incident: PropTypes.object.isRequired,
  mapUrl: PropTypes.string,
  showCreateButton: PropTypes.bool,
  isDeleteModalOpen: PropTypes.bool,
  alterDeleteModal: PropTypes.func,
  deleteIncident: PropTypes.func,
  alterEditModal: PropTypes.func,
  isEditModalOpen: PropTypes.bool,
  alterDisableComment: PropTypes.func,
  alterDisableLocation: PropTypes.func,
  disableComment: PropTypes.bool,
  disableLocation: PropTypes.bool,
  comment: PropTypes.string,
  incidentLocation: PropTypes.string,
  disableStatus: PropTypes.bool,
  alterDisableStatus: PropTypes.func,
  incidentStatus: PropTypes.string,
  openModal: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  resetState: PropTypes.func.isRequired,
};

DashboardView.defaultProps = {
  mapUrl: '',
  alterDisableComment: f => f,
  alterDisableLocation: f => f,
  disableComment: true,
  disableLocation: true,
  incidentLocation: '',
  comment: '',
  closeCreateModal: f => f,
  handleCreateIncident: f => f,
  disableFileInput: false,
  handleMedia: f => f,
  clearBlobs: f => f,
  openCreateModal: f => f,
  isCreateModalOpen: false,
  hideCreateButton: f => f,
  showCreateButton: false,
  isDeleteModalOpen: false,
  alterDeleteModal: f => f,
  deleteIncident: f => f,
  alterEditModal: f => f,
  isEditModalOpen: false,
  disableStatus: true,
  alterDisableStatus: f => f,
  incidentStatus: '',
};

export default DashboardView;
