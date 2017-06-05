import createPalette from 'material-ui/styles/palette';
import { createMuiTheme, MuiThemeProvider, } from 'material-ui/styles';
import { pink, teal, } from 'material-ui/styles/colors';
const palette = createPalette({ primary: teal, accent: pink, type: 'dark', });

// 880040
const { styleManager, theme, } = MuiThemeProvider.createDefaultContext(
  { theme: createMuiTheme({ palette, }), });

export { styleManager, theme, };
