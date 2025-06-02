import { statusCodes } from "@/data/statusCodes";
import { notFound } from "next/navigation";

interface PageProps {
  params: { code: string };
}

export function generateStaticParams() {
  return statusCodes.map((status) => ({
    code: status.code.toString(),
  }));
}

export default function StatusDetailPage({ params }: PageProps) {
  const code = Number(params.code);
  const status = statusCodes.find((s) => s.code === code);

  if (!status) {
    notFound();
  }

  return (
    <div>
      <h1>
        {status.code} - {status.message}
      </h1>
      <p>{status.description}</p>
    </div>
  );
}
