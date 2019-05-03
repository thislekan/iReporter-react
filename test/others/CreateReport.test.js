import React from 'react';
import { shallow } from 'enzyme';
import CreateReport from '../../src/components/CreateReport.jsx';

const mockFn = jest.fn();
describe('<CreateReport />', () => {
  it('should render the index', () => {
    const wrapper = shallow(
      <CreateReport
        handleChange={mockFn}
        handleCreateIncident={mockFn}
        handleMedia={mockFn}
        disableFileInput
        clearBlobs={mockFn}
        imageBlobs={['jd', 'djh']}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
