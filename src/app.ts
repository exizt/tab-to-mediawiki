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
		_add_change_event(selector.isReverse, (e:Event) => { options.isReverse = (e.target as HTMLInputElement).checked; convert(); })
		_add_change_event(selector.isIncludedHeader, (e:Event)=>{ options.isIncludedHeader = (e.target as HTMLInputElement).checked; convert(); })
		_add_change_event(selector.isOnlyItems, (e:Event)=>{ options.isOnlyItems = (e.target as HTMLInputElement).checked; convert(); })
		_add_change_event(selector.isSortable, (e:Event)=>{ options.isSortable = (e.target as HTMLInputElement).checked; convert(); })

		_add_event(selector.copyBtn, 'click', (e:any)=>{
			e.preventDefault();
			copyToClipboard(converter.output);
		})
	}
	
	// 이벤트 리스너 추가
	function _add_event(sel:string, type:string, event:EventListener){
		document.querySelector(sel)?.addEventListener(type, event);
	}

	// change 이벤트 리스너 추가
	function _add_change_event(sel:string, event:EventListener){
		_add_event(sel, 'change', event)
	}

	/**
	* 변환
	*/
	function convert(){
		const selector = optionSet.selector

        const inputString = (document.querySelector(selector.input) as HTMLTextAreaElement).value
		converter.convert(inputString, optionSet.options);

        const output = document.querySelector(selector.output)
        if (output != null){
            output.innerHTML = converter.output;
        }
	}
	
	
	/**
	* source : http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
	*/
	function copyToClipboard(text: string) {
        if(navigator.clipboard){
            modern(text)
		} else {
			executeCopy(text);
		}
		//$("#copy-msg").text("copied");
	
        function modern(text:string){
            navigator.clipboard
            .writeText(text)
            //.then(() => console.log(`"${text}" was copied to clipboard.`))
            .catch((err) => console.error(`Error copying to clipboard: ${err}`));
        }

		/*
		* 일반적인 경우
		*/
		function executeCopy(text:string)
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

