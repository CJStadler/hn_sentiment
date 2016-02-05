# hn-sentiment

An experimental Hacker News reader incorporating sentiment analysis of comments.

Currently hosted at http://hnreader-cstadler.rhcloud.com/

A color label for each story is produced by taking the mean of the sentiment of each comment, multiplying this by the log of the number of comments (to reduce the variance of stories with few comments), and finally estimating the area under the probability density function between this score and the mean score. This results in an even distribution of scores, essentially magnifying differences close to the mean.

Each comment is labeled using the same method, but the histogram shows the raw scores.

Uses node.js, React, D3.js, and the [sentiment](https://github.com/thisandagain/sentiment) module.

## comment clustering
Use [tf-idf](https://github.com/NaturalNode/natural#tf-idf) to identify the N most "important" words within a comment thread, relative to a corpus of comments. Use the presence (or frequency?) of these words in each comment as features in a clustering model.

See: http://brandonrose.org/clustering

### Steps

1. Generate csv with large corpus of comments .
2. Analyze corpus with tf-idf, and store the idf cache in a json file.
3. Given a story, load the idf cache for the corpus.
4. For each comment generate a list of terms and their tf-idf relative to the corpus.
5. Generate a list of all terms in the comment thread and average their tf-idf from each comment.
6. Select some N terms.
7. For each comment create a vector from the presence (or tf-idf?) of each N term.
8. Do some kind of clustering using the vectors.


## TODO:

- Check distribution of comments
- Performance
