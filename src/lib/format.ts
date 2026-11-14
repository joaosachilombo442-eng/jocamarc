const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

/** "2026-10-28" -> "28 de Outubro de 2026" (timezone-safe, no Date parsing). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  if (!d) return `${MONTHS[m - 1]} de ${y}`;
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
}

/** "2026-10" -> "Outubro de 2026" */
export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return ym;
  return `${MONTHS[m - 1]} de ${y}`;
}

/** Date of a publication, or the pending label while the association has not confirmed it. */
export function formatOptionalDate(iso: string | null | undefined): string {
  return iso ? formatDate(iso) : "Data a confirmar";
}
