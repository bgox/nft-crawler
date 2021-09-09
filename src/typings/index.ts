export interface NftIdentificationInfo {
    contract: string;
    tokenId: string;
    platformUrl: string;
}

export interface MsgResponse<T = any> {
    /** 0 success, -1 failed */
    code: 0 | -1;
    /** may be data when operation success, or error message when operation failed  */
    data: T;
}