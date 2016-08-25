keystone-graphql
======
With a taste of apollo-stack and firebase and react and and and

## Setup local

1. create firebase account
2. create service account
3. create keystone_withenv.js in the root folder with following content

```
process.env.DB_URL = '<firebase db url>';
process.env.C_EMAIL = '<service account email>';
process.env.KEY = '<long long key>';
process.env.P_ID = '<firebase project id>';

require('./keystone');

```

## Setup heroku

1. create an mongodb here: https://www.mlab.com/
2. create all those ENV vars below in the Heroku CLI or under https://dashboard.heroku.com/apps/<projectid>/settings

```
C_EMAIL='<service account email>'
DB_URL='<firebase db url>'
KEY='<long long key>'
P_ID='<firebase project id>'
MONGO_URI='<full mongdb path with credentials>'

```

## Modifiy client code

1. check client/ folder
2. check package.json for available commands

## licence

MIT
