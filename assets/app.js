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

	bind()

	// 이벤트 바인딩
	function bind(){
		let selector = optionSet.selector
		let options = optionSet.options;
		
		// 문자열 입력 시 이벤트
		_add_event(selector.input, 'input', convert);

		// 옵션 변경시
		_add_change_event(selector.isReverse, (e)=>{ options.isReverse = e.target.checked; convert(); })
		_add_change_event(selector.isIncludedHeader, (e)=>{ options.isIncludedHeader = e.target.checked; convert(); })
		_add_change_event(selector.isOnlyItems, (e)=>{ options.isOnlyItems = e.target.checked; convert(); })
		_add_change_event(selector.isSortable, (e)=>{ options.isSortable = e.target.checked; convert(); })

		_add_event(selector.copyBtn, 'click', (e)=>{
			e.preventDefault();
			copyToClipboard(converter.output);
		})
	}
	
	// 이벤트 리스너 추가
	function _add_event(sel, type, event){
		document.querySelector(sel).addEventListener(type, event);
	}

	// change 이벤트 리스너 추가
	function _add_change_event(sel, event){
		_add_event(sel, 'change', event)
	}

	/**
	* 변환
	*/
	function convert(){
		let selector = optionSet.selector
		converter.convert(document.querySelector(selector.input).value, optionSet.options)
		document.querySelector(selector.output).innerHTML = converter.output;
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
});

