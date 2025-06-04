import { StatusCodeEntry, StatusCodeGroup } from "@/data/statusCodes";

// Flatten and filter all codes from groups
export function filterStatusCodes(
  groups: StatusCodeGroup[],
  query: string
): StatusCodeEntry[] {
  const q = query.toLowerCase();

  return groups
    .flatMap((group) => group.codes)
    .filter(
      (entry) =>
        entry.code.toString().includes(q) ||
        entry.title.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.example.toLowerCase().includes(q) ||
        entry.mock.method.toLowerCase().includes(q) ||
        entry.mock.url.toLowerCase().includes(q) ||
        JSON.stringify(entry.mock.response).toLowerCase().includes(q) ||
        entry.tip.toLowerCase().includes(q)
    );
}
