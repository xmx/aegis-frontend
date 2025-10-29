export class PageRequest {

    public page: number;
    public size: number;
    public keyword: string;

    constructor(page = 1, size = 10, keyword = "") {
        this.page = page;
        this.size = size;
        this.keyword = keyword;
    }

    toQuery(): string {
        const params = new URLSearchParams()
        if (this.page > 0) {
            params.set("page", String(this.page));
        }
        if (this.size > 0) {
            params.set("size", String(this.size));
        }
        if (this.keyword !== "") {
            params.set("keyword", this.keyword);
        }

        return params.toString();
    }

    toJSON(): string {
        return JSON.stringify(this);
    }
}

export interface PageResponse<T> {
    page: number;
    size: number;
    count: number;
    records: T[];
}
