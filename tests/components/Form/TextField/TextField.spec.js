import TextField from 'components/Form/TextField';
import { shallow } from 'enzyme';
import muiTheme from 'theme/material-ui';

describe('(Component) Form:TextField', () => {
  let _wrapper;

  context('When in an error state', () => {
    it('Renders an error message for the input', () => {
      const input = { name: 'username', value: '' };
      const label = 'Username';
      const meta = { touched: true, error: 'Required' };
      const element = TextField({ input, label, meta });

      _wrapper = shallow(element, { context: { muiTheme } });

      const errorBlock = _wrapper.findWhere(n => n.type() !== 'div').last();
      expect(errorBlock).to.exist;
      expect(errorBlock.text()).to.equal('Required');
    });
  });
});
