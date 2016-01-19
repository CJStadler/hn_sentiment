var chroma = require('chroma-js'),
    stats = require("../libs/stats.js");

var chroma_scale = chroma.scale(["#fc8d59", "white", "#91cf60"]).domain([-0.5, stats.neutral_score, 0.6]);

module.exports = chroma_scale;
