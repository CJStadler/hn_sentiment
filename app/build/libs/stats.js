// a collection of statistical functions

// measured values
var exp_mean = 0.106;
var exp_sd = 0.127;

var normalized_mean = function(sentiments) {
    var score = mean(sentiments);
    score = weight_by_comments(score, sentiments.length);
    score = normalize(score);
    return score;
};

// when there are more comments the score tends towards the mean, so this minimizes that
var weight_by_comments = function(score, n_comments) {
    return score * Math.log(n_comments); // Log chosen somewhat arbitrarily
};

var mean = function(values) {
    var mean = 0;
    var l = values.length;
    if (l > 0) {
        mean = sum(values) / l;
    }
    return mean;
};

var sum = function(values) {
    return values.reduce(function(sum, current) {
        return sum + current;
    }, 0);
};

var normalize = function(score) {

    // differences close to the mean should be more apparent than differences far from it
    var from_mean;
    if (score >= mean) {
        from_mean = normalcdf(score, exp_mean, exp_sd) - 0.5;
    } else {
        from_mean = 0.5 - normalcdf(2*exp_mean - score, exp_mean, exp_sd);
    }
    return from_mean;
};

// modified from http://stackoverflow.com/a/14873282
var normalcdf = function(x, mean, sd) {
    return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * sd * sd))));
};

var erf = function(x) {
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
};

module.exports = {normalized_mean: normalized_mean, neutral_score: normalize(weight_by_comments(0, 200))};
