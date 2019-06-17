var THREE = require('three');
var extend = require('underscore').extend;

var Shader = require('./shader.js');

function npo2( x ) {
    
    var r = 1;
    
    while(r < x) r *= 2;
    
    return r;
    
}

function defaultUniforms () {
    return {
        crossfade: {value: 0},
        crop: {value: 0}
    }
}

class VideoShader extends Shader {
    
    constructor( videoUrl, fragmentShaderSource, uniforms, alpha ) {
        
        uniforms = extend({}, defaultUniforms(), uniforms || {});
        
        super( fragmentShaderSource, uniforms, alpha );
        
        this.canvas2d = document.createElement('canvas');
        this.context2d = this.canvas2d.getContext('2d');
        this.video = document.createElement('video');
        this.video.addEventListener('loadedmetadata', () => {
            this.canvas2d.width = npo2(this.video.videoWidth);
            this.canvas2d.height = npo2(this.video.videoHeight);
        });
        this.video.loop = true;
        this.video.src = videoUrl;
        this.video.muted = true;
        // this.video.autoplay = true;
        this.video.setAttribute('playsinline', 'playsinline');
        this.video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        // this.video.load();
        document.body.addEventListener( 'click', () => this.video.play() );
        
        this.uniforms.video = { value: new THREE.Texture( this.canvas2d ) };
        
        window.addEventListener( 'scroll', () => {
            
            var y = window.pageYOffset;
            //this.uniforms.crop.value = y / this.height;
            
        })
        

        
    }
    
    render() {
        
        if( this.video.readyState === this.video.HAVE_ENOUGH_DATA ) {
            
            this.context2d.drawImage( this.video, 0, 0, this.canvas2d.width, this.canvas2d.height );
            this.uniforms.video.value.needsUpdate = true;
            
        }
        
        super.render();
        
    }
    
}

module.exports = VideoShader;