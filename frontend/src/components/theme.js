import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            main: "#039be5"
        },
        secondary: {
            main: "#f50057"
        }
    },
    overrides: {
        MuiButton: {
            root: {
                color: 'white',
            }
        }
    }
});