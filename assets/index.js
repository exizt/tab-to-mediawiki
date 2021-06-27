// 변환기의 옵션들.
var TTTConverter = {
	output: '',
	options : {
		isIncludedHeader: true,
		isReverse: false,
		isOnlyItems: false,
		isSortable: false
	},
	selectors : {
		isIncludedHeader: "#opt_included_header",
		isReverse: "#opt_reverse",
		isOnlyItems: "#opt_only_items",
		isSortable: "#opt_sortable",
		textInput: "#input",
		copyBtn: "#btn_copyresult",
		output: "#output"
	}
}

/**
 * 이벤트 리스터
 */
document.addEventListener("DOMContentLoaded", ()=> {
	onLoadedEventListeners();

	function onLoadedEventListeners(){
		let sel = TTTConverter.selectors;
		let opt = TTTConverter.options;
		// 값 입력시
		addEv(sel.textInput, 'input', convert);

		// 옵션 변경시
		onChangeEv(sel.isReverse, (e)=>{ opt.isReverse = e.target.checked; convert(); })
		onChangeEv(sel.isIncludedHeader, (e)=>{ opt.isIncludedHeader = e.target.checked; convert(); })
		onChangeEv(sel.isOnlyItems, (e)=>{ opt.isOnlyItems = e.target.checked; convert(); })
		onChangeEv(sel.isSortable, (e)=>{ opt.isSortable = e.target.checked; convert(); })

		addEv(sel.copyBtn, 'click', (e)=>{
			e.preventDefault();
			copyToClipboard(TTTConverter.output);
		})
	}
	
	function addEv(sel, type, event){
		document.querySelector(sel).addEventListener(type, event);
	}

	function onChangeEv(sel, event){
		addEv(sel, 'change', event)
	}
});


/**
* 변환
*/
function convert(){
	var t2m = new Tab2Mediawiki()
	let sel = TTTConverter.selectors
	TTTConverter.output = t2m.convert(document.querySelector(sel.textInput).value, TTTConverter.options);
	document.querySelector(sel.output).innerHTML = TTTConverter.output;
}


/**
* source : http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
*/
function copyToClipboard(text) {
	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

	if (window.clipboardData) { // Internet Explorer
		caseIE(text);
	} else {
		executeCopy(text);
	}
	//$("#copy-msg").text("copied");

	/*
	* old IE version
	*/
	function caseIE(text)
	{
		if(console) console.log("caseIE");
		window.clipboardData.setData("Text", text);
	}
	/*
	* 일반적인 경우
	*/
	function executeCopy(text)
	{
		var input = document.createElement('textarea');
		document.body.appendChild(input);
		input.value = text;
		input.select();
		try{
			document.execCommand('Copy');
		} catch(e) {
			if(console) console.log(e);
		}
		//input.remove();
		document.body.removeChild(input);
	}
}