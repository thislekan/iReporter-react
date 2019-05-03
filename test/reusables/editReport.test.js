import React from 'react';
import { shallow } from 'enzyme';
import EditReport from '../../src/components/reuseables/EditReport.jsx';
import incident from '../mock/incident';

const mock = incident;
const mockFn = jest.fn();

describe('<SingleReport />', () => {
  it('should render EditReport', () => {
    const wrapper = shallow(
      <EditReport
        incident={mock}
        location={{ pathname: '/user' }}
        incidentLocation={mock.location}
        comment={mock.comment}
        alterDisableComment={mockFn}
        alterDisableLocation={mockFn}
        alterDisableStatus={mockFn}
        incidentStatus={mock.status}
        disableComment
        disableStatus
        disableLocation
        handleChange={mockFn}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a different content when pathname is Admin', () => {
    const wrapper = shallow(
      <EditReport
        incident={mock}
        location={{ pathname: '/admin' }}
        incidentLocation={mock.location}
        comment={mock.comment}
        alterDisableComment={mockFn}
        alterDisableLocation={mockFn}
        alterDisableStatus={mockFn}
        incidentStatus={mock.status}
        disableComment
        disableStatus
        disableLocation
        handleChange={mockFn}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
