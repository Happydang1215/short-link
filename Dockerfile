FROM node:alpine
COPY . /app
WORKDIR /app
RUN ["yarn", "install"]
RUN ["yarn", "build"]
CMD ["yarn","start"]


# VOLUME ["./db"]
# EXPOSE 3000