// Checks if the user failed to login.
// In that case the login page will have a request parameter failed=true.
// And then the login-error is shown.

// All in plain JavaScript. No libraries needed. Only not compatible with old IE.

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var failed = getUrlParameter('failed');
if (failed) {
    var element = document.getElementById("login-error");
    element.classList.remove("hidden");
}