/**
 * @author Daniel Lochrie
 * daniel.lochrie@chron.com
 * 
 * debug.common.js
 * This file contains the common library for the
 * Juice Bookmarklets
 */

var aps = aps || {}; // Juice Global Object
var slots = [];

aps.getSlots = function() {
	var scripts = document.getElementsByTagName('script');
	var re = /hearstPlaceAd\( ?['|"](\w+)/;

	for (var i=0; i < scripts.length; i++) {
		var match = re.exec(scripts[i].innerHTML);
		if (match) {
			slots.push(match[1]);
			this.highlightAd(match[1]);
		}
	}
}

aps.validateSlot = function(slot) {
	if (!document.getElementById(slot))
		return false;
	return true;
}

aps.highlightAd = function(slot) {
	console.log("Highlighting: " + slot);
	if (this.validateSlot(slot)) {
		var params = aps.getAdParams(slot);
		var child = document.getElementById(slot);
		var parent = child.parentNode;
		var wrapper = document.createElement("div");
		var adEl = document.getElementById(slot);
		parent.insertBefore(wrapper, child);
		wrapper.id = slot + "-wrapper";
		wrapper.class = "bookmarklet-wrapper";
		var content = "<strong>Ad Definition:</strong> " + slot + "<br />"; 
		if (params) {
			content += "<strong>Ad Unit:</strong> " + params.adUnit + "<br />"
			+ "<strong>KVPs:</strong> " + params.kvps + "<br />";
		}
		wrapper.innerHTML = content;
		wrapper.style.backgroundColor = "#000000";
		wrapper.style.color = "#FFFFFF";
		wrapper.style.padding = "20px";
		adEl.style.border = "1px solid #FF0000";
	}
}

aps.getAdParams = function(slot) {
	var current = googletag.slot_manager_instance.H[slot] || null;
	if (current) {
		var kvps = [];
		for (var i = 0; i < current.g.length; i++) 
			 kvps.push(current.g[i][0] + "=" + current.g[i][1]);
		return {
			adUnit: current.s || 'N/A'
		,	kvps:	kvps || 'N/A'
		}
	}
	return false;
}

aps.getCalledAds = function() {
	try {
		console.log(googletag.slot_manager_instance);
	} catch(e) { }
}

aps.getSlots();
aps.getCalledAds();
