import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  typography: {
    fontFamily: ["Inconsolata"].join(","),
    button: {
      fontSize: "1.4rem",
      textTransform: "none",
    },
  },
});

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, padding: "16px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            colorful-xg (beta)
          </Typography>
        </Box>
        <hr style={{ borderColor: "#ccc", marginBottom: "16px" }} />
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
