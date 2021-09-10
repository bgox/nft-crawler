import { MsgResponse, NftIdentificationInfo } from './typings';
import { extractHex } from './utils';
import $ from 'cash-dom';

(window as any).__dataverseNftCrawler = {
    getNft: async (platform: string) => {
        switch (platform.toLocaleLowerCase()) {
            case "opensea":
                return await (window as any).__dataverseNftCrawler.opensea();
                break;
            case "superrare":
                return await (window as any).__dataverseNftCrawler.superrare();
                break;
            case "zora":
                return await (window as any).__dataverseNftCrawler.zora();
                break;
            case "foundation":
                return await (window as any).__dataverseNftCrawler.foundation();
                break;
            case "twitter":
                return await (window as any).__dataverseNftCrawler.twitter();
                break;
            case "rarible":
                return await (window as any).__dataverseNftCrawler.rarible();
                break;
            case "niftygateway":
                return await (window as any).__dataverseNftCrawler.niftygateway();
                break;
            case "asyncart":
                return await (window as any).__dataverseNftCrawler.asyncart();
                break;
            default:
                break;
        }
    },
    opensea: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
            code: -1,
            data: nftInfo
        };
        if (location.href.startsWith('https://opensea.io/assets/0x')) {
            nftInfo.contract = extractHex(location.href)!;
            nftInfo.tokenId = location.href.split('?')[0].split(':')[1].split('/')[5];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        } else if (
            location.href.includes('https://opensea.io/assets/matic/0x') ||
            location.href.includes('https://opensea.io/assets/klaytn/0x')
        ) {
            response.code = -1;
            response.data = { msgType: 'notSupportChain', msgContent: '' };
        } else {
            response.code = -1;
            response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
        }
        return response;
    },
    superrare: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
            code: -1,
            data: nftInfo
        };
        const itemLinkSelector =
            '.collectible-history-section > .collectible-history-item > .collectible-history-item-link';
        const itemLinks = document.querySelectorAll<HTMLLinkElement>(itemLinkSelector);
        if (!itemLinks) {
            response.code = -1;
            response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
            return response;
        }

        const domUrl = itemLinks[itemLinks.length - 1].href ?? '';
        const redirectUrl = `<a href='${domUrl}' target='_blank'>[view tx]</a>`;
        let url = `${domUrl}#eventlog`;
        // let data = '';
        // let resp: AxiosResponse<string> | undefined;
        // try {
        //     resp = await axios.get(url, {
        //         timeout: 5000,
        //     });
        // } catch (error) {
        //     console.log(error);
        //     response.code = -1;
        //     response.data = { msgType: 'validViewTX', msgContent: redirectUrl };
        //     return response;
        // }
        // data = resp?.data ?? '';
        // await axios.get(url);
        let data:any;
        try{
            data = await fetch(url,{
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-cache',
                redirect: 'follow'
            });
        } catch (error) {
            console.log(error);
            response.code = -1;
            response.data = { msgType: 'validViewTX', msgContent: redirectUrl };
            return response;
        }
        const $html = $(data);
        try {
            const dl = $($html).find('#myTabContent #eventlog .card-body .media .media-body dl');
            if (!dl || dl.length === 0) {
                response.code = -1;
                response.data = { msgType: 'validViewTX', msgContent: redirectUrl };
                return response;
            }
            let li = $(dl[dl.length - 2]).find('dd ul li');
            const dom_a = $(li[li.length - 1])
                .find('span')
                .last()
                .find('a');
            li = $(dl[dl.length - ((dom_a && dom_a.length) > 0 ? 1 : 2)]).find('dd ul li');
            nftInfo.contract = $(dl[0]).find('dd').children('a').text();
            nftInfo.tokenId = $(li[li.length - 1])
                .find('span')
                .last()
                .text();
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
                return response;
            } else {
                response.code = 0;
                response.data = nftInfo;
                return response;
            }
        } catch {
            response.code = -1;
            response.data = { msgType: 'validViewTX', msgContent: redirectUrl };
            return response;
        }
    },
    zora: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
            code: -1,
            data: nftInfo
        };
        const link = document.querySelector<HTMLLinkElement>('.css-rxk9pl a');
        if (!link) {
            response.code = -1;
            response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
        } else {
            let url = link.href ?? '';
            nftInfo.contract = extractHex(url) ?? '';
            nftInfo.tokenId = url.split('=')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        return response;
    },
    foundation: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
            code: -1,
            data: nftInfo
        };
        const link = document.querySelector<HTMLLinkElement>('.css-1hhedd7 a');
        if (!link) {
            response.code = -1;
            response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
        } else {
            let url = link.href ?? '';
            nftInfo.contract = extractHex(url)!;
            nftInfo.tokenId = url.split('=')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        }
        return response;
    },
    twitter: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
            code: -1,
            data: { msgType: 'notFoundNFT', msgContent: '' }
        };
        return response;
    },
    rarible: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
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
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                } else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            } catch {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
            }
        } else {
            response.code = -1;
            response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
        }
        return response;
    },
    niftygateway: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
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
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                } else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            } catch {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
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
                    response.data = { msgType: 'notFoundNFT', msgContent: '' };
                } else {
                    response.code = 0;
                    response.data = nftInfo;
                }
            } catch {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
            }
        } else if (location.href.startsWith('https://niftygateway.com/itemdetail/primary/0x')) {
            response.code = -1;
            response.data = { msgType: 'notSupportAtCurrentPage', msgContent: '' };
        } else {
            response.code = -1;
            response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
        }
        return response;
    },
    asyncart: async () => {
        const nftInfo: NftIdentificationInfo = {
            contract: '',
            tokenId: '',
            platformUrl: location.href
        };
        const response: MsgResponse<string | NftIdentificationInfo | any> = {
            code: -1,
            data: nftInfo
        };
        try {
            nftInfo.contract = extractHex(location.href)!;
            let tmpSplitArr = location.href.split('/');
            nftInfo.tokenId = tmpSplitArr[tmpSplitArr.length - 1].split('-')[1];
            if (nftInfo.contract.length === 0 || nftInfo.tokenId.length === 0) {
                response.code = -1;
                response.data = { msgType: 'notFoundNFT', msgContent: '' };
            } else {
                response.code = 0;
                response.data = nftInfo;
            }
        } catch {
            response.code = -1;
            response.data = { msgType: 'geNFTFromDetailPage', msgContent: '' };
        }
        return response;
    },
}

const listen = (() => {
    window.addEventListener("message", async (e) => {
        if (e.data.msgType && e.data.msgType === "fetchNftRequest") {
            const platFormType: string = e.data.platform;
            const res = await (window as any).__dataverseNftCrawler.getNft(platFormType);
            const message = { msgType: "fetchNftResponse", platform: platFormType, data: res };
            window.postMessage(message, "*");
        }
    }, false);
})();



