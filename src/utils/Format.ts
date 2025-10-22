export default class Format {

    public static bytes(n?: number) {
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

}