/**
 * Tab2Mediawiki 1.1.12
 */
class Tab2Dokuwiki {
    /**
     * constructor
     */
    constructor() {

    }

    /**
    * 변환
    */
    convert(text: string, options: ITab2DokuwikiOptions) {
        return this.encodeText(text, options);
    }

    /**
     * 탭을 미디어위키 테이블 형식으로 변환
     * @param text 
     * @param options 
     * @returns 
     */
    encodeText(text: string, options: ITab2DokuwikiOptions) {
        let result = "";
        const list = text.split(/\n/);//줄 단위로 분리

        for (let key in list) {
            // let i = Number(key)
            const i = +key // string to integer
            let item = list[key];

            if (item.replace(/(^\s*)|(\s*$)/gi, "") == "") {
                continue;
            }

            if (options.isIncludedHeader && i == 0) {
                item = item.replace(/\t/g, " ^ ");
            } else {
                item = item.replace(/\t/g, " | ");
            }

            // append result
            let it = "";
            // result += "|-\n";
            if (options.isIncludedHeader && i == 0) {
                it += "^ ";
                it += item;
                it += " ^";
            } else {
                it += "| ";
                it += item;
                it += " |";
            }
            it += "\n";
            // result += it
            list[key] = it
        }

        result += list.join('')
        return result;
    }
}
interface ITab2DokuwikiOptions {
    isIncludedHeader: boolean;
}