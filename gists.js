function getGists() {
	var req = new XMLHttpRequest();
	if(!req) {
		throw 'Unable to create HttpRequest.';
	}
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			var results = JSON.parse(this.responseText)
			console.log(results[0].url);
			createGistList(results);
			//favButtons(results);
		}
	};
	req.open('GET', 'https://api.github.com/gists');
	req.send();
}

function createGistList(gArray) {

	var div = document.getElementById('output');
	div.innerHTML = '';
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

		var li = document.createElement("li");
		var but = document.createElement("BUTTON");
		but.setAttribute("onclick", "addToFavorites(this)");
		var t = document.createTextNode("Save to Favorites");
		but.appendChild(t);

		li.appendChild(a);
		li.appendChild(but);
		ul.appendChild(li);
		div.appendChild(ul);
		}
}

function favButtons(gArray) {
	var temp = document.getElementsbyTagName("ul");

	for(var i = 0; i < gArray.length; i++) {
		var li = document.createElement("li");
		var but = document.createElement("BUTTON");
		but.setAttribute("onclick", "addToFavorites(this)");
		var t = document.createTextNode("Save to Favorites");
		but.appendChild(t);
		li.appendChild(but);
		temp[i].appendChild(li);
	}
}