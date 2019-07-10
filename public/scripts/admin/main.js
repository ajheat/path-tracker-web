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
    collect.doc(item.name.toLowerCase().replace(/ |\//g,"-")).set({
      name: item.name,
      value: item.value.replace(/,|( gp)/g,""),
      wiki: item.wiki,
      category: item.category
    }).then(function() {
    }).catch(function() {
      console.log("Failed to write item: " + item.name);
    });
  }
}
