"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { login, isAuthed } from "@/lib/auth";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("user@demo.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuthed()) {
      router.replace("/dashboard");
      return;
    }
    setChecking(false);
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.includes("@") || password.length < 4) {
      setLoading(false);
      setError("Invalid email or password.");
      return;
    }

    await new Promise((r) => setTimeout(r, 600));

    login(email);
    setLoading(false);
    router.replace("/dashboard");
  };

  if (checking) return null;

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={700}>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sandbox login for validation (mock session).
            </Typography>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Box component="form" onSubmit={submit}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                />
                <TextField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                />
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
                
  <Link href="/forgot-password" style={{ textDecoration: "none" }}>
    <Button variant="text" fullWidth>
      Forgot password?
    </Button>
  </Link>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
