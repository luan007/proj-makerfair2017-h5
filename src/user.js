function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export var config = {
    uname: Cookies.get('user') || uuidv4(),
    badge: {
      0: true,
      1: true,
      2: true,
      8: true
    }
};

console.log(config);
Cookies.set('user', config.uname);
