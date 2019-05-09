FROM node:alpine
RUN apk update
RUN apk add --no-cache git openssh curl
RUN apk add --no-cache ruby ruby-json
RUN gem install -N dpl-heroku
RUN yarn global add heroku
