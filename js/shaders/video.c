uniform vec2 resolution;
uniform sampler2D video;

void main() {
    
    vec2 p = gl_FragCoord.xy / resolution;
    
    vec4 texColor = texture2D(video, p);
    
    gl_FragColor = vec4( texColor );
    
}