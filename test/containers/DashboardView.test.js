import '@babel/polyfill';
import React from 'react';
// import { shallow } from 'enzyme';
import setup from '../mock/setup';
import mockIncident from '../mock/incident';
// import ConnectedDashboard from '../../src/components/reuseables/DashboardView.jsx';
import DashboardView from '../../src/components/reuseables/DashboardView.jsx';

const mockFn = jest.fn();
const location = { pathname: '/user' };

describe('<UserForm />', () => {
  it('Should render all elements', () => {
    const wrapper = setup(
      <DashboardView
        location={location}
        incidents={[mockIncident]}
        isLoading={false}
        handleChange={mockFn}
        deleteIncident={mockFn}
        alterDeleteModal={mockFn}
        isDetailsModalOpen={false}
        closeDetailsModal={mockFn}
        fetchIncident={mockFn}
        alterEditModal={mockFn}
        incident={mockIncident}
        imageBlobs={[]}
        openModal={false}
        message=""
        resetState={mockFn}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    DashboardView.defaultProps.deleteIncident = mockFn;
    DashboardView.defaultProps.deleteIncident();
    const deleteBtn = wrapper.find('#delete_btn');
    deleteBtn.simulate('click', { deleteIncident: f => f });
    expect(mockFn).toHaveBeenCalled();
  });
});
