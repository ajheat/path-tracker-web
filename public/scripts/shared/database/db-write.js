function writeItemToDatabase(item, keyObject) {
  var dbObj = {category: item.category, wiki: item.wiki};
  var itemVal = item.value.replace(/,|( gp)/g,"");
  if (keyObject.subtype === '') {
    dbObj.value = itemVal;
    dbObj.displayValue = item.value;
    dbObj.name = item.name;
  } else {
    dbObj.name = keyObject.trimmedName;
  }
  db.collection("all-items").doc(keyObject.key).set(dbObj).then(function() {
    return true;
  }).catch(function() {
    return false;  
  });
  if (keyObject.subtype !== '') {
    var subObj = {name: item.name, value: itemVal, displayValue: item.value};
    db.collection("all-items/" + keyObject.key + "/subtypes").doc(keyObject.subtype).set(subObj).then(function() {
      return true;
    }).catch(function() {
      return false;
    });
  }
}
