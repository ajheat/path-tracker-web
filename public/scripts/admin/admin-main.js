function handleUpload() {
  var file = $('#fileInput')[0].files[0]
  var reader = new FileReader();
  reader.onload = processFile;
  reader.readAsText(file);
  $('#fileInput').val('');
}

function processFile(event) {
  var list = JSON.parse(event.target.result);
  var collect = db.collection("all-items");
  for (let item of list) {
    var keyObj = buildKey(item.name);
    writeItemToDatabase(item, keyObj);
  }
}
