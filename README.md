# hn-sentiment

An experimental Hacker News reader incorporating sentiment analysis of comments.

Currently hosted at http://hnreader-cstadler.rhcloud.com/

A color label for each story is produced by taking the mean of the sentiment of each comment, multiplying this by the log of the number of comments (to reduce the variance of stories with few comments), and finally estimating the area under the probability density function between this score and the mean score. This results in an even distribution of scores, essentially magnifying differences close to the mean.

Each comment is labeled using the same method, but the histogram shows the raw scores.

Uses node.js, React, D3.js, and the [sentiment](https://github.com/thisandagain/sentiment) module.

## TODO:

- Fix timestamps
- Check distribution of comments
- Performance
