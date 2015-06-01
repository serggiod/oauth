function autzLogin(){
	user = document.getElementById("userLogin").value;
	pass = CryptoJS.MD5(document.getElementById("userPass").value).toString();
	url   = "/autz_sess";
	url  += "&user="+user;
	url  += "&pass="+pass;
	document.location=url;
}