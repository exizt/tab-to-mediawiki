/**
* source : http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
*/
export const copyToClipboard = (text: string) => {
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