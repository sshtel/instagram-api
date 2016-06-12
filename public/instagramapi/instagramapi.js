
function InstaAPI(obj){

	this.obj = obj;
	if(!this.obj.func) { this.obj.func = 'recent_media'; }
	if(!this.obj.resolution) { this.obj.resolution = 'low'; }

}


InstaAPI.prototype.run =  function(){
	var obj = this.obj;
	console.log('run');
	console.log(obj);
	switch(obj.func){
		case 'recent_media':
			this.recent_media(obj.target, obj.userId, obj.accessToken, obj.maxContentCount);
			break;
		default:
			break;
	}
}


function InstaData(){
	this.caption = "";
	this.image = new Object();
}

function squot(text){ return "'" + text + "'"; }
function getCode (objs){

	var alldiv  = document.createElement("div");
	objs.forEach(function(item, index){
		var div = document.createElement("div");
		var image = item.image;
		var width = parseInt(image.width);
		var height  = parseInt(image.height);


		div.style.border="0px solid grey";
		div.style.borderRadius="10px";
		div.style.padding="5px";
		div.style.margin="5px";
		div.style.backgroundColor = "white";
		div.style.display="inline-block";
		div.style.width = width + 10 + "px";
		div.style.height = height + 100 + "px";
		div.style.wordBreak = "break-all";
		div.style.textOverflow = "ellipsis";

			var img = document.createElement("img");
			img.src = image.url;
			img.style.border = "0px solid white";
			img.style.borderRadius = "10px";
			img.style.MozBorderRadius = "10px";
			img.style.margin = "0px";


			var label = document.createElement("div");
			label.style.maxWidth = width + "px";
			label.style.height = 150 + "px";
			label.style.wordBreak = "break-all";
			label.style.margin="auto";
			label.style.overflow="hidden";
			label.style.whiteSpace="normal";
			label.style.textOverflow = "ellipsis";
    		
			label.innerHTML = item.caption;

		div.appendChild(img);
		div.appendChild(document.createElement("br"));
		div.appendChild(document.createElement("br"));
		div.appendChild(label);

		alldiv.appendChild(div);
	});


	// return alldiv.outerHTML;
	return alldiv.innerHTML;
}

InstaAPI.prototype.recent_media = function(target, userId, accessToken, maxCount){
	var url = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=' + accessToken;
	console.log(url);

	var objs = [];
	var resolution = this.obj.resolution;

	// Using AJAX
	$.ajax({
		type: "GET",
	    url: url,
		crossDomain: true,
		dataType: 'jsonp',
	    success: function(result){

	    	result.data.forEach(function(item, index){
	    		if(index >= maxCount) return;
	    		var retItem = new InstaData();

	    		if(item.caption){ retItem.caption = item.caption.text; }
	    		switch(resolution){
	    			case 'standard':	
	    				retItem.image = item.images.standard_resolution;					
	    				break;
	    			case 'thumbnail':
	    				retItem.image = item.images.thumbnail;
	    				break;
	      			case 'low':
	    			default:
	    				retItem.image = item.images.low_resolution;
	    				break;
	    		}
	    		objs.push(retItem);
	    	});

			window.setTimeout(function(){
	    		
				var code = this.getCode(objs);
				var ele = document.getElementById(target);
				ele.innerHTML = code;
				// console.log(ele);
			}, 1000);

	    	return objs;
	    },
	    error : function(err){
	        console.log(err);
	    }
	});


  return objs;
}


