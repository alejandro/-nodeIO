navigator.getUserMedia = navigator.getUserMedia
  || navigator.webkitGetUserMedia
  || navigator.mozGetUserMedia;

URL = window.URL || window.mozURL || window.webkitURL;

var App = {};

App.camara = function (){
  var video = window.stream;
  var btn = window.tomarFoto;
  var canvas = window.preview;

  navigator.getUserMedia({video: 1}, function (stream){
    video.src = URL.createObjectURL(stream);
    canvas.height = 230
    canvas.width = 300

    btn.addEventListener('click', function() {
      var imagen;
      canvas
        .getContext('2d')
        .drawImage(video,
          0, 0, 300, 230);
      imagen = {
        id: 'image-' + (Date.now()),
        data: canvas.toDataURL('image/png')
      };
      App.insert(imagen.id, imagen.data);
      App.ws.emit('imagen', imagen);

    })
   } , function (error){});
};
