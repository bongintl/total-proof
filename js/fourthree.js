function fourthree () {

    var scale = Math.min( window.innerWidth * .9 / 4 , window.innerHeight * .9 / 3 );
    
    return { x: 4 * scale, y: 3 * scale };
    
}


module.exports = fourthree;

NodeList.prototype.forEach = Array.prototype.forEach;

document.querySelectorAll( '.js-fourthree' ).forEach( function(el){
    
    function size () {
        
        var sz = fourthree();
        
        el.style.width = sz.x + 'px';
        el.style.height = sz.y + 'px';
        
    }
    
    window.addEventListener('resize', size);
    size();
    
})