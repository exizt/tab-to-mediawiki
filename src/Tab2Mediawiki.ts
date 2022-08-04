/**
 * Tab1Mediawiki 1.1.11
 */
class Tab2Mediawiki {
    output: string = '';

    /**
     * constructor
     */
    constructor() {

    }

    /**
    * 변경
    */
    convert(text: string, options: ITab2MediawikiOptions) {
        this.output = ''
        this.output = (options.isReverse) ? this.decodeString(text, options) : this.encodeString(text, options);

    }

    /**
     * tab to mediawiki format
     * @param text 
     * @param options 
     * @returns 
     */
    encodeString(text: string, options: ITab2MediawikiOptions) {
        let result = "";
        let list = text.split(/\n/);//줄 단위로 분리

        if (!options.isOnlyItems) {
            if (options.isSortable) {
                result += "{| class=\"wikitable sortable\"\n";
            } else {
                result += "{| class=\"wikitable\"\n";
            }
        }

        for (let key in list) {
            let i = Number(key)
            let item = list[key];

            if (item.replace(/(^\s*)|(\s*$)/gi, "") == "") {
                continue;
            }

            if (options.isIncludedHeader && i == 0) {
                item = item.replace(/\t/g, " !! ");
            } else {
                item = item.replace(/\t/g, " || ");
            }

            // append result
            result += "|-\n";
            if (options.isIncludedHeader && i == 0) {
                result += "! ";
            } else {
                result += "| ";
            }
            result += item;
            result += "\n";
        }
        if (!options.isOnlyItems) {
            result += "|}";
        }
        return result;
    }

    /**
     * mediawiki format to tab text
     * @param text 
     * @param options 
     * @returns 
     */
    decodeString(text: string, options: ITab2MediawikiOptions) {
        var result = "";
        text = text.replace(/(\n\|\})/, "");//제일 끝부분
        var list = text.split(/(\n\|-\n)/);//줄 단위로 분리

        //console.log(list);

        for (var key in list) {
            let i = Number(key)
            let item = list[key];

            if (item.replace(/(\n\|-\n)/gi, "") == "") {
                continue;
            }
            //상단 구문 제거
            if (i <= 1) {
                var firstcheck = /(^\{\|)/i;
                if (firstcheck.test(item)) {
                    continue;
                }
            }

            // 앞부분 처리
            item = item.replace(/(^!)/, "");
            item = item.replace(/(^\|)/, "");

            // 공백 처리
            item = item.replace(/(^\s)|(\s*$)/gi, "");// trim 처리 => 빈칸없앰
            item = item.replace(/(\s*\|\|\s*)/g, "\|\|");//세부별 trim 처리 => 빈칸없앰
            item = item.replace(/(\s*!!\s*)/g, "!!");//세부별 trim 처리 => 빈칸없앰

            // 탭으로 변경
            item = item.replace(/(\|\|)/gi, "\t");//|| => 탭
            item = item.replace(/(!!)/gi, "\t");// !! => 탭

            result += item;
            result += "\n";
        }
        return result;
    }
}
interface ITab2MediawikiOptions {
    isIncludedHeader: boolean;
    isReverse: boolean;
    isOnlyItems: boolean;
    isSortable: boolean;
}