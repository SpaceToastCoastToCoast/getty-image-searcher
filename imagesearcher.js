var button = document.getElementById('searchButton');
var searchInput = document.getElementById('textField');
var mainDiv = document.getElementById('main');

function onDataLoaded() {
  main.innerHTML = "";
  var data = JSON.parse(this.responseText);
  var images = data.images;
  for(var image in images) {
    var imgTag = document.createElement('img');
    console.log(images[image].display_sizes[0].uri);
    imgTag.src = images[image].display_sizes[0].uri;
    imgTag.style.width = "150px";
    imgTag.className = "result";
    mainDiv.appendChild(imgTag);
  }
}

function search() {
  var searchQuery = searchInput.value;
  var oReq = new XMLHttpRequest();

  oReq.addEventListener('load', onDataLoaded);
  oReq.open('GET', 'https://api.gettyimages.com/v3/search/images?phrase=' + searchQuery);
  oReq.setRequestHeader('Api-Key', 'ksewve2mew2azjbecvjv6v9s');
  oReq.send();
}

button.addEventListener('click', search);