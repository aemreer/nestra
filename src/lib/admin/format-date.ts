const formatter = new Intl.DateTimeFormat("tr-TR", {
  timeZone: "Europe/Istanbul",
  day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
});

export function formatAdminDate(value: string) {
  return formatter.format(new Date(value));
}
