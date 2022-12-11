import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#424242'
      }
    },
    MuiTableCell: {
      root: {
        minHeight: 30
      }
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#FDD835",
    },
    secondary: {
      main: "#FDD835",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    error: {
      main: '#f20',
    },
    background: {
      // default: '#fff',
    },
  },
});

export default theme;
