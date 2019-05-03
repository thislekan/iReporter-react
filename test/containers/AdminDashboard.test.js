import '@babel/polyfill';
import React from 'react';
import setup from '../mock/setup';
import ConnectedAdminDashboard from '../../src/components/admin/AdminDashboard.jsx';
import mockIncident from '../mock/incident';

const mockFn = jest.fn();
const mockFn2 = jest.fn();
const location = { pathname: '/admin' };

describe('<UserForm />', () => {
  it('Should render all elements', () => {
    const wrapper = setup(
      <ConnectedAdminDashboard
        location={location}
        getIncidents={mockFn}
        editStatus={mockFn2}
        isAdmin
        getIncidentsDetails={mockFn}
        isLoading={false}
        message=""
        incidentDetail={mockIncident}
        incidents={[mockIncident]}
        editStatusAction={mockFn2}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
