var THREE = require('three');
var Shader = require('./shader.js');

var shaderSource = require('./shaders/main.js').static;

class StaticShader extends Shader {
    
    constructor () {
        
        var uniforms = {
            theTime: { value: 0 },
        }
        
        super( shaderSource, uniforms, false );
        
    }
    
    render () {
        
        this.uniforms.theTime.value += 0.01;
        
        super.render();
        
    }
    
}

module.exports = StaticShader;