import { Box } from "@mui/material"

function MapOverlay({children, style}) {
  return (
    <Box position="absolute" sx={{ backgroundColor: theme => theme.palette.background.default, borderRadius: 1, ...style}} zIndex={1000}>
      {children}
    </Box>
  )
}

export default MapOverlay