uniform vec2 resolution;
uniform sampler2D video;
uniform float crossfade;
uniform float crop;

void main() {
    
    vec2 p = gl_FragCoord.xy / resolution;
    
    vec2 alphaTexCoord = p * vec2( 1.0, 0.5 );
    vec2 rgbTexCoord = alphaTexCoord + vec2( 0.0, 0.5 );
    
    float texAlpha = texture2D(video, alphaTexCoord).r;
    texAlpha = mix( 1., texAlpha, crossfade );

    float oddEven = fract( gl_FragCoord.y / 15. );
    
    float shift = crossfade * ( oddEven * 2. - 1. );
    
    shift = mix( shift, 0., texAlpha );
    
    rgbTexCoord.x += shift * .1;
    
    vec3 texRGB = texture2D(video, rgbTexCoord).rgb;
    
    //texRGB.b += shift;
    //texRGB.r -= shift;
    
    float cropMask = step( p.y, 1. - crop );
    
    texAlpha *= cropMask;
    
    gl_FragColor = vec4( texRGB * texAlpha, texAlpha );
    
}