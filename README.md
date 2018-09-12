# foundations

Morality binds; morality blinds.

According to Jonathan Haidt, the author of The Righteous Mind, five moral foundations govern all human ethics, virtues, and institutions: care, fairness, loyalty, authority, and sanctity. His Moral Foundations Hypothesis (MFH) claims that those with liberal ideologies are more sensitive to the care and fairness foundations, while those with conservative ideologies are equally sensitive to all five.

Why should we pay attention to what morals liberals or conservatives care more about? Often times we're frustrated by how biased, foolish, or illogical people become when they disagree with us over what we regard as fundamental virtues: a woman's right to privacy, gay rights, etc. But this makes a lot more sense when we understand that the members of America’s two political camps are, to a degree, blind to one or more of the moral foundations of the others. Therefore, they may perceive morally-driven words or behavior as having another basis—at best self-interested, at worst evil, and thus demonize one another. Readers should leave this essay having recognized that real change comes from understanding and appealing to the ethics of the other side.

# Timeline

- [ ] *Planning:* High-level outlining and graphics brainstorm for the article
- [ ] *Scraping:* cleaning and storing sermons and debates from the web
- [ ] *Analysis:* engine to analyze moral foundations of all texts
- [ ] *Writing:* outline and write the article
- [ ] *Website:* make the website
- [ ] *Data Visualization:* use D3 to create awesome data visualizations

# Literature

- [_Liberals and Conservatives Rely on Different Sets of Moral Foundations_](http://www-bcf.usc.edu/~jessegra/papers/GrahamHaidtNosek.2009.Moral%20foundations%20of%20liberals%20and%20conservatives.JPSP.pdf) Study 4, page 1038-1040

# Data

## Sermons

Unitarian Universalist: *I Pledge Allegiance* ([text](http://uuabq.com/wp-content/uploads/2018/07/20180715_Pledge_Allegiance.pdf), [video](https://www.youtube.com/watch?v=Ly2ic09yAlo))

## Moral Foundations Dictionary

- [Moral Foundations LIWC Dictionary](http://www.moralfoundations.org/sites/default/files/files/downloads/moral%20foundations%20dictionary.dic): a list of 324 of base foundation words

The header section of the file is contained within two percent signs, each on their own line. The lines in between them each contain the hash index of the foundation followed by a tab and the foundation name.
```
%
01    FOUNDATION1_VIRTUE
02    FOUNDATION1_VICE
03    FOUNDATION1_VIRTUE
...
%
```

In the lines underneath, one keyword and its foundation index lie on each line. Some keywords may refer to multiple foundations.
```
...
%
keyword1    01
keyword2    01 02
keyword3    02
...
```

## Debate Transcripts

Debate transcripts were scraped from [The American Presidency Project](http://www.presidency.ucsb.edu/debates.php).

## Sermons

Sermons were taken from the liberal Unitarian Universalist Church and the conservative Southern Baptist Church.
