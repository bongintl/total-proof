var fourThree = require('./fourthree.js');

var Shader = require('./shader.js');
var VideoShader = require('./videoShader.js');
var StaticShader = require('./staticShader.js');

var shader = new VideoShader( './assets/turmoil_alpha_2.mp4', require('./shaders/main.js').videoMixer, {}, true );
shader.addClass('above', 'header', 'mixer');
shader.video.muted = true;
document.querySelector('header').appendChild( shader.element );

var mousedown = false;

shader.video.addEventListener('canplay', function(){
    document.body.style.display = '';
})

shader.element.addEventListener('mouseenter', () => {
    shader.video.muted = false;
})

shader.element.addEventListener('mouseleave', () => {
    shader.video.muted = true;
})

// shader.element.addEventListener('mousedown', () => {
//     mousedown = true;
// })

// shader.element.addEventListener('mouseup', () => {
//     mousedown = false;
// })

var mouse = {x: 0, y: 0};

shader.element.addEventListener('mousemove', function(e){
    
    mouse = {x: e.offsetX, y: e.offsetY};
})

function tick() {
    
    var center = {x: shader.width / 2, y: shader.height / 2};
    
    var delta = {
        x: Math.abs(mouse.x - center.x),
        y: Math.abs(mouse.y - center.y)
    };
    
    var distance = Math.pow( delta.x, 2 ) + Math.pow( delta.y, 2 );
    
    var max = Math.min( shader.width / 2, shader.height / 2 );
    
    var crossfade = 1 - Math.min( distance / Math.pow(max, 2), 1 );
    
    // if ( mousedown ) {
        
    //     crossfade += .05;
        
    // } else {
        
    //     crossfade -= .05;
        
    // }
    
    // crossfade = Math.min( Math.max( crossfade, 0 ), .5 );
    
    //shader.video.volume = 1 - crossfade;
    
    shader.uniforms.crossfade.value = crossfade;
    
    shader.render();
    
    requestAnimationFrame(tick);
    
}

tick();