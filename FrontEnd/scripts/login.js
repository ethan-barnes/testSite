/**
 * Called when user logs in. Creates a cookie based account to allow user access to various functionalities
 * 
 */
function login() {
	var form = document.getElementById("loginForm");
	cname = "username";
	cvalue = form.elements[0].value;

	setCookie(cname, cvalue, 1);

	alert(getCookie(cname));
}

/**
 * Creates a cookie using information taken from the log in form
 * 
 * @param {string} name  name of the cookie
 * @param {string} value username
 * @param {int} days how many days before the cookie expires
 */
function setCookie(name, value, days) {
	var expires = "";
	if (days) {
  		var date = new Date();
  		date.setTime(date.getTime() + (days*24*60*60*1000));
  		expires = "; expires=" + date.toUTCString();
  	}
  	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Reads the value of the cookie
 * 
 * @param  {string} name the name of the cookie to be read
 * @return {string} the value of the cookie that has been read
 */
function getCookie(name) {
	var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];

        while (c.charAt(0)==' ') { 
        	c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
        	return c.substring(nameEQ.length,c.length);
        } 

    }
    return null;
}