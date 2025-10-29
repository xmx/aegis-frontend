/**
 * Details is Problem Details for HTTP APIs.
 * RFC7807 https://www.rfc-editor.org/rfc/rfc7807
 */
export interface Details {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
}
