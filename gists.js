var userFavorites = null;

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
			favButtons(0);
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

/*Status is an integer, if 0 the item is generated to search results
  if 1 the item is generated to favorites list*/
function favButtons(status) {	
	/*button gets different properites if it in favorites or now*/
	var temp;
	if(status == 0) {
		var outDiv = document.getElementById("output");
		var temp = outDiv.getElementsByTagName("ul");

		/*Create button and append to each item*/
		for(var i = 0; i < temp.length; i++) {
			var li = document.createElement("li");
			var but = document.createElement("BUTTON");
			but.style.marginLeft = '15px';
			but.setAttribute("onclick", "favoriteSwap(this, 0)");
			var t = document.createTextNode("Save to Favorites");
			but.appendChild(t);
			temp[i].getElementsByTagName("li")[0].appendChild(but);
		}
	} 
	else {
		var outDiv = document.getElementById("output");
		temp = outDiv.getElementsByTagName("ul");

		for(var i = 0; i < temp.length; i++) {
		var li = document.createElement("li");
		var but = document.createElement("BUTTON");
		but.setAttribute("onclick", "favoriteSwap(this, 1)");
		var t = document.createTextNode("Remove from Favorites");
		but.appendChild(t);
		temp[i].getElementsByTagName("li")[0].appendChild(but);
		}
	}

}

/*elem is the element being passed in. Direction is 0 if item is being saved
  and 1 if item is being deleted from favorites*/
function favoriteSwap(elem, direction) {
	if(direction == 0) {
		var parent = elem.parentNode;
       	var temp = parent.parentNode.removeChild(parent);
       	var url = temp.getElementsByTagName("a")[0].href;
       	var anchorText = temp.getElementsByTagName("a")[0].innerHTML;
       	var params = new CreateLink(url, anchorText);
       	saveLink(params);
	}
}

function CreateLink(url, description) {
	this.url = url;
	this.anchorText = description;
}

/*I borrowed ideas in these functions from the lectures*/
function saveLink(link) {
	console.log(link);
	userFavorites.gistLinks.push(link);
	console.log(userFavorites);
	printFavorites(userFavorites);
	localStorage.setItem('myFavorites', JSON.stringify(userFavorites));
}

function printFavorites(userFavorites) {
	var div = document.getElementById('saved');
	div.innerHTML = '';

	for(var i = 0; i < userFavorites.gistLinks.length; i++) {
		var ul = document.createElement("ul");
		var li = document.createElement("li");
		var a = document.createElement("a");
		var link = userFavorites.gistLinks[i].url;
		a.setAttribute("href", link);
		a.innerHTML = userFavorites.gistLinks[i].anchorText;
		li.appendChild(a);
		ul.appendChild(li);
		div.appendChild(ul);
	}	
}

window.onload = function() {
	var settingStr = localStorage.getItem('myFavorites');
	if(settingStr === null) {
		userFavorites = {'gistLinks': []};
		localStorage.setItem('myFavorites', JSON.stringify(userFavorites));
	}
	else {
		userFavorites = JSON.parse(settingStr);
	}

	printFavorites(userFavorites);
}