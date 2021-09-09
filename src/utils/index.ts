export function extractHex(str: string) {
    return str.match(/0x[\dA-Za-z]+/)?.[0];
}