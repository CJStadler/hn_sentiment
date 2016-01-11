var normalize = function(score, n_comments) {
    // measured values
    var mean = 0.106;
    var sd = 0.127;

    // when there are more comments the score tends towards the mean, so this minimizes that
    var comments_scale = score * Math.log(n_comments);

    // differences close to the mean should be more apparent than differences far from it
    var from_mean;
    if (score >= mean) {
        from_mean = normalcdf(comments_scale, mean, sd) - 0.5;
    } else {
        from_mean = 0.5 - normalcdf(2*mean - comments_scale, mean, sd);
    }
    return from_mean;
};

// modified from http://stackoverflow.com/a/14873282
function normalcdf(x, mean, sd) {
    return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * sd * sd))));
}

function erf(x) {
    // save the sign of x
    var sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    // constants
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var p  =  0.3275911;

    // A&S formula 7.1.26
    var t = 1.0/(1.0 + p*x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y; // erf(-x) = -erf(x);
}

module.exports = {normalize: normalize};
