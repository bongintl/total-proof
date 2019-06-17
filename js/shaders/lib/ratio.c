float edges( in vec2 p, in float max ) {
    
    return step( 0., p.x ) *
         step( 0., p.y ) *
         (1. - step( max, p.x ) ) * 
         (1. - step( max, p.y ) );
    
}

vec2 screenRatio ( in vec2 p, in vec2 resolution, in vec2 ratio ) {
    
    vec2 targetResolution = ratio * vec2( min( resolution.x / ratio.x , resolution.y / ratio.y ) );
    
    vec2 scale = resolution / targetResolution;
    
    vec2 scaledP = p * scale;
    
    scaledP += (1. - scale) * .5;
    
    return scaledP;
    
}

vec2 fourThree( in vec2 p, in vec2 resolution ) {
    
    const vec2 ratio = vec2( 4., 3. );
    
    return screenRatio( p, resolution, ratio );
    
}