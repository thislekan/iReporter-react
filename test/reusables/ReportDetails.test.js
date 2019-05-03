import React from 'react';
import { shallow } from 'enzyme';
import ReportDetails from '../../src/components/reuseables/ReportDetails.jsx';

const mock = {
  isLoading: false,
  message: '',
  id: 2,
  createdBy: '',
  createdOn: '',
  creator: '',
  updatedOn: '',
  title: '',
  type: '',
  location: '',
  status: '',
  comment: 'jhdfhfdjk',
  images: ['hi', 'helo'],
  videos: ['fdkfdn'],
};

describe('<ReportDetails />', () => {
  it('should render ReportDetails', () => {
    const wrapper = shallow(
      <ReportDetails
        incident={mock}
        mapUrl="youth"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a different content when the route is /admin', () => {
    const mimic = mock;
    mimic.images = '';
    mimic.videos = '';
    mimic.comment = '';
    const wrapper = shallow(
      <ReportDetails
        incident={mimic}
        mapUrl="youth"
      />,
    );
    const textArea = wrapper.find('#incident-comment');
    expect(textArea.props().value).toBe('');
    expect(wrapper).toMatchSnapshot();
  });
});
