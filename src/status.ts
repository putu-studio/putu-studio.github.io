// Builds the status label shown on project cards and pages, for example
// "In progress", "In progress · code available" or
// "In progress · code and hardware available".
// "Available" is only shown once a real link exists, so the label never promises an empty repo.
export function statusLabel(d: { status: string; repo?: string; hardware?: string }): string {
  const base = d.status.charAt(0).toUpperCase() + d.status.slice(1);
  if (d.repo && d.hardware) return `${base} · code and hardware available`;
  if (d.repo) return `${base} · code available`;
  if (d.hardware) return `${base} · hardware available`;
  return base;
}
