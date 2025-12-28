"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await apiFetch<{ message?: string }>(`/api/auth/password-reset-request`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!res.ok) {
      setError(res.message);
      return;
    }

    setDone(true);
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
      <Card sx={{ width: "100%", maxWidth: 480 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5" fontWeight={800}>
                Forgot Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your email and we’ll send you a reset link.
              </Typography>
            </Box>

            {done ? (
              <Stack spacing={2}>
                <Alert severity="success">
                  Please check your email to reset your password.
                </Alert>

                {/* Sandbox helper: simulate email token */}
                <Button
                  variant="contained"
                  onClick={() => router.push("/reset-password?token=test_token")}
                >
                  Go to reset password (sandbox)
                </Button>
              </Stack>
            ) : (
              <Box component="form" onSubmit={submit}>
                <Stack spacing={2}>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    required
                    fullWidth
                  />

                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? "Sending..." : "Send reset link"}
                  </Button>

                  {error ? <Alert severity="error">{error}</Alert> : null}
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
