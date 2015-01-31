function getGists() {
	var req = new XMLHttpRequest();
	if(!req) {
		throw 'Unable to create HttpRequest.';
	}
	url = 

	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			var results = JSON.parse(this.responseText)
			console.log(results[0].url);
		}
	};
	req.open('GET', 'https://api.github.com/gists');
	req.send();
}