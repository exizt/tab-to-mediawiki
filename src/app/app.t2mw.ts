import { bind } from "./app.include";
import { Tab2Mediawiki } from "../Tab2Mediawiki";

/**
 * 이벤트 바인딩
 */
document.addEventListener("DOMContentLoaded", ()=> {
	const converter = new Tab2Mediawiki()
	const optionSet = {
		options : {
			isIncludedHeader: true,
			isReverse: false,
			isOnlyItems: false,
			isSortable: false
		},
		selector: {
			isIncludedHeader: "#opt_included_header",
			isReverse: "#opt_reverse",
			isOnlyItems: "#opt_only_items",
			isSortable: "#opt_sortable",
			input: "#input",
			copyBtn: "#btn_copyresult",
			output: "#output"
		}
	}
	bind(converter, optionSet)
})