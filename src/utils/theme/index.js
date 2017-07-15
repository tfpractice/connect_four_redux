import createPalette from 'material-ui/styles/palette';
import { createMuiTheme, MuiThemeProvider, } from 'material-ui/styles/';
import teal from 'material-ui/colors/teal';
import pink from 'material-ui/colors/pink';
import * as colors from 'material-ui/colors';

console.log(colors);
const palette = createPalette({ primary: teal, accent: pink, type: 'dark', });

const { styleManager, theme, } = MuiThemeProvider.createDefaultContext(
  { theme: createMuiTheme({ palette, }), });

export { styleManager, theme, };
