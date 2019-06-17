var fourThree = require('./fourthree.js');

var Shader = require('./shader.js');
var VideoShader = require('./videoShader.js');
var StaticShader = require('./staticShader.js');

var shader = new VideoShader( '/assets/layered_alpha_3.mp4', require('./shaders/main.js').videoAlpha, {}, true );
shader.addClass( 'header', 'above' );
shader.video.muted = true;
document.querySelector('header').appendChild( shader.element );

// var staticShader = new StaticShader();
// document.body.appendChild( staticShader.element );
// staticShader.addClass('below', 'fullscreen');
// staticShader.setSize( window.innerWidth * .75, window.innerHeight * .75 );

function tick() {
    
    shader.render();
    //staticShader.render();
    
    requestAnimationFrame(tick);
    
}

tick();