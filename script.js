let video = document.getElementById('camera');
let localMediaStream = null;
let hasGetUserMedia = () => {
	return (navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
};

let onFailSoHard = (e) => {
	console.log('error', e);
};

if(!hasGetUserMedia()) {
	alert("未対応です。");
} else {
	window.URL = window.URL || window.webkitURL;
	navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.getUserMedia({video: true}, (stream) => {
		video.src = window.URL.createObjectURL(stream);
		localMediaStream = stream;
	}, onFailSoHard);
}
