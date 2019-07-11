import React from 'react';
import Calendar from './component/Calendar.jsx';
import shallow from './enzyme.config.js'

describe('MyComponent', () => {
  it('should whatever', () => {
    const wrapper = shallow(<Calendar />);
  });
})


// describe('MyComponent', () => {
//   it ('should be true', () => {
//     const foo = true;
//     expect(foo).toBe(true);
//   });
// })