/**
 * @author Daniel Lochrie
 * daniel.lochrie@chron.com
 * 
 * debug.common.js
 * This file contains the common library for the
 * Juice Bookmarklets
 */

var aps = aps || {}; // Juice Global Object
aps.calledAds = [];
aps.definedAds = [];
aps.uncalledAds = [];
aps.undefinedAds = [];
aps.calledAdsLinks = [];
aps.undefinedAdsLinks = [];

/**
 * Someone please reference the following CSS as a JS includes!!!!
 * Time did not permit the opportunity.
 */
aps.css = 
'<style type="text/css">'
+'#bkmrklt-report-wrapper {'
+'background-color:#FFFFFF;'
+'color:#000000;'
+'display:block;'
+'margin:0px;'
+'padding:0px;'
+'width:100%;'
+'}'
+'#bkmrklt-report-wrapper td,'
+'#bkmrklt-report-wrapper th {'
+'background-color:#EEEEEE;'
+'border:1px dotted #333333;'
+'padding:3px;'
+'vertical-align:top;'
+'}'
+'</style>';


aps.getSlots = function() {
	var scripts = document.getElementsByTagName('script');
	var re = /hearstPlaceAd\( ?['|"](\w+)/;

	for (var i=0; i < scripts.length; i++) {
		var match = re.exec(scripts[i].innerHTML);
		if (match) {
			aps.calledAds.push(match[1]);
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
	if (this.validateSlot(slot)) {
		var params = aps.getAdParams(slot);
		var child = document.getElementById(slot);
		var parent = child.parentNode;
		var wrapper = document.createElement("div");
		var adEl = document.getElementById(slot);
		parent.insertBefore(wrapper, child);
		wrapper.id = slot + "-wrapper";
		wrapper.className += "bookmarklet-wrapper";
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
		
		for (var pair in current.g) {
   		var obj = current.g[pair];
			for (var key in obj) {
			  if (typeof obj[key] === 'string')
        	kvps.push('<li>' + pair + " = " + obj[key] + '</li>');
   		}
		}
			
		kvps.sort();
		kvps = (kvps.length > 0) ? '<ul>' + kvps.join(' ') + '</ul>' : 'N/A';
		return {
			adUnit: current.s || 'N/A'
		,	kvps:	kvps || 'N/A'
		}
	}
	return false;
}

aps.addRow = function(key, value) {
	return '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
}

aps.getDebugReport = function() {
	var wrapper = document.createElement("div");
	wrapper.id = 'bkmrklt-report-wrapper';
	var body = aps.css 
	  + '<h1>Debug Bookmarklet Report</h1>'
		+ '<table id="bkmrklt-table">'
		+ aps.getURLData()
	 	+ aps.getCalledAds()
		+ aps.getDefinedAds()
		+ aps.getUncalledAds()
		+ aps.getUndefinedAds()
		+ aps.getPageLevelKvps()
  	+ '</table><br /><hr />'
	;
	wrapper.innerHTML = body;
  if (document.body.firstChild)
  	document.body.insertBefore(wrapper, document.body.firstChild);
  else
    document.body.appendChild(wrapper);
}

aps.getMatchedURL = function() {
  var link = 'http://juice.hearstnp.com/DfpPage/Edit/' + APSpageID;
  return this.addRow('Matched URL', 
    '<p>Coming Soon -- this will tell you <em>exactly</em> what URL matched in Juice. For now, please see:<br />'
  + '<a href="' + link + '">' + link + '</a></p>'
  + '<p>This is the page (in Juice) that was used to target DFP.</p>'
  );
}

aps.getURLData = function () {
  var current = this.addRow('Current URL', document.URL);
  var reported = this.addRow('Reported URL', 'http://' + JuicePageUrl);
  var matched = this.getMatchedURL();
  return current + reported + matched;
}

aps.getCalledAds = function() {
  return this.addRow('Called Ads', aps.calledAdsLinks.sort().join(', '));
}

aps.getCalledAdsLinks = function() {
  for (var i=0; i<aps.calledAds.length; i++)
    aps.calledAdsLinks.push('<a href="#'+aps.calledAds[i]+'-wrapper">'+aps.calledAds[i]+'</a>');
}

aps.getDefinedAds = function() {
  var slotMgr = googletag.slot_manager_instance.H;
  for (var slot in slotMgr) {
	  aps.definedAds.push(slot);
	}
	return this.addRow('Defined Ads', aps.definedAds.sort().join(', '));
}

aps.getUncalledAds = function () {
  var def = aps.definedAds;
  for (i=0; i<def.length; i++) {
    if (!aps.calledAds.hasValue(def[i]))
      aps.uncalledAds.push(def[i]);
  }
  return this.addRow('Uncalled Ads', aps.uncalledAds.sort().join(', ')); 
}

aps.getUndefinedAds = function () {
  var called = aps.calledAds;
  for (i=0; i<called.length; i++) {
    if (!aps.definedAds.hasValue(called[i])) {
      aps.undefinedAds.push(called[i]);
    } 
  }
  this.getUndefinedAdsLinks();
  return this.addRow('Undefined Ads', aps.undefinedAdsLinks.sort().join(', '));
}

aps.getUndefinedAdsLinks = function() {
  for (var i=0; i<aps.undefinedAds.length; i++)
    aps.undefinedAdsLinks.push('<a href="#'+aps.undefinedAds[i]+'-wrapper">'+aps.undefinedAds[i]+'</a>');
}

aps.getPageLevelKvps = function () {
  var pageObj = googletag.pubads().g;
  var kvps = [];
  for (var pair in pageObj) {
 		var obj = pageObj[pair];
		for (var key in obj) {
		  if (typeof obj[key] === 'string')
    	  kvps.push('<li>' + pair + " = " + obj[key] + '</li>');
 		}
	}
	return this.addRow('Page Level KVPs', '<ul>' + kvps.sort().join(', ') + '</ul>');
}

/**
 * @static method:
 * Extend the JS Array object so that we can test for  
 * the existence of any value in an any array.
 */
Array.prototype.hasValue = function(value) {
  var i;
  for (i=0; i<this.length; i++) { if (this[i] === value) return true; }
  return false;
}

/**
 * Initialize and Exec 
 */
aps.getSlots();
aps.getCalledAds();
aps.getCalledAdsLinks();
aps.getDebugReport();

