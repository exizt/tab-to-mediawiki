import { copyToClipboard } from "./c2clipboard";

// 이벤트 바인딩
export function bind(converter:IConveter, optionSet:any){
	let selector = optionSet.selector
	let options = optionSet.options
	
	// 문자열 입력 시 이벤트
	_add_event(selector.input, 'input', call_convert);

	// 옵션 변경에 따른 이벤트 바인딩
	(Object.keys(options) as (keyof typeof options)[]).forEach((key, index) => {
		// console.log(key, options[key], index);
		_add_change_event(selector[key], (e:Event) => { options[key] = (e.target as HTMLInputElement).checked; call_convert(); })
	});
	//_add_change_event(selector.isIncludedHeader , (e:Event) => { options.isIncludedHeader = (e.target as HTMLInputElement).checked; convert(); })

	_add_event(selector.copyBtn, 'click', (e:any)=>{
		e.preventDefault();

		const outputEl = document.querySelector(optionSet.selector.output)
		if (outputEl != null && typeof copyToClipboard === 'function'){
			copyToClipboard(outputEl.textContent ?? '');
		}
	})

	function call_convert(){
		convert(converter, optionSet)
	}
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
function convert(converter:IConveter, optionSet:any){
	// console.log('convert')
	const selector = optionSet.selector

	const input = (document.querySelector(selector.input) as HTMLTextAreaElement).value
	const output = converter.convert(input, optionSet.options);

	const outputEl = document.querySelector(selector.output)
	if (outputEl != null){
		// outputEl.innerHTML = output;
		outputEl.textContent = output;
	}
}

interface IConveter {
    convert: Function
}