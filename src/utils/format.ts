export function bytes(n?: number): string {
    if (!n) return "0 B";

    if (n < 1024) return `${n} B`;
    const units = ["KB", "MB", "GB", "TB"];
    let i = -1;
    do {
        n = n / 1024;
        i++;
    } while (n >= 1024 && i < units.length - 1);

    return `${n.toFixed(1)} ${units[i]}`;
}

export function date(str?: string): string {
    if (!str) return "";

    const d = new Date(str);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
