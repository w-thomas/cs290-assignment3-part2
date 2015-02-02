var userFavorites = null;

function getGists() {
	/*AJAX call and parse response*/
	var pages;

	pages = document.getElementById('pageNumber').value;
	console.log(pages);

	if(pages > 5){
		pages = 5;
	}

	for(var i = 0; i < pages; i++){
	var req = new XMLHttpRequest();
	if(!req) {
	throw 'Unable to create HttpRequest.';
	}

	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			var results = JSON.parse(this.responseText)
			// Create list of results
			createGistList(results);
		}
	};
	req.open('GET', 'https://api.github.com/gists?page='+(i+1));
	req.send();
	}
}

function createGistList(gArray) {
	/*reference empty div*/
	var div = document.getElementById('output');
	//div.innerHTML = '';
	/*Generate UL elements. Each LI has anchor with gist url and description used as text*/
	for(var i = 0; i < gArray.length; i++) {
		/*Generate lists for each entry and append to div 'output'*/
		var ul = document.createElement("ul");
		var li = document.createElement("li");
		var a = document.createElement("a");
		var link = gArray[i].url;
		a.setAttribute("href", link);
		/*If no description is provided in Gist*/
		if(!gArray[i].description) {
			a.innerHTML = "No description";
		}
		else
		a.innerHTML = gArray[i].description;
		li.appendChild(a);
		ul.appendChild(li);
		/*Generate button and append it to the list item*/
		var but = document.createElement("BUTTON");
		but.style.marginLeft = '15px';
		but.setAttribute("onclick", "addToFavorites(this, 0)");
		var t = document.createTextNode("Save to Favorites");
		but.appendChild(t);
		li.appendChild(but);
		div.appendChild(ul);
		}
}

/*adds buttons to favorites*/

function favButtons(status) {	
	/*button gets different properites if it in favorites or now*/
	var temp;
	var Div = document.getElementById("saved");
	temp = Div.getElementsByTagName("ul");

	for(var i = 0; i < temp.length; i++) {
		var li = document.createElement("li");
		var but = document.createElement("BUTTON");
		but.style.marginLeft = '15px';
		but.setAttribute("onclick", "removeFromFavorites(this, 1)");
		var t = document.createTextNode("Remove from Favorites");
		but.appendChild(t);
		temp[i].getElementsByTagName("li")[0].appendChild(but);
	}
}

/*elem is the element being passed in. Direction is 0 if item is being saved
  and 1 if item is being deleted from favorites*/
function addToFavorites(elem) {
	var parent = elem.parentNode;
    var temp = parent.parentNode.removeChild(parent);
    var url = temp.getElementsByTagName("a")[0].href;
    var anchorText = temp.getElementsByTagName("a")[0].innerHTML;
    var params = new CreateLink(url, anchorText);
    saveLink(params);
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

/*removes node from html, and then splices that matching item out of the 
favorites array*/
function removeFromFavorites(elem) {
	var parent = elem.parentNode;
    var temp = parent.parentNode.removeChild(parent);
    var url = temp.getElementsByTagName("a")[0].href;

    console.log(url);

    for(var i = 0; i < userFavorites.gistLinks.length; i++) {
    	console.log(userFavorites.gistLinks[i].url);
    	if(userFavorites.gistLinks[i].url === url) {
    		
    		userFavorites.gistLinks.splice(i, 1);
    	}
    }
    localStorage.setItem('myFavorites', JSON.stringify(userFavorites));
    printFavorites(userFavorites);
}

/*Similar approach here. I dereference my favorites object and 
construct list items*/
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

	favButtons(1);
}

/*Recreate fav list on reload by pulling local data*/
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