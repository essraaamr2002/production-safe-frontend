"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Alert, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function verifyNow() {
    if (!token) {
      setLoading(false);
      setOk(false);
      setMessage("Missing token in URL.");
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await apiFetch<{ message?: string }>(`/api/auth/verify`, {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      setLoading(false);
      setOk(false);
      setMessage(res.message);
      return;
    }

    setLoading(false);
    setOk(true);
    setMessage(res.data?.message || "Verified successfully.");

    setTimeout(() => router.replace("/login"), 1200);
  }

  useEffect(() => {
    verifyNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
      <Card sx={{ width: "100%", maxWidth: 520 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={800}>
              Verify Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are verifying your email/phone token.
            </Typography>

            {loading ? (
              <Alert severity="info">Verifying...</Alert>
            ) : ok ? (
              <Alert severity="success">Success! Redirecting to login…</Alert>
            ) : (
              <Alert severity="error">{message || "Verification failed."}</Alert>
            )}

            {!loading && !ok ? (
              <Button variant="contained" onClick={verifyNow}>
                Resend verification
              </Button>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
