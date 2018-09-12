$(function(){
	$("#book-content").css({
		"color" : getCookie("txtcolor"),
		"font-size" : getCookie("fonttype")
	});
	$("#content").css({
		"background-color": getCookie("bgcolor"),
	});
	$("#bgcolor").on('change', function(event) {
		var val = $(this).val();
		setCookie("bgcolor",val)
		$("#content").css({
			"background-color": val
		});
		event.preventDefault();
		/* Act on the event */
	});
	$("#txtcolor").on('change', function(event) {
		var val = $(this).val();
		setCookie("txtcolor",val)
		$("#book-content").css({
			"color": val
		});
		event.preventDefault();
		/* Act on the event */
	});
	$("#fonttype").on('change', function(event) {
		var val = $(this).val();
		setCookie("fonttype",val)
		$("#book-content").css({
			"font-size": val
		});
		event.preventDefault();
		/* Act on the event */
	});
})
function setCookie(c_name,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name){
	if (document.cookie.length > 0){
	  	c_start=document.cookie.indexOf(c_name + "=")
	  	if (c_start!=-1){ 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
	    } 
  	}
	return ""
}