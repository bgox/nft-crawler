import { MsgResponse, NftIdentificationInfo } from './typings';
import { extractHex } from './utils';

(window as any).__dataverseNftCrawler = {
    getNft: (platform: string) => {
        switch(platform.toLocaleLowerCase()){
            case "opensea":
                return (window as any).__dataverseNftCrawler.opensea();
                break;
            case "superrare":
                return (window as any).__dataverseNftCrawler.superrare();
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
    foundation: () => {

    },
    twitter: () => {

    },
    rarible: () => {

    },
    niftygateway: () => {

    },
    asyncart: () => {

    },
}

const listen = (() => {
    window.addEventListener("message", (e) => {
        if (e.data.msgType && e.data.msgType === "fetchNftRequest") {
            // console.log("recived message", e);
            // const nft = (window as any).__dataverseNftCrawler.opensea();
            // const message = { msgType: "fetchNftResponse", platform: "opensea", data: nft };
            // window.postMessage(message, "*");
            console.log("recived message", e);
            const platFormType:string = e.data.platform;
            const nft = (window as any).__dataverseNftCrawler.getNft(platFormType);
            const message = { msgType: "fetchNftResponse", platform: platFormType, data: nft };
            window.postMessage(message, "*");
        }
    }, false);
})();



