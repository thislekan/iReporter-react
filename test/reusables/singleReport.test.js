import React from 'react';
import { shallow } from 'enzyme';
import ReportDetails from '../../src/components/reuseables/SingleReport.jsx';
import incident from '../mock/incident';

const mock = incident;
const mockFn = jest.fn();

describe('<SingleReport />', () => {
  it('should render SingleReport', () => {
    const wrapper = shallow(
      <ReportDetails
        location={{ pathname: '/user' }}
        id={mock.id}
        incidentLocation={mock.location}
        type={mock.type}
        createdOn={mock.createdOn}
        alterDeleteModal={mockFn}
        alterEditModal={mockFn}
        status={mock.status}
        fetchIncident={mockFn}
        title={mock.title}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.find('#view_btn').simulate('click', { fetchIncident: f => f });
    wrapper.find('#edit_btn').simulate('click', { alterEditModal: f => f });
    wrapper.find('#delete_btn').simulate('click', { alterDeleteModal: f => f });
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
  it('should render a different content when route is Admin', () => {
    const wrapper = shallow(
      <ReportDetails
        location={{ pathname: '/admin' }}
        id={mock.id}
        incidentLocation={mock.location}
        type={mock.type}
        createdOn={mock.createdOn}
        alterDeleteModal={mockFn}
        alterEditModal={mockFn}
        status={mock.status}
        fetchIncident={mockFn}
        title={mock.title}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
