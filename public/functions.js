//customizables
var circleWidth = (localStorage.getItem('circleWidth'))?localStorage.getItem('circleWidth'):75
var circleHeight = (localStorage.getItem('circleHeight'))?localStorage.getItem('circleHeight'):75
var intervalUp = (localStorage.getItem('intervalUp'))?localStorage.getItem('intervalUp'):3
var intervalDown = (localStorage.getItem('intervalDown'))?localStorage.getItem('intervalDown'):3	
var circleLowerStart = (localStorage.getItem('circleLowerStart'))?localStorage.getItem('circleLowerStart'):3
var circleUpperStart = (localStorage.getItem('circleUpperStart'))?localStorage.getItem('circleUpperStart'):180
var howMuchIsBlack = (localStorage.getItem('howMuchIsBlack'))?localStorage.getItem('howMuchIsBlack'):30

function createNewCircle(divName, ident) {
    var iDiv = document.createElement('div');
    iDiv.className = 'circle';
    iDiv.id = 'element' + ident;
    iDiv.style.height = circleHeight + 'px';
    iDiv.style.width = circleWidth + 'px';
    iDiv.style.background = getRandomRGBValue(circleLowerStart,circleUpperStart);
    document.getElementById(divName).appendChild(iDiv);
}

function getXandY() {
    var e = document.documentElement,
        g = document.getElementsByTagName('body')[0],
        x = window.innerWidth || e.clientWidth || g.clientWidth,
        y = window.innerHeight || e.clientHeight || g.clientHeight;
    return [x, y];
}

function createNewColumn(newColumnName) {
    var newColumn = document.createElement('div');
    newColumn.id = newColumnName;
    newColumn.className = 'column';
    document.getElementById('container').appendChild(newColumn);
}

function getRandomRGBValue(from,to){
	if (!from && !to) return 'rgb(' + getRandomNumber(0,255)  + ',' + getRandomNumber(0,255) + ', ' +  getRandomNumber(0,255) + ')';
	
	return 'rgb(' + getRandomNumber(from,to)  + ',' + getRandomNumber(from,to) + ', ' +  getRandomNumber(from,to) + ')'			
};

function getRandomNumber(from,to){
	return Math.floor((Math.random() * to) + from);
}

function handleMouseMove(){
	var elements = document.getElementsByClassName('circle');	
	var newColors = [];
	var colors = getRandomRGBValue();
	
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].style.background){			
			var el = elements[i].style.background.substr((elements[i].style.background.lastIndexOf('(') + 1),(elements[i].style.background.lastIndexOf(')') -4)).split(',');
			newColors = changeColor(el);
			colors = 'rgb(' + newColors[0] + ', ' + newColors[1] + ', ' +  newColors[2] + ')';
		}						

		elements[i].style.background = colors;

		if(isBlack(newColors)) blackReached();
	};	
}

function changeColor(values){
	var newValue = [];	
	
	switch(getRandomNumber(0,4)){
		case 0: for (var i = 0; i < values.length; i++) {
					newValue[i] = parseInt(parseInt(values[i]) - parseInt(intervalUp));
				};
				return newValue;
		case 1: for (var i = 0; i < values.length; i++) {
					newValue[i] = parseInt(parseInt(values[i]) + parseInt(intervalUp));
				}; 
				return newValue;	
		case 2: for (var i = 0; i < values.length; i++) {
					newValue[i] = parseInt(parseInt(values[i]) - parseInt(intervalDown));
				}; 
				return newValue;
		case 3: for (var i = 0; i < values.length; i++) {
					newValue[i] = parseInt(parseInt(values[i]) + parseInt(intervalDown));
				}; 
				return newValue;
	}
}

function toggleCircle(elementId){	
	document.getElementById(elementId).style.background = 'rgb(255,255,255)';	
	document.getElementById('score').style.background = 'white';
}

function isBlack(colors){	
	if ((colors[0]<howMuchIsBlack) && (colors[1]<howMuchIsBlack) && (colors[2]<howMuchIsBlack)){
		ammountOfBlack = ammountOfBlack + 1;
		return true;
	}

	return false;
}

function blackReached(){
	document.getElementById('score').style.background = 'red';
	document.getElementById('score').innerHTML = 'Times black is reached:' + ammountOfBlack;		
}