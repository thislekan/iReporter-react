import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../src/components/reuseables/Loader.jsx';

describe('<Loader />', () => {
  it('should render the PageLoader', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
});
