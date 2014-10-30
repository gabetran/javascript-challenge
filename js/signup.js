
function onReady() {
	var elem = document.getElementById("state");
		for(var i =0; i < usStates.length; i++) {
			var opt = document.createElement("option");
			opt.value = usStates[i];
			var text = document.createTextNode(usStates[i]);
			opt.appendChild(text);
			elem.appendChild(opt);
		}

		console.log("onready is being called");
}


document.addEventListener('DOMContentLoaded', onReady);
