import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('The App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });

  // Enzyme doesn't support hooks yet
  it.skip('updates the input text', () => {
    const wrapper = mount(<App />);
    console.log(wrapper.state());
    expect(wrapper.state.inputText).toBe('');
    wrapper.find('textarea').simulate('change', { target: { value: 'foo' } });
    expect(wrapper.state.inputText).toBe('foo');
  });
});
