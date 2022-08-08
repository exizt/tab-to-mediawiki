/**
 * Tab2Mediawiki 1.1.12
 */
export class Tab2Markdown {
    /**
     * constructor
     */
    constructor() {

    }

    /**
    * 변환
    */
    convert(text: string, options: ITab2MarkdownOptions) {
        return this.encodeText(text, options);
    }

    /**
     * 탭을 미디어위키 테이블 형식으로 변환
     * @param text 
     * @param options 
     * @returns 
     */
    encodeText(text: string, options: ITab2MarkdownOptions) {
        let result = "";
        const list = text.split(/\n/);//줄 단위로 분리

        for (let key in list) {
            // let i = Number(key)
            const i = +key // string to integer
            let item = list[key];

            if (item.replace(/(^\s*)|(\s*$)/gi, "") == "") {
                continue;
            }

            item = item.replace(/\t/g, " | ");
            
            // row에 해당되는 형식 생성 (|내용1|내용2|내용3|)
            let it = "";
            it += "| ";
            it += item;
            it += " |";

            // markdown에서는 헤더와 내용 사이에 |---|---| 와 같이 넣는다.
            if (options.isIncludedHeader && i == 0) {
                let tabCount = (list[key].match(/\t/g) || []).length + 1
                if(tabCount > 0){
                    it += "\n" + '|---'.repeat(tabCount) + '|'
                }
            }

            it += "\n";
            // result += it
            list[key] = it
        }

        result += list.join('')
        return result;
    }
}
interface ITab2MarkdownOptions {
    isIncludedHeader: boolean;
}