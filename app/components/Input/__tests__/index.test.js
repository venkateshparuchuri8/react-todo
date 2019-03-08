/**
 * @author vishwadeep.kapoor
 * @Date: 2018-12-26 17:41:54
 * @Last Modified by: vishwadeep
 * @Last Modified time: 2018-12-26 17:44:31
 */
/* eslint-disable no-undef */
import React from 'react';
import Input from '../index';

describe('Input rendering', () => {
  it('is renders correctly with border', () => {
    const props = { border: 'border' };
    const tree = renderWithTheme(<Input {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('is renders correctly with no-border', () => {
    const props = { border: 'noBorder' };
    const tree = renderWithTheme(<Input {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
