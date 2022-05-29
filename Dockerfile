FROM node:alpine
COPY . /app
WORKDIR /app
RUN ["yarn", "install"]
RUN ["yarn", "build"]
# start
CMD ["yarn","start"]
# 数据卷
# -v /db:/db
# env

VOLUME ["./db"]

EXPOSE 3000