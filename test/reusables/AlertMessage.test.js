import React from 'react';
import { shallow } from 'enzyme';
import AlertMessage from '../../src/components/reuseables/AlertMessage.jsx';

const mockFn = jest.fn();

describe('<AlertMessage />', () => {
  it('Should render the component', () => {
    const wrapper = shallow(
      <AlertMessage
        openModal
        resetState={mockFn}
        message="Hello World"
      />,
    );
    wrapper.find('button').simulate('click', { resetstate: f => f });
    expect(wrapper).toMatchSnapshot();
    expect(mockFn).toHaveBeenCalled();
  });
});
