var THREE = require('three');
var extend = require('underscore').extend;
var fourthree = require('./fourthree.js');

var DPR = window.devicePixelRatio || 1;

var vertexShader = `
    void main() {
        gl_Position = vec4( position, 1.0 );
    }`;
    
var testFragmentShader = `

    uniform vec2 resolution;

    void main() {
        vec2 p = gl_FragCoord.xy / resolution;
        gl_FragColor = vec4(p.x, p.y, 0., 1.);
    }`;
    
function defaultUniforms(){
    
    return {
        resolution: { value: new THREE.Vector2() },
        theTime: {value: 0}
    }
    
}

class Shader {
    
    constructor ( fragmentShaderSource, uniforms, alpha ) {
        
        this.uniforms = extend({}, defaultUniforms(), uniforms || {})
        
        this.camera = new THREE.Camera();
        this.camera.position.z = 1;
        
        this.scene = new THREE.Scene();
        
        this.geometry = new THREE.PlaneBufferGeometry(2, 2);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader: fragmentShaderSource || testFragmentShader,
            uniforms: this.uniforms
        });
        
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        
        this.scene.add( this.mesh );
        
        this.renderer = new THREE.WebGLRenderer({alpha});
        this.renderer.setPixelRatio( DPR );
        
        this.element = this.renderer.domElement;
        
        this.element.classList.add('shader');
        
        window.addEventListener( 'resize', this.onResize.bind(this) );
        
        this.onResize();
        
    }
    
    onResize () {
    
        var size = fourthree();
    
        this.setSize( size.x, size.y );

    }
    
    setSize( w, h ) {
        
        this.width = w;
        this.height = h;
        
        this.renderer.setSize( w, h );
        this.uniforms.resolution.value.set( w * DPR, h * DPR );
        
    }
    
    addClass( ...classes ) {
        
        this.element.classList.add( ...classes.map( cls => 'shader_' + cls ) )
        
    }
    
    render () {
        
        this.uniforms.theTime.value += .1;
        
        this.renderer.render( this.scene, this.camera );
        
    }
    
}

module.exports = Shader;