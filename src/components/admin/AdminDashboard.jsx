import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import DashboardView from '../reuseables/DashboardView.jsx';
import { getIncidents } from '../../store/actions/incidentsAction';
import { getIncidentDetails } from '../../store/actions/incidentDetailAction';
import { editStatusAction } from '../../store/actions/editStatusAction';
import * as incidentSelectors from '../../store/selectors/userIncidentsSelector';
import getMapUrl from '../../utils/geolocation';
import incidentDetail from '../../store/selectors/incidentDetailsSelector';

class AdminDashboard extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    getIncidents: PropTypes.func.isRequired,
    token: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    getIncidentDetails: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    incidentDetail: PropTypes.object.isRequired,
    incidents: PropTypes.array.isRequired,
    editStatusAction: PropTypes.func.isRequired,
  }

  state = {
    message: '',
    isLoading: false,
    incidents: [],
    isDetailsModalOpen: false,
    incident: {},
    isEditModalOpen: false,
    disableStatus: true,
    status: '',
  }

  componentDidMount() {
    const { getIncidents: fetchIncidents, isAdmin, token } = this.props;
    fetchIncidents(token, isAdmin);
  }

  static getDerivedStateFromProps(nextProps) {
    const {
      message,
      isLoading,
      incidents,
      incidentDetail: incident,
    } = nextProps;
    return {
      message,
      isLoading,
      incidents,
      incident,
    };
  }

  handleChange = (e) => {
    if (e.target.nodeName === 'TEXTAREA') return this.setState({ [e.target.name]: e.target.value });
    return this.setState({ [e.target.name]: e.target.value.trim() });
  }

  closeDetailsModal = () => this.setState({ isDetailsModalOpen: false });

  fetchIncident = async (id, location) => {
    const { getIncidentDetails: fetchDetails } = this.props;
    await fetchDetails(id);
    this.setState({ isDetailsModalOpen: true });
    const mapUrl = await getMapUrl(location);
    this.setState({ mapUrl });
  }

  alterEditModal = async (id) => {
    const { getIncidentDetails: fetchDetails } = this.props;
    const { isEditModalOpen } = this.state;
    this.setState({ isEditModalOpen: !isEditModalOpen });
    // fetchDetails(id);
    if (!isEditModalOpen) {
      await fetchDetails(id);
      const { incident } = this.state;
      this.setState({ comment: incident.comment });
      this.setState({ location: incident.location });
      this.setState({ status: incident.status });
    }
  }

  alterDisableStatus = (e) => {
    const { innerText } = e.target;
    const { disableStatus, incident } = this.state;
    const { id, type } = incident;
    this.setState({ disableStatus: !disableStatus });
    if (innerText === 'Edit Status') e.target.innerText = 'Post Status';
    if (innerText === 'Post Status') this.postStatus(id, type);
  }

  postStatus = (id) => {
    const { status } = this.state;
    const { editStatusAction: editStatus } = this.props;
    editStatus({ id, status });
  }

  render() {
    const {
      incidents,
      isLoading,
      isDetailsModalOpen,
      incident,
      mapUrl,
      isEditModalOpen,
      comment,
      location: incidentLocation,
      disableStatus,
      status: incidentStatus,
    } = this.state;
    const { location } = this.props;
    return (
      <div>
        <DashboardView
          incidents={incidents}
          isLoading={isLoading}
          handleChange={this.handleChange}
          isDetailsModalOpen={isDetailsModalOpen}
          closeDetailsModal={this.closeDetailsModal}
          location={location}
          incident={incident}
          fetchIncident={this.fetchIncident}
          mapUrl={mapUrl}
          alterEditModal={this.alterEditModal}
          isEditModalOpen={isEditModalOpen}
          comment={comment}
          incidentLocation={incidentLocation}
          disableStatus={disableStatus}
          alterDisableStatus={this.alterDisableStatus}
          incidentStatus={incidentStatus}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  message: incidentSelectors.userIncidentsMessage,
  isLoading: incidentSelectors.incidentsLoadingStatus,
  incidents: incidentSelectors.userIncidents,
  isAdmin: incidentSelectors.isUserAdmin,
  token: incidentSelectors.userToken,
  incidentDetail,
});

const mapDispacthToProps = {
  getIncidents,
  editStatusAction,
  getIncidentDetails,
  // deleteIncident,
  // editCommentAction,
  // editLocationAction,
};

export default connect(mapStateToProps, mapDispacthToProps)(AdminDashboard);
