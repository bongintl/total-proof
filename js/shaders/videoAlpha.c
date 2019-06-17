uniform vec2 resolution;
uniform sampler2D video;

void main() {
    
    vec2 p = gl_FragCoord.xy / resolution;
    
    vec2 alphaTexCoord = p * vec2( 1.0, 0.5 );
    vec2 rgbTexCoord = alphaTexCoord + vec2( 0.0, 0.5 );
    
    float texAlpha = texture2D(video, alphaTexCoord).r;
    vec3 texRGB = texture2D(video, rgbTexCoord).rgb;
    
    gl_FragColor = vec4( texRGB * texAlpha, texAlpha );
    
}