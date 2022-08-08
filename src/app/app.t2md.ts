import { bind } from "./app.include";
import { Tab2Markdown } from "../Tab2Markdown";

/**
 * 이벤트 바인딩
 */
document.addEventListener("DOMContentLoaded", ()=> {
	const converter = new Tab2Markdown()
	const optionSet = {
		options : {
			isIncludedHeader: true
		},
		selector: {
			isIncludedHeader: "#opt_included_header",
			input: "#input",
			copyBtn: "#btn_copyresult",
			output: "#output"
		}
	}
	bind(converter, optionSet)
})