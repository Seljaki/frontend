import { Box, Typography } from "@mui/material"

function ErrorPage() {
  return (
    <Box display="flex" flex={1} justifyContent="center" alignItems="center">
      <Typography variant="h2">404 - Stran ne obstaja</Typography>
    </Box>
  )
}

export default ErrorPage