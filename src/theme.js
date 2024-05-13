import {createTheme} from '@mui/material/styles';

const myTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#28b934',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
            main: '#167921',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        success: {
            main: '#00c853',
        },
    }
})

export default myTheme;