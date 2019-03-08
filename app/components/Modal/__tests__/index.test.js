/**
 * @author vishwadeep.kapoor
 * @Date: 2018-12-27 13:17:36
 * @Last Modified by: vishwadeep
 * @Last Modified time: 2018-12-27 13:29:37
 */
/* eslint-disable no-undef */
import React from 'react';
import Modal from '../index';

describe('Modal rendering', () => {
  it('is renders correctly', () => {
    const props = { header: 'modalHeader', footer: 'modalFooter' };
    const tree = renderWithTheme(<Modal {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('is renders correctly with header', () => {
    const props = { header: <div>header</div> };
    const tree = renderWithTheme(<Modal {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('is renders correctly without header size sm', () => {
    const props = { showClose: false, size: 'sm' };
    const tree = renderWithTheme(<Modal {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('is renders correctly size login', () => {
    const props = { showClose: false, size: 'login' };
    const tree = renderWithTheme(<Modal {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('is renders correctly size lg', () => {
    const props = { showClose: false, size: 'lg' };
    const tree = renderWithTheme(<Modal {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('is renders correctly size xl', () => {
    const props = { showClose: false, size: 'xl' };
    const tree = renderWithTheme(<Modal {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('is renders correctly size null', () => {
    const props = { showClose: false, size: 'null' };
    const tree = renderWithTheme(<Modal {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
