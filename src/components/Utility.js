// Address of our server
export const serverAddress='http://cucektradings.com/server';
// export const serverAddress='/server';

// Funtion to get cookie value
export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Funtion to setCookie
export function setCookie(cname, cvalue, exdays = 30) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function checkForSpecialChars(string) {
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(format.test(string)) {
    return true;
  }
  else {
    return false;
  }
}

export function readableValue(value) {
  value = parseFloat(value).toFixed(2);
  if (value > 1000000) {
    value = (value / 1000000).toFixed(2);
    value = value + "M";
  }
  else if (value > 1000) {
    value = (value / 1000).toFixed(2);
    value = value + "K";

  }

  return value;
}

export function sortBy(field, order = "asc") {
  return function(a, b) {
    let v1 = parseFloat(a[field]);
    let v2 = parseFloat(b[field]);
    if (order === "desc") {
      return (v2 > v1) - (v2 < v1);
    }
    return (v1 > v2) - (v1 < v2);
  };
}


export function isEqual(o1, o2) {
  const val = JSON.stringify(o1) === JSON.stringify(o2);
  if (val) {
    console.log("Valuse same")
  }
  return val;
}


// Set session storage
export function setSessionStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data)); 
}


// Get session storage
export function getSessionStorage(key) {
  try {
    console.log("Got lol")
    return JSON.parse(sessionStorage.getItem(key)); 
  }
  catch (e) {
    return null;
  }
}
