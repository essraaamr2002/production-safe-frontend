"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const mismatch = useMemo(() => {
    if (!password || !confirm) return false;
    return password !== confirm;
  }, [password, confirm]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Missing token in URL.");
      return;
    }
    if (mismatch) {
      setError("Passwords do not match.");
          return;
        }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const res = await apiFetch<{ message?: string }>(`/api/auth/password-reset-confirm`, {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError(res.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.replace("/login"), 1200);
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
      <Card sx={{ width: "100%", maxWidth: 520 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={800}>
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose a new password for your account.
            </Typography>

            {success ? <Alert severity="success">Password updated. Redirecting…</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
            {mismatch && !error ? <Alert severity="warning">Passwords do not match.</Alert> : null}

            {!success ? (
              <Box component="form" onSubmit={submit}>
                <Stack spacing={2}>
                  <TextField
                    label="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    helperText="Minimum 8 characters is recommended."
                  />
                  <TextField
                    label="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    type="password"
                    required
                  />
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? "Submitting..." : "Reset password"}
                  </Button>
                </Stack>
              </Box>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
