"use client";

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { StateBlock } from "@/components/StateBlock";
import { useRouter } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

type AnalyticsResponse = {
  kpis?: { label: string; value: number }[];
  series?: { label: string; value: number }[];
};

const timeOptions = ["24h", "7d", "30d"];
const categoryOptions = ["all", "sales", "traffic", "retention"];
const statusOptions = ["all", "active", "inactive"];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed()) router.replace("/login");
  }, [router]);

  const [time, setTime] = useState("7d");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsResponse | null>(null);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set("time", time);
    p.set("category", category);
    p.set("status", status);
    return p.toString();
  }, [time, category, status]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const res = await apiFetch<AnalyticsResponse>(`/api/analytics?${query}`);
      if (cancelled) return;

      if (!res.ok) {
        setData(null);
        setError(res.message);
      } else {
        setData({
          kpis: Array.isArray(res.data?.kpis) ? res.data.kpis : [],
          series: Array.isArray(res.data?.series) ? res.data.series : [],
        });
      }

      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const isEmpty =
    !loading &&
    !error &&
    data &&
    (data.kpis?.length ?? 0) === 0 &&
    (data.series?.length ?? 0) === 0;

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Dashboard
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          <Chip label={`Time: ${time}`} />
          <Chip label={`Category: ${category}`} />
          <Chip label={`Status: ${status}`} />
        </Stack>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Filters
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Time</InputLabel>
                <Select label="Time" value={time} onChange={(e) => setTime(String(e.target.value))}>
                  {timeOptions.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(String(e.target.value))}
                >
                  {categoryOptions.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(String(e.target.value))}
                >
                  {statusOptions.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {loading ? (
        <StateBlock title="Loading analytics..." loading severity="info" />
      ) : error ? (
        <StateBlock
          title="Failed to load analytics"
          description={error}
          severity="error"
          actionLabel="Retry"
          onAction={() => location.reload()}
        />
      ) : isEmpty ? (
        <StateBlock title="No data" description="Try changing filters." severity="warning" />
      ) : (
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={800}>
            KPIs
          </Typography>

          <Grid container spacing={2}>
            {(data?.kpis ?? []).map((k) => (
              <Grid key={k.label} item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {k.label}
                    </Typography>
                    <Typography variant="h4" fontWeight={900}>
                      {k.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" fontWeight={800}>
            Series
          </Typography>

          <Card>
            <CardContent>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(data?.series ?? []).map((s) => (
                    <TableRow key={s.label}>
                      <TableCell>{s.label}</TableCell>
                      <TableCell align="right">{s.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Stack>
  );
}
