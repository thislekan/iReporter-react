import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { getIncidents } from '../../store/actions/incidentsAction';
import { createIncident } from '../../store/actions/createIncidentAction';
import { getIncidentDetails } from '../../store/actions/incidentDetailAction';
import { deleteIncident } from '../../store/actions/deleteIncidentAction';
import { editCommentAction } from '../../store/actions/editCommentAction';
import { editLocationAction } from '../../store/actions/editLocationAction';
import * as incidentSelectors from '../../store/selectors/userIncidentsSelector';
import incidentDetail from '../../store/selectors/incidentDetailsSelector';
import DashboardView from '../reuseables/DashboardView.jsx';
import getMapUrl from '../../utils/geolocation';

class UserDashboard extends React.Component {
  static propTypes = {
    isCreateModalOpen: PropTypes.bool,
    isDetailsModalOpen: PropTypes.bool,
    getIncidents: PropTypes.func.isRequired,
    token: PropTypes.string,
    message: PropTypes.string,
    isLoading: PropTypes.bool,
    incidents: PropTypes.array,
    location: PropTypes.object.isRequired,
    createIncident: PropTypes.func.isRequired,
    getIncidentDetails: PropTypes.func.isRequired,
    incidentDetail: PropTypes.object,
    deleteIncident: PropTypes.func.isRequired,
    editCommentAction: PropTypes.func,
    editLocationAction: PropTypes.func,
    isLoggedIn: PropTypes.bool,
  }

  static defaultProps = {
    isCreateModalOpen: false,
    isDetailsModalOpen: false,
    token: '',
    message: '',
    isLoading: false,
    incidents: [],
    incidentDetail: {},
    editCommentAction: f => f,
    editLocationAction: f => f,
    isLoggedIn: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      isCreateModalOpen: false,
      isDetailsModalOpen: false,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      showCreateButton: false,
      incidents: [],
      imageBlobs: [],
      videoBlob: '',
      disableFileInput: false,
      images: [],
      video: [],
      incident: {},
      mapUrl: '',
      disableComment: true,
      disableLocation: true,
      message: props.message,
      isLoading: props.isLoading,
      openModal: false,
      incidentType: props.incidentDetail.type,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const {
      message,
      isLoading,
      incidents,
      incidentDetail: incident,
      isLoggedIn,
    } = nextProps;

    if (incident.message) {
      return {
        message: incident.message,
        isLoading: incident.isLoading,
        incidents,
        incident,
        isLoggedIn,
      };
    }

    return {
      message,
      isLoading,
      incidents,
      incident,
      isLoggedIn,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.message !== prevState.message) this.setState({ openModal: true });
  }

  componentDidMount() {
    const { getIncidents: fetchIncidents, token } = this.props;
    setTimeout(() => fetchIncidents(token, false), 1000);
    fetchIncidents(token, false);
  }

  handleChange = (e) => {
    if (e.target.nodeName === 'TEXTAREA') return this.setState({ [e.target.name]: e.target.value });
    return this.setState({ [e.target.name]: e.target.value.trim() });
  }

  resetState = () => {
    const { isCreateModalOpen } = this.state;
    const { getIncidents: fetchIncidents, token } = this.props;
    if (isCreateModalOpen) {
      this.setState({ isCreateModalOpen: false, message: '' });
      fetchIncidents(token, false);
    }
    this.setState({ message: '', openModal: false });
  }

  clearBlobs = () => this.setState({ imageBlobs: [], videoBlob: [] });

  openCreateModal = () => this.setState({ isCreateModalOpen: true });

  openDetailsModal = () => this.setState({ isDetailsModalOpen: true });

  closeDetailsModal = () => this.setState({ isDetailsModalOpen: false });

  hideCreateButton = () => {
    const { showCreateButton } = this.state;
    this.setState({ showCreateButton: !showCreateButton });
  }

  alterDeleteModal = () => {
    const { isDeleteModalOpen } = this.state;
    this.setState({ isDeleteModalOpen: !isDeleteModalOpen });
  }

  displayMediaError(payload, size) {
    return this.setState({ message: `${payload} can only be a maximum of ${size}` });
  }

  closeCreateModal = () => this.setState({
    isCreateModalOpen: false,
    imageBlobs: [],
    videoBlob: [],
  });

  alterEditModal = async (id) => {
    const { getIncidentDetails: fetchDetails } = this.props;
    const { isEditModalOpen } = this.state;
    this.setState({ isEditModalOpen: !isEditModalOpen });
    if (!isEditModalOpen) {
      await fetchDetails(id);
      const { incident } = this.state;
      this.setState({ comment: incident.comment });
      this.setState({ location: incident.location });
    }
  }

  alterDisableComment = (e) => {
    const { innerText } = e.target;
    const { disableComment, incident } = this.state;
    const { id, type } = incident;
    this.setState({ disableComment: !disableComment });
    if (innerText === 'Edit Comment') e.target.innerText = 'Post Comment';
    if (innerText === 'Post Comment') this.postComment(id, type);
  }

  alterDisableLocation = (e) => {
    const { innerText } = e.target;
    const { disableLocation, incident } = this.state;
    const { id, type } = incident;
    this.setState({ disableLocation: !disableLocation });
    if (innerText === 'Edit Location') e.target.innerText = 'Post Location';
    if (innerText === 'Post Location') this.postLocation(id, type);
  }

  seperateFiles = (media) => {
    const images = media.filter(file => file.type.includes('image'));
    const video = media.filter(file => file.type.includes('video'));
    return { images, video };
  }

  convertMediaToBlob = (media) => {
    media.forEach((element) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = reader.result;
        if (blob.includes('video')) this.setState({ videoBlob: [blob] });
        if (blob.includes('image')) this.setState(prevState => ({ imageBlobs: [...prevState.imageBlobs, blob] }));
      };
      reader.readAsDataURL(element);
    });
  }

  handleMedia = (e) => {
    const uploadedFiles = [...e.target.files];
    const { images, video } = this.seperateFiles(uploadedFiles);
    if (images.length > 4) return this.displayMediaError('image', 4);
    if (video.length > 1) return this.displayMediaError('videos', 1);
    this.convertMediaToBlob(uploadedFiles);
    return this.setState({ images, video });
  }

  postComment = (id, type) => {
    const { comment, incidentType } = this.state;
    const { editCommentAction: editComment } = this.props;
    editComment({
      id, type, comment, newType: incidentType,
    });
  }

  postLocation = (id, type) => {
    const { location, incidentType } = this.state;
    const { editLocationAction: editLocation } = this.props;
    editLocation({
      id, type, location, newType: incidentType,
    });
  }

  gatherData = () => {
    const {
      comment, location, type, title, images, video,
    } = this.state;
    const incidentForm = new FormData();
    incidentForm.append('comment', comment);
    incidentForm.append('location', location);
    incidentForm.append('type', type);
    incidentForm.append('title', title);
    images.forEach((image, index) => incidentForm.append(`images[${index}]`, image));
    video.forEach((file, index) => incidentForm.append(`videos[${index}]`, file));
    return incidentForm;
  }

  handleCreateIncident = async (e) => {
    const { createIncident: createReport } = this.props;
    e.preventDefault();
    const data = this.gatherData();
    const response = await createReport(data);
    const { isCreateModalOpen } = this.state;
    const { getIncidents: fetchIncidents } = this.props;
    if (isCreateModalOpen && response.type === 'CREATE_INCIDENT_SUCCESS') {
      this.setState({ isCreateModalOpen: false, message: '' });
      fetchIncidents(null, false);
    }
  }

  fetchIncident = async (id, location) => {
    const { getIncidentDetails: fetchDetails } = this.props;
    await fetchDetails(id);
    this.setState({ isDetailsModalOpen: true });
    const mapUrl = await getMapUrl(location);
    this.setState({ mapUrl });
  }

  handleDeleteIncident = () => {
    const id = sessionStorage.getItem('id');
    const type = sessionStorage.getItem('type');
    const { deleteIncident: deleteReport } = this.props;
    deleteReport({ id, type });
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('type');
    this.alterDeleteModal();
  }

  render() {
    const { location } = this.props;
    const {
      incidents,
      disableFileInput,
      imageBlobs,
      // videoBlob,
      isLoading,
      isDetailsModalOpen,
      isCreateModalOpen,
      incident,
      mapUrl,
      showCreateButton,
      isDeleteModalOpen,
      isEditModalOpen,
      disableComment,
      disableLocation,
      comment,
      location: incidentLocation,
      isLoggedIn,
      message,
      openModal,
      incidentType,
    } = this.state;
    return (
      <DashboardView
        incidents={incidents}
        disableFileInput={disableFileInput}
        imageBlobs={imageBlobs}
        isLoading={isLoading}
        location={location}
        fetchIncident={this.fetchIncident}
        clearBlobs={this.clearBlobs}
        openCreateModal={this.openCreateModal}
        isDetailsModalOpen={isDetailsModalOpen}
        closeDetailsModal={this.closeDetailsModal}
        isCreateModalOpen={isCreateModalOpen}
        closeCreateModal={this.closeCreateModal}
        handleChange={this.handleChange}
        handleCreateIncident={this.handleCreateIncident}
        handleMedia={this.handleMedia}
        hideCreateButton={this.hideCreateButton}
        showCreateButton={showCreateButton}
        incident={incident}
        mapUrl={mapUrl}
        isDeleteModalOpen={isDeleteModalOpen}
        alterDeleteModal={this.alterDeleteModal}
        deleteIncident={this.handleDeleteIncident}
        alterEditModal={this.alterEditModal}
        isEditModalOpen={isEditModalOpen}
        alterDisableComment={this.alterDisableComment}
        alterDisableLocation={this.alterDisableLocation}
        disableComment={disableComment}
        disableLocation={disableLocation}
        comment={comment}
        incidentLocation={incidentLocation}
        isLoggedIn={isLoggedIn}
        message={message}
        resetState={this.resetState}
        openModal={openModal}
        incidentType={incidentType}
      />
    );
  }
}
const mapStateToProps = createStructuredSelector({
  message: incidentSelectors.userIncidentsMessage,
  isLoading: incidentSelectors.incidentsLoadingStatus,
  incidents: incidentSelectors.userIncidents,
  token: incidentSelectors.userToken,
  incidentDetail,
});
const mapDispacthToProps = {
  getIncidents,
  createIncident,
  getIncidentDetails,
  deleteIncident,
  editCommentAction,
  editLocationAction,
};
export default connect(mapStateToProps, mapDispacthToProps)(UserDashboard);
