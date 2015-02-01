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
	var outDiv = document.getElementById("output");
	var temp = outDiv.getElementsByTagName("ul");

	for(var i = 0; i < temp.length; i++) {
		var li = document.createElement("li");
		var but = document.createElement("BUTTON");
		
		/*button gets different properites if it in favorites or now*/
		if(status == 0) {
			but.setAttribute("onclick", "favoriteSwap(this, 0)");
			var t = document.createTextNode("Save to Favorites");
		} 
		else {
			but.setAttribute("onclick", "favoriteSwap(this, 1)");
			var t = document.createTextNode("Remove from Favorites");
		}

		but.appendChild(t);
		// li.appendChild(but);
		temp[i].getElementsByTagName("li")[0].appendChild(but);
	}
}

function Favorites() {
	this.savedLinks = [];
	this.addLinks = function(linktoSave) {
		this.savedLinks.push(linktoSave);
		localStorage.setItem('myFavorites', userFavorites)
	};
}
/*elem is the element being passed in. Direction is 0 if item is being saved
  and 1 if item is being deleted from favorites*/
function favoriteSwap(elem, direction) {
	if(direction == 0) {
		var parent = elem.parentNode;
       	var temp = parent.parentNode.removeChild(parent);
       	console.log(temp);
       	var url = temp.getElementsByTagName("a")[0].href;
       	console.log(url);
	}
}