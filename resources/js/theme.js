import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
    // palette: {
    //     primary: {
    //         light: '#7986cb',
    //         main: '#607d8b',
    //         dark: '#455a64',
    //         contrastText: '#fff'
    //     },
    //     secondary: {
    //         light: '#ff6333',
    //         main: '#dc004e',
    //         dark: '#b22a00',
    //         contrastText: '#fff'
    //     },
    // },
    typography: {
        fontFamily:  ['BlinkMacSystemFont',]
    },
    palette: {
        type: 'dark'
    }
})

export default theme;
