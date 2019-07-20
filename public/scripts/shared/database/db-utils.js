function buildKey(rawName) {
  var name = rawName.toLowerCase();
  var key = name;
  var trimmedName = '';
  var subtype = '';
  var alternatives = [];
  if (/\+\d+$/.test(key)) {
    var split = name.split('+');
    trimmedName = rawName.split('+')[0];
    key = split[0];
    subtype = '+' + split[1];
  } else if (/\,/.test(key)) {
    var split = name.split(',');
    trimmedName = rawName.split(',')[0];
    key = split[0];
    subtype = split[1];
    alternatives.push(keyString(subtype + ' ' + key));
    alternatives.push(keyString(name.replace(/\,/, '')));
  } else if (/\(.*\)$/.test(key)) {
    var split = name.split('(');
    trimmedName = rawName.split('(')[0];
    key = split[0];
    subtype = split[1].replace(/\)/, '');
    alternatives.push(keyString(subtype + ' ' + key));
    alternatives.push(keyString(name.replace(/\(|\)/g, '')));
  } else if (/with/.test(key)) {
    var split = name.split('with');
    trimmedName = rawName.split('with')[0];
    key = split[0];
    subtype = split[1];
    alternatives.push(keyString(subtype + ' ' + key));
    alternatives.push(keyString(key.trim() + ' ' + subtype.trim()));
  }
  key = keyString(key);
  if (subtype !== '') {
    subtype = keyString(subtype);
  }
  return {key: key, subtype: subtype, alternatives: alternatives, trimmedName: trimmedName.trim()};
}

function keyString(key) {
  return key.trim().replace(/( |\/)/g, '-').replace(/(’|')|\./g, '');
}
