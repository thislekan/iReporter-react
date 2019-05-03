import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../src/components/HomePage.jsx';

const push = jest.fn();
describe('<HomePage />', () => {
  it('should render the homepage', () => {
    const wrapper = shallow(<HomePage history={{ push }} />);
    expect(wrapper).toMatchSnapshot();
    const btn = wrapper.find('#go-to-signup');
    btn.simulate('click', f => f);
    expect(push).toHaveBeenCalled();
  });
});
