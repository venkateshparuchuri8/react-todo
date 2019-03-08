/**
 * @author vishwadeep.kapoor
 * @Date: 2018-12-26 12:18:44
 * @Last Modified by: vishwadeep
 * @Last Modified time: 2019-01-14 16:30:43
 */

/* eslint-disable no-undef */
import React from 'react';
import Button from '../index';

describe('<Button /> rendering', () => {
  it('is renders correctly', () => {
    const tree = renderWithTheme(<Button />);
    expect(tree).toMatchSnapshot();
  });
});
