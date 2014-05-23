(function(){

	var videos = document.querySelectorAll("object embed[src*='youtube.com']");
	var base = "//www.youtube.com/embed/";

	var i = videos.length;
	if (i === 0)
		return;

	chrome.extension.sendMessage({type: "showPageAction"});

	while (i--) { 
		var node = videos[i];
		var matches = node.src.match(/v\/(.+)\?/);
		console.log("matches", matches);
		if (matches.length !== 2)
			break;

		var width  = node.parentNode.width;
		var height = node.parentNode.height;

		var video = document.createElement("iframe");
		video.setAttribute("frameborder", "0");
		video.setAttribute("type", "text/html");
		video.src = base + matches[1];
		video.width = width;
		video.height = height;
		
		var object = node.parentNode;

		object.parentNode.insertBefore(video, object);
		object.parentNode.removeChild(object);
	}

})();
