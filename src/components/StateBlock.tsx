import { Alert, Box, Button, CircularProgress, Stack } from "@mui/material";

type Props = {
  title: string;
  description?: string;
  severity?: "info" | "success" | "warning" | "error";
  loading?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export function StateBlock({
  title,
  description,
  severity = "info",
  loading,
  actionLabel,
  onAction,
}: Props) {
  return (
    <Alert severity={severity}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ flex: 1 }}>
          <strong>{title}</strong>
          {description ? <div>{description}</div> : null}
        </Box>

        {loading ? <CircularProgress size={20} /> : null}

        {actionLabel && onAction ? (
          <Button onClick={onAction} size="small" variant="outlined">
            {actionLabel}
          </Button>
        ) : null}
      </Stack>
    </Alert>
  );
}
