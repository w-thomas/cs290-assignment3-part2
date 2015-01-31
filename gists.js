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
		}
	};
	req.open('GET', 'https://api.github.com/gists');
	req.send();
}

function createGistList(gArray) {

	var div = document.getElementById('output');

	for(var i = 0; i < gArray.length; i++) {
		console.log(gArray[i].description);
		var ul = document.createElement("ul");
		var li = document.createElement("li");
		var a = document.createElement("a");
		var link = gArray[i].url;
		a.setAttribute("href", link);
		a.innerHTML = gArray[i].description;

		li.innerHTML = a;
		li.appendChild(ul);
		div.innerHTML = ul;
		}
}