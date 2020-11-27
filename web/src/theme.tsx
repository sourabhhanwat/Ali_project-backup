import {
    grey,
    green,
    orange,
    red,
    teal,
    yellow,
} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/shape' {
    interface Shape {
        drawerWidth: number;
    }
}

const Raleway = {
    fontFamily: 'Raleway',
    fontDisplay: 'swap' as const,
    src: `
      local(Raleway-Regular),
      url(/fonts/Raleway-Regular.ttf) format("truetype")
    `,
};

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        veryHigh: PaletteColor;
        high: PaletteColor;
        medium: PaletteColor;
        low: PaletteColor;
        veryLow: PaletteColor;
    }

    interface PaletteOptions {
        veryHigh?: PaletteColorOptions;
        high?: PaletteColorOptions;
        medium?: PaletteColorOptions;
        low?: PaletteColorOptions;
        veryLow?: PaletteColorOptions;
    }
}

// A custom theme for this app
const theme = createMuiTheme({
    shape: {
        drawerWidth: 240,
    },
    palette: {
        primary: {
            main: '#4c8af0',
        },
        secondary: {
            main: '#02bfa6',
            contrastText: '#fff',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        veryHigh: {
            main: red['A400'],
            light: red['50'],
        },
        high: {
            main: orange['A400'],
            light: orange['50'],
        },
        medium: {
            main: yellow['A400'],
            light: yellow['50'],
        },
        low: {
            main: green['A400'],
            light: green['50'],
        },
        veryLow: {
            main: teal['A400'],
            light: teal['50'],
        },
    },
    typography: {
        fontFamily: 'Raleway, sans-serif',
        h6: {
            fontWeight: 700,
            letterSpacing: 1.2,
        },
        htmlFontSize: 17
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [Raleway],
            },
        },
        MuiAvatar: {
            colorDefault: {
                backgroundColor: grey[800],
            },
        },
        MuiListItemIcon: {
            root: {
                color: grey[800],
            },
        },
    },
});

theme.palette.veryHigh = theme.palette.augmentColor(theme.palette.veryHigh);
theme.palette.high = theme.palette.augmentColor(theme.palette.high);
theme.palette.medium = theme.palette.augmentColor(theme.palette.medium);
theme.palette.low = theme.palette.augmentColor(theme.palette.low);
theme.palette.veryLow = theme.palette.augmentColor(theme.palette.veryLow);

export default theme;
