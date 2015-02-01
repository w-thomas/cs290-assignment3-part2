function getGists() {
	/*AJAX call and parse response*/
	var req = new XMLHttpRequest();
	if(!req) {
		throw 'Unable to create HttpRequest.';
	}
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			var results = JSON.parse(this.responseText)
			/*Create list of results*/
			createGistList(results);
			favButtons();
		}
	};
	req.open('GET', 'https://api.github.com/gists');
	req.send();
}

function createGistList(gArray) {
	/*reference empty div*/
	var div = document.getElementById('output');
	div.innerHTML = '';
	/*Generate UL elements. Each LI has anchor with gist url and description used as text*/
	for(var i = 0; i < gArray.length; i++) {

		var ul = document.createElement("ul");
		var li = document.createElement("li");
		var a = document.createElement("a");
		var link = gArray[i].url;
		a.setAttribute("href", link);

		if(!gArray[i].description) {
			a.innerHTML = "No description";
		}
		else
		a.innerHTML = gArray[i].description;
		li.appendChild(a);
		ul.appendChild(li);
		div.appendChild(ul);
		}
}

/*Status is an integer used to determine whether the button should say
add or remove from favorites, depending on what list the item is on*/
function favButtons(status) {
	var outDiv = document.getElementById("output");
	var temp = outDiv.getElementsByTagName("ul");

	for(var i = 0; i < temp.length; i++) {
		var li = document.createElement("li");
		var but = document.createElement("BUTTON");
		but.setAttribute("onclick", "favoriteSwap(this)");

		if(status == 0) {
			var t = document.createTextNode("Save to Favorites");
		} 
		else {
			var t = document.createTextNode("Remove from Favorites");
		}
		but.appendChild(t);
		li.appendChild(but);
		console.log(li);
		temp[i].appendChild(li);
	}
}

