var rand_background = function(){
    var images=['./images/wallpaper1.jpg',
                './images/wallpaper2.jpg',
                './images/wallpaper3.jpg',
                './images/wallpaper4.jpg',
                './images/wallpaper6.jpg',
                './images/wallpaper7.jpg',
                './images/wallpaper9.jpg',
                './images/wallpaper10.jpg',
                './images/wallpaper11.jpg',
                './images/wallpaper8.png'];
    
    var randomNumber = Math.floor(Math.random() * images.length);
    var bgImg = 'url(' + images[randomNumber] + ')';
    var x = document.getElementsByClassName('parallax')
    for (var step = 0; step<x.length; step++){
        x[step].style.background = bgImg
        x[step].style.zIndex = "-1"
        x[step].style.height = "100%"
        x[step].style.backgroundAttachment = "fixed"
        x[step].style.backgroundPosition = "auto"
        x[step].style.backgroundRepeat = "no-repeat"
        x[step].style.backgroundSize = "cover" 
        x[step].style.imageRendering = "optimizeSpeed"
    }
    }

window.onload = rand_background