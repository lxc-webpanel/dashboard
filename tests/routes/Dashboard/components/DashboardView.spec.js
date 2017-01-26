import React from 'react';
import { DashboardView } from 'routes/Dashboard/components/DashboardView';
import { render } from 'enzyme';

describe('(View) Dashboard', () => {
  let _component;

  beforeEach(() => {
    _component = render(<DashboardView />);
  });

  it('Renders a "Dashboard" message', () => {
    const headline = _component.find('h4');
    expect(headline).to.exist;
    expect(headline.text()).to.match(/Dashboard/);
  });
});
