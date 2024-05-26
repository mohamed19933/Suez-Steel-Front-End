import { Box, styled } from "@mui/material";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));
const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));
const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));
const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 300, //400
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

export { FlexBox, JustifyBox, ContentBox, JWTRegister };
