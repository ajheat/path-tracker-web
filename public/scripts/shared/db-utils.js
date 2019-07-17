function buildKey(rawName) {
  var name = rawName.toLowerCase();
  var key = name;
  var subtype = '';
  var alternatives = [];
  if (/\+\d+$/.test(key)) {
    var split = name.split('+');
    key = split[0];
    subtype = '+' + split[1];
  } else if (/\,/.test(key)) {
    var split = name.split(',');
    key = split[0];
    subtype = split[1];
    alternatives.push(keyString(subtype + ' ' + key));
    alternatives.push(keyString(name.replace(/\,/, '')));
  } else if (/\(.*\)$/.test(key)) {
    var split = name.split('(');
    key = split[0];
    subtype = split[1].replace(/\)/, '');
    alternatives.push(keyString(subtype + ' ' + key));
    alternatives.push(keyString(name.replace(/\(|\)/g, '')));
  } else if (/with/.test(key)) {
    var split = name.split('with');
    key = split[0];
    subtype = split[1];
    alternatives.push(keyString(subtype + ' ' + key));
    alternatives.push(keyString(key.trim() + ' ' + subtype.trim()));
  }
  key = keyString(key);
  if (subtype !== '') {
    subtype = keyString(subtype);
  }
}

function keyString(key) {
  return key.trim().replace(/ /g, '-').replace(/(’|')|\./g, '');
}
