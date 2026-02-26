import type { SxProps, Theme } from "@mui/material/styles";

export const AUTH_DIALOG_Z_INDEX = 20000;

export const authDialogSx: SxProps<Theme> = {
  zIndex: AUTH_DIALOG_Z_INDEX,
};

export const authDialogSlotProps = {
  backdrop: {
    sx: {
      zIndex: AUTH_DIALOG_Z_INDEX - 1,
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      backdropFilter: "blur(2px)",
    },
  },
} as const;

export const getAuthDialogPaperSx = (width = 580): SxProps<Theme> => ({
  width: {
    xs: "calc(100vw - 20px)",
    sm: `${width}px`,
  },
  maxWidth: "calc(100vw - 20px)",
  maxHeight: "calc(100dvh - 20px)",
  m: { xs: 1.25, sm: 2 },
  borderRadius: { xs: "14px", sm: "16px" },
  overflowY: "auto",
  position: "relative",
  zIndex: AUTH_DIALOG_Z_INDEX,
});

export const authOtpSx: SxProps<Theme> = {
  width: "100%",
  "& .MuiOtpInput-Box": {
    width: "100%",
    justifyContent: "center",
    flexWrap: "nowrap",
    gap: { xs: "6px", sm: "10px" },
  },
  "& .MuiOtpInput-TextField": {
    flex: { xs: "1 1 0", sm: "0 0 auto" },
    maxWidth: { xs: "44px", sm: "56px" },
  },
  "& .MuiOtpInput-TextField input": {
    width: "100%",
    height: { xs: "48px", sm: "56px" },
    p: 0,
    textAlign: "center",
    fontSize: { xs: "20px", sm: "24px" },
  },
};
