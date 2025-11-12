export class Page {
    page: number
    size: number
    keyword?: string

    constructor() {
        this.page = 1
        this.size = 10
    }

    public toURLSearchParams(params?: URLSearchParams) {
        if (!params) {
            params = new URLSearchParams()
        }
        if (this.page > 1) {
            params.set('page', String(this.page))
        }
        if (this.page > 1) {
            params.set('size', String(this.size))
        }
        if (this.keyword) {
            params.set('keyword', this.keyword)
        }

        return params
    }
}
