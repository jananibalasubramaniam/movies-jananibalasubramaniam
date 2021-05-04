# MoviesChill
A simple app to browse movies from TMDB

```sh
yarn && yarn start
```
## Task Acceptance Criteria

### As a movie critic
```
I want to Rate movies that I have watched out of 5
So that I can remember what I've watched and what I liked
```

#### Scenario: Rate a movie for the first time
```
Given I am viewing movie details of a single movie
When I have not rated this movie before
Then I am prompted to rate this movie out of 5
```

#### Scenario: Viewing a rated movie
```
Given I am viewing all movies
When I have rated a movie
Then I see the rating out of 5 next to that movie
```

```
Given I am viewing movie details of a single movie
When I have rated this movie previously
Then I can see the movie's rating
```

#### Scenario: Editing a movie's review
```
Given I am viewing movie details of a single movie
When I click to edit the rating
Then I am able to change the movie's rating
```

#### Scenario: Using a different browser
```
Given I am using a different browser to the one I had used previously
When I attempt to view the ratings I have given
Then I am unable to find them
```

```
Given I am using a the same browser that I used to rate my movies
When I refresh the page
Then I am able to see the ratings
```
