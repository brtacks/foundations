This folder contains all of the data used in the upcoming Brass Tacks article on moral foundations.

Below, you'll find a small description for each file.

## bush-captions.csv

### Context

This dataset contains timestamped captions of George W. Bush's answer to "Is homosexuality a choice?" in the third presidential debate of 2004. The transcript was scraped from [The American Presidency Project](http://www.presidency.ucsb.edu/debates.php). The caption times were collected by watching the debate and entering data.

### Content

*Timestamps are relative to the beginning of the [Bush video clip](https://github.com/brtacks/foundations/blob/master/data/video/bush.mp4).*

| Column Name | Type   | Description                                                        |
|-------------|--------|--------------------------------------------------------------------|
| start       | number | start time of caption in seconds after the video begins            |
| stop        | number | stop time of caption in seconds after the video begins (exclusive) |
| foundation  | number | key of moral foundation (see below). -1 if no foundation assigned  |
| caption     | text   | caption text                                                       |

## kerry-captions.csv

### Context

This dataset contains timestamped captions of John Kerry's answer to "Is homosexuality a choice?" in the third presidential debate of 2004. The transcript was scraped from [The American Presidency Project](http://www.presidency.ucsb.edu/debates.php). The caption times were collected by watching the debate and entering data.

### Content

*Timestamps are relative to the beginning of the [Kerry video clip](https://github.com/brtacks/foundations/blob/master/data/video/kerry.mp4).*

| Column Name | Type   | Description                                                        |
|-------------|--------|--------------------------------------------------------------------|
| start       | number | start time of caption in seconds after the video begins            |
| stop        | number | stop time of caption in seconds after the video begins (exclusive) |
| foundation  | number | key of moral foundation (see below). -1 if no foundation assigned  |
| caption     | text   | caption text                                                       |

## Moral Foundations Table

| Foundation Name | Key |
|-----------------|-----|
| Care            | 0   |
| Fairness        | 1   |
| Loyalty         | 2   |
| Authority       | 3   |
| Sanctity        | 4   |
| Liberty         | 5   |


