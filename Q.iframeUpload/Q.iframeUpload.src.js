/**
 * Q.iframeUpload Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q) var Q = {};
Q.iframeUpload = {
	parent: null,
	action: "upload.php",
	name: "qIframe-target",

	init: function(callback) {
		if (callback) this.callback = callback;
		var form = document.createElement("form");
		form.method = "post";
		form.enctype = "multipart/form-data";
		form.action = this.action;
		form.target = this.name;
		form.onsubmit = function() {
			Q.iframeUpload.iframe.onload = function() {
				var data = frames[Q.iframeUpload.name].document.getElementsByTagName("body")[0].innerHTML;
				if(Q.iframeUpload.callback) Q.iframeUpload.callback(data);
			}
		}

		var input = document.createElement("input");
		input.type ="file";
		input.size = 20;
		input.name = "file";
		form.appendChild(input);

		var button = document.createElement("input");
		button.type = "submit";
		button.value = "загрузить";
		form.appendChild(button);

		var iframe = document.createElement("iframe");
		iframe.name = this.name;
		iframe.id = this.name;
		iframe.style.border = "none";
		iframe.style.width = "0px";
		iframe.style.height = "0px";
		iframe.style.display = "none";
		form.appendChild(iframe);
		this.iframe = iframe;

		this.form = form;
		if (this.parent) this.parent.appendChild(form);
		else document.body.appendChild(form);
	}
}