import React from 'react';
import { shallow } from 'enzyme';
import DashboardView from '../../src/components/reuseables/DashboardView.jsx';
import incident from '../mock/incident';

const mock = incident;
const mockFn = jest.fn();

describe('<DashboardView />', () => {
  it('should render DashboardView', () => {
    const wrapper = shallow(
      <DashboardView
        isLoading={false}
        isDetailsModalOpen={false}
        incidents={[mock]}
        location={{ pathname: '/user' }}
        handleChange={mockFn}
        closeDetailsModal={mockFn}
        fetchIncident={mockFn}
        incident={mock}
        imageBlobs={mock.images}
        deleteIncident={mockFn}
        alterDeleteModal={mockFn}
        resetState={mockFn}
        message=""
        openModal={false}
      />,
    );
    // console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });
});
