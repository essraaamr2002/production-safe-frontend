import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const time = searchParams.get("time");
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  // Simulate error
  if (status === "inactive" && category === "retention") {
    return NextResponse.json({ message: "Simulated API error" }, { status: 500 });
  }

  // Simulate empty
  if (time === "24h" && category === "traffic") {
    return NextResponse.json({ kpis: [], series: [] }, { status: 200 });
  }

  // Normal mock response
  return NextResponse.json(
    {
      kpis: [
        { label: "Time", value: time ? time.length : 0 },
        { label: "Category", value: category ? category.length : 0 },
        { label: "Status", value: status ? status.length : 0 },
      ],
      series: [
        { label: "Metric A", value: Math.floor(Math.random() * 100) },
        { label: "Metric B", value: Math.floor(Math.random() * 100) },
      ],
    },
    { status: 200 }
  );
}
