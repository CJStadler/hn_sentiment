# hn-sentiment

An experimental Hacker News reader incorporating sentiment analysis of comments.

A color label for each story is produced by taking the mean of the sentiment of
each comment, multiplying this by the log of the number of comments (to reduce
the variance of stories with few comments), and finally estimating the area
under the probability density function between this score and the mean score.
This results in an even distribution of scores, essentially magnifying
differences close to the mean.

Each comment is labeled using the same method, but the histogram shows the raw
scores.

Uses node.js, React, D3.js, and the
[sentiment](https://github.com/thisandagain/sentiment) module.

## Important terms
Use [tf-idf](https://github.com/NaturalNode/natural#tf-idf) to identify the N
most "important" words within a comment thread, relative to a corpus of
comments.

1. Generate csv with large corpus of comments .
2. Analyze corpus with tf-idf, and store the idf cache in a json file.
3. Given a story, load the idf cache for the corpus.
4. Calculate the tf-idf for each term in the comment thread (normalize by
   length?), relative to the corpus.
6. Select some N terms with the highest scores.

## Clustering
Use the presence (or frequency?) of these words in each comment as features in a
clustering model. Maybe exclude some if they are too common?

7. For each comment create a vector from the presence/frequency/tfidf of each
   term.
8. Do some kind of clustering using the vectors.

See: http://brandonrose.org/clustering


## TODO:

- Check distribution of comments
- Performance: http://benchling.engineering/performance-engineering-with-react/
