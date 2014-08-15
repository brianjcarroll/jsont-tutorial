
// equals array method taken from Stack Overflow
Array.prototype.equals = function (array) {
	// if the other array is a falsy value, return
	if (!array)
		return false;
		
		// compare lengths - can save a lot of time 
	if (this.length != array.length)
		return false;

	for (var i = 0, l=this.length; i < l; i++) {
		// Check if we have nested arrays
		if (this[i] instanceof Array && array[i] instanceof Array) {
		  // recurse into the nested arrays
		  if (!this[i].equals(array[i]))
	      return false;       
		  }           
		else if (this[i] != array[i]) { 
		  // Warning - two different object instances will never be equal: {x:20} != {x:20}
		  return false;   
		}           
	}       
	return true;
}  

var inputArea = document.getElementById('editor');
var compareArea = document.getElementById('compare');
var jsonArea = document.getElementById('json');
var button = document.getElementById('check');
var feedback = document.getElementById('feedback');

//This is the input editor
var editor = CodeMirror(function(elt){
	inputArea.parentNode.replaceChild(elt, inputArea);
}, {
	value: 'Grab the site title and put it in an h1',
	lineNumbers: true,
	mode: 'htmlmixed',
	theme: 'monokai',
	autofocus: true
});

//This is the editor on the right, that shows the JSON object to JSONTify
var jsonEditor = CodeMirror(function(elt){
	jsonArea.parentNode.replaceChild(elt, jsonArea);
}, {
	value: '{\n website: {\n   siteTitle: "My Super Cool Site"\n  }\n}',
	lineNumbers: true,
	mode: 'json',
	theme: 'monokai',
	readOnly: true
});

//This editor is hidden and contains the answer to compare.
var compareEditor = CodeMirror(function(elt){
	compareArea.parentNode.replaceChild(elt, compareArea);
}, {
	value: '{.section website}\n<h1>{siteTitle}</h1>\n{.end}',
	lineNumbers: true,
	mode: 'htmlmixed',
	theme: 'monokai'
});

var answer = compareEditor.getValue().split(/\s+(?![^\[]*\]|[^(]*\)|[^\{]*})/);
		answer = answer.filter(function(n){ return n != '' });
var input;

button.addEventListener('click', function(e){
	e.preventDefault();
	input = editor.getValue().split(/\s+(?![^\[]*\]|[^(]*\)|[^\{]*})/);
	input = input.filter(function(n){ return n != '' });

	if(input.equals(answer)){
		feedback.innerHTML = 'Correct!';
		button.innerHTML = 'Next Test';
	} else {
		feedback.innerHTML = 'Wrong!';
		button.innerHTML = 'Submit Answer';
	}

	setTimeout(function(){
		feedback.innerHTML = '';
	}, 5000);
});


