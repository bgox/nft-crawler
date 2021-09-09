import { MsgResponse, NftIdentificationInfo } from './typings';
import { extractHex } from './utils';

(window as any).__dataverseNftCrawler = {
    getNft: (platform: string) => {
        switch (platform.toLocaleLowerCase()) {
            case "opensea":
                return (window as any).__dataverseNftCrawler.opensea();
                break;
            case "superrare":
                return (window as any).__dataverseNftCrawler.superrare();
                break;
            case "zora":
                return (window as any).__dataverseNftCrawler.zora();
                break;
            case "foundation":
                return (window as any).__dataverseNftCrawler.foundation();
                break;
            case "twitter":
                return (window as any).__dataverseNftCrawler.twitter();
                break;
            case "rarible":
                return (window as any).__dataverseNftCrawler.rarible();
                break;
            case "niftygateway":
                return (window as any).__dataverseNftCrawler.niftygateway();
                break;
            case "asyncart":
                return (window as any).__dataverseNftCrawler.asyncart();
                break;
            default:
                break;
        }
    },
    opensea: (): NftIdentificationInfo => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo> = {
            code: -1,
            data: nftInfo
        };
        if (location.href.startsWith('https://opensea.io/assets/0x')) {
            nftInfo.contract = extractHex(location.href)!;
            nftInfo.tokenId = location.href.split('?')[0].split(':')[1].split('/')[5];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        } else if (
            location.href.includes('https://opensea.io/assets/matic/0x') ||
            location.href.includes('https://opensea.io/assets/klaytn/0x')
        ) {
            response.code = -1;
            response.data = 'notSupportChain';
        } else {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return nftInfo;
    },
    superrare: () => {
        return "superrare";
    },
    zora: (): NftIdentificationInfo => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo> = {
            code: -1,
            data: nftInfo
        };
        const link = document.querySelector<HTMLLinkElement>('.css-rxk9pl a');
        if (!link) {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        } else {
            let url = link.href ?? '';
            nftInfo.contract = extractHex(url) ?? '';
            nftInfo.tokenId = url.split('=')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        return nftInfo;
    },
    foundation: () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo> = {
            code: -1,
            data: nftInfo
        };
        const link = document.querySelector<HTMLLinkElement>('.css-1hhedd7 a');
        if (!link) {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        } else {
            let url = link.href ?? '';
            nftInfo.contract = extractHex(url)!;
            nftInfo.tokenId = url.split('=')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        return nftInfo;
    },
    twitter: () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo> = {
            code: -1,
            data: 'notFoundNFT'
        };
        return response;
    },
    rarible: () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo> = {
            code: -1,
            data: nftInfo
        };
        if (location.href.startsWith('https://rarible.com/token/0x')) {
            try {
                nftInfo.contract = extractHex(location.href)!;
                let tmpSplitArr = location.href.split('?')[0].split(':');
                nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = 'notFoundNFT';
                } else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            } catch {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
        } else {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return response;
    },
    niftygateway: () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo> = {
            code: -1,
            data: nftInfo
        };
        if (location.href.startsWith('https://niftygateway.com/itemdetail/secondary/0x')) {
            try {
                nftInfo.contract = extractHex(location.href)!;
                let tmpSplitArr = location.href.split('/');
                nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1];
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = 'notFoundNFT';
                } else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            } catch {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
        } else if (
            location.href.startsWith('https://niftygateway.com/marketplace?collection=0x') &&
            location.href.includes("tokenId")
        ) {
            try {
                nftInfo.contract = extractHex(location.href)!;
                const tokenStr = location.href.match(/&tokenId=\d+/)?.[0];
                nftInfo.tokenId = tokenStr !== undefined ? tokenStr.split('=')[1] : "";
                if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                    response.code = -1;
                    response.data = 'notFoundNFT';
                } else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            } catch {
                response.code = -1;
                response.data = 'notFoundNFT';
            }
        } else if (location.href.startsWith('https://niftygateway.com/itemdetail/primary/0x')) {
            response.code = -1;
            response.data = 'notSupportAtCurrentPage';
        } else {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return response;
    },
    asyncart: () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo> = {
            code: -1,
            data: nftInfo
        };
        try {
            nftInfo.contract = extractHex(location.href)!;
            let tmpSplitArr = location.href.split('/');
            nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1].split('-')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = 'notFoundNFT';
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        } catch {
            response.code = -1;
            response.data = 'geNFTFromDetailPage';
        }
        return response;
    },
}

const listen = (() => {
    window.addEventListener("message", (e) => {
        if (e.data.msgType && e.data.msgType === "fetchNftRequest") {
            const platFormType: string = e.data.platform;
            const nft = (window as any).__dataverseNftCrawler.getNft(platFormType);
            const message = { msgType: "fetchNftResponse", platform: platFormType, data: nft };
            window.postMessage(message, "*");
        }
    }, false);
})();



