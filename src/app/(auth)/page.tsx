import Link from "next/link";
import { Card, CardContent, Stack, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Sandbox Frontend</Typography>

      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Dashboard
              </Button>
            </Link>

            <Link href="/forgot-password" style={{ textDecoration: "none" }}>
              <Button variant="outlined" fullWidth>
                Forgot Password
              </Button>
            </Link>

            <Link href="/reset-password?token=test_token" style={{ textDecoration: "none" }}>
              <Button variant="outlined" fullWidth>
                Reset Password (sample)
              </Button>
            </Link>

            <Link href="/verify?token=test_token" style={{ textDecoration: "none" }}>
              <Button variant="outlined" fullWidth>
                Verify (sample)
              </Button>
            </Link>

            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="text" fullWidth>
                Login (placeholder)
              </Button>
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
