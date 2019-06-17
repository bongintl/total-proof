uniform vec2 resolution;
uniform float theTime;
uniform vec2 offset;

{{noise}}

{{ratio}}

void main () {
    
    vec2 p = (gl_FragCoord.xy + offset) / resolution;
    
    p = fourThree( p, resolution );
    
    //p.x -= theTime;
    
    p *= 100.;
    
    float noise = fract( noise( p + vec2(0., theTime) ) + theTime * 2. );
    float invNoise = 1. - noise;
    float noiseMask = step( noise, .5 );
    float mixedNoise = mix( invNoise, noise, noiseMask) * 2.;
    
    // float edges = 
    //     
    
    //gl_FragColor = vec4( vec3( mixedNoise * edges ), 0.);
    
    gl_FragColor = vec4( fract(vec3( mixedNoise ) * edges(p, 100.) ), 1.);
    
}