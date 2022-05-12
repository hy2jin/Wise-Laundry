# base image
FROM node:16.13.2

# Directory for volume mount
RUN mkdir -p /images

# set working directory
WORKDIR /app

EXPOSE 3000

# permission
RUN chmod -R 777 /app

# `/app/node_modules/.bin`을 $PATH 에 추가
ENV PATH /app/node_modules/.bin:$PATH

# app dependencies, install 및 caching
COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
# RUN npm install react-scripts@5.0.0 -g

COPY . ./

# 앱 실행
CMD ["npm", "start"]
