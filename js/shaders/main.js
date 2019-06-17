var common = {
    noise: require('./lib/noise.c')(),
    ratio: require('./lib/ratio.c')(),
}

module.exports = {
    
    "static" : require('./static.c')( common ),
    "video" : require('./video.c')( common ),
    "videoAlpha" : require('./videoAlpha.c')( common ),
    "videoMixer" : require('./videoMixer.c')( common ),
    
}