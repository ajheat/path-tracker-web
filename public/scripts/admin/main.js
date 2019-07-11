const db = firebase.firestore();

function handleUpload() {
  var file = $('#fileInput')[0].files[0]
  var reader = new FileReader();
  reader.onload = processFile;
  reader.readAsText(file);
}

function processFile(event) {
  var list = JSON.parse(event.target.result);
  var collect = db.collection("all-items");
  for (let item of list) {
    var parts = item.name.split("+");
    if (parts.length == 1) {
      collect.doc(itemKey(item.name)).set({
        name: item.name,
        value: item.value.replace(/,|( gp)/g,""),
        wiki: item.wiki,
        category: item.category
      }).then(function() {
      }).catch(function() {
        console.log("Failed to write item: " + item.name);
      });
    } else {
      console.log(parts);
      parts[1] = "+" + parts[1];
      collect.doc(itemKey(parts[0])).set({
        name: parts[0],
        wiki: item.wiki,
        category: item.category
      }).then(function() {
      }).catch(function() {
        console.log("Failed to write item: " + item.name);
      });
      var subCollect = db.collection("all-items/" + itemKey(parts[0]) + "/subtypes").doc(parts[1]).set({
        name: item.name,
        value: item.value.replace(/,|( gp)/g, ""),
      }).then(function() {
      }).catch(function() {
        console.log("Failed to write item: " + item.name);
      });
    } 
  }
}

function itemKey(itemName) {
  return itemName.trim().toLowerCase().replace(/ |\//g, "-");
}
