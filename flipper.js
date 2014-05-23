(function(){

	var youtube = 'youtube.com';
	var base    = "//www." + youtube + "/embed/";
	var anchors = document.querySelectorAll("object embed[src*='" + youtube + "']");
	var i       = anchors.length;
	if (i === 0)
		return;

	chrome.extension.sendMessage({type: "showPageAction"});

	while (i--) { 
		var node     = anchors[i];
		var matches  = node.src.match(/v\/(.+)\?/);
		if (matches.length !== 2)
			break;

		var width    = node.parentNode.width;
		var height   = node.parentNode.height;

		var video    = document.createElement("iframe");
		video.src    = base + matches[1];
		video.width  = width;
		video.height = height;
		video.setAttribute("frameborder", "0");
		video.setAttribute("type", "text/html");
		
		var object   = node.parentNode;
		object.parentNode.insertBefore(video, object);
		object.parentNode.removeChild(object);
	}

})();
