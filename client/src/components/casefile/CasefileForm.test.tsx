import React from 'react';
import CasefileForm from './CasefileForm';
import { mount, ReactWrapper } from 'enzyme';

describe('<CasefileForm />', () => {
  let mockSubmit = jest.fn();
  let mountedWrapper: ReactWrapper;
  let component: JSX.Element;

  describe('when is saving', () => {
    beforeAll(() => {
      component = <CasefileForm isSaving={true} onSubmit={mockSubmit} isNew={true} />;
      mountedWrapper = mount(component);
    });

    afterAll(() => {
      mountedWrapper.unmount();
    });

    it('should have button disabled', () => {
      expect(mountedWrapper.find('button').prop('disabled')).toBe(true);
    });
  });

  describe('when mounted', () => {
    beforeEach(() => {
      mockSubmit = jest.fn();
      component = <CasefileForm isSaving={false} onSubmit={mockSubmit} isNew={true} />;
      mountedWrapper = mount(component);
    });

    afterEach(() => {
      mountedWrapper.unmount();
    });

    it('should have a form', () => {
      expect(mountedWrapper.find('form').exists()).toBe(true);
    });

    it('should have button enabled', () => {
      expect(mountedWrapper.find('button').prop('disabled')).toBe(false);
    });
  });
});
