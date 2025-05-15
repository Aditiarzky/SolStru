import { formatDistanceToNow, parseISO, differenceInDays, format } from "date-fns";
import { id } from "date-fns/locale";

export function formatShortDate(createdAt) {
  const date = parseISO(createdAt);
  const now = new Date();

  const daysDiff = differenceInDays(now, date);

  if (daysDiff > 7) {
    return format(date, "d/M/yyyy"); // Format: 1/9/2024
  }

  // Format singkat (contoh: 2 jm lalu, 5 mnt lalu)
  const full = formatDistanceToNow(date, {
    addSuffix: true,
    locale: id,
  });

  // Ganti teks panjang jadi singkatan
  return full
    .replace("menit", "mnt")
    .replace("jam", "jm")
    .replace("hari", "hr")
    .replace("detik", "dtk")
    .replace("yang lalu", "lalu")
    .replace("sekitar ", ""); // opsional: buang "sekitar"
}

export function formatDate(createdAt) {
  const date = parseISO(createdAt);
  return format(date, "d/M/yyyy"); // Format: 1/9/2024
}
