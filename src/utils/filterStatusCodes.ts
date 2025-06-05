import { StatusCodeEntry, StatusCodeGroup } from "@/data/statusCodes";

// Flatten and filter all codes from groups
export function filterStatusCodes(
  groups: StatusCodeGroup[],
  query: string
): StatusCodeEntry[] {
  const q = query.toLowerCase();

  return groups
    .flatMap((group) => group.codes)
    .filter((entry) => {
      const bodyText = entry.mock.body
        ? JSON.stringify(entry.mock.body).toLowerCase()
        : "";
      const responseText = entry.mock.response
        ? JSON.stringify(entry.mock.response).toLowerCase()
        : "";

      return (
        entry.code.toString().includes(q) ||
        entry.title.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.example.toLowerCase().includes(q) ||
        entry.mock.method.toLowerCase().includes(q) ||
        entry.mock.url.toLowerCase().includes(q) ||
        bodyText.includes(q) ||
        responseText.includes(q) ||
        entry.tip.toLowerCase().includes(q)
      );
    });
}