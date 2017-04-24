import {
  darkBlack,
  fullBlack,
  grey100,
  grey300,
  grey400,
  grey500,
  purple800,
  white
} from "material-ui/styles/colors";
import uispacing from "material-ui/styles/spacing";
import {fade} from "material-ui/utils/colorManipulator";

const PlotifyMainTheme = {
  spacing: uispacing,
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: "#2D0444",
    primary2Color: "#764b8e",
    primary3Color: grey400,
    // accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: purple800,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
};

export default PlotifyMainTheme;
export const spacing = PlotifyMainTheme.spacing;
export const palette = PlotifyMainTheme.palette;
