import getMuiTheme from 'material-ui/styles/getMuiTheme';

console.log(getMuiTheme());

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#23accf'
  }
});

export default muiTheme;
