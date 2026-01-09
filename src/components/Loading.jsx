import { Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
          letterSpacing: "0.05rem",
        }}
      >
        불러오는 중...
      </Typography>
    </Box>
  );
}

export default Loading;
