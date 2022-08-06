/**
 * Tab2Mediawiki 1.1.12
 */
class Tab2Mediawiki {
    output: string = '';

    /**
     * constructor
     */
    constructor() {

    }

    /**
    * 변환
    */
    convert(text: string, options: ITab2MediawikiOptions) {
        // this.output = ''
        return (options.isReverse) ? this.decodeText(text, options) : this.encodeText(text, options);
    }

    /**
     * 탭을 미디어위키 테이블 형식으로 변환
     * @param text 
     * @param options 
     * @returns 
     */
    encodeText(text: string, options: ITab2MediawikiOptions) {
        let result = "";
        const list = text.split(/\n/);//줄 단위로 분리

        if (!options.isOnlyItems) {
            if (options.isSortable) {
                result += "{| class=\"wikitable sortable\"\n";
            } else {
                result += "{| class=\"wikitable\"\n";
            }
        }

        for (let key in list) {
            // let i = Number(key)
            const i = +key // string to integer
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
            let it = "|-\n";
            // result += "|-\n";
            if (options.isIncludedHeader && i == 0) {
                it += "! ";
            } else {
                it += "| ";
            }
            it += item;
            it += "\n";
            // result += it
            list[key] = it
        }

        result += list.join('')

        if (!options.isOnlyItems) {
            result += "|}";
        }
        return result;
    }

    /**
     * 미디어위키 테이블 형식을 탭 형식으로 전환
     * @param text 
     * @param options 
     * @returns 
     */
    decodeText(text: string, options: ITab2MediawikiOptions) {
        let result = "";
        text = text.replace(/(\n\|\})/, "");//제일 끝부분
        const list = text.split(/(\n\|-\n)/);//줄 단위로 분리

        //console.log(list);

        for (let key in list) {
            // let i = Number(key)
            const i = +key // string to integer
            let item = list[key];

            if (item.replace(/(\n\|-\n)/gi, "") == "") {
                continue;
            }
            //상단 구문 제거
            if (i <= 1) {
                const firstcheck = /(^\{\|)/i;
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