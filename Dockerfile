FROM risingstack/alpine:3.4-v7.10.1-4.5.1

MAINTAINER Iddy Magohe

COPY package.json package.json

RUN npm install --production

# Add your source files
COPY . .

EXPOSE 3000

CMD ["npm","start"]

# docker build -t iamiddy/local-places:0.0.1 .
# docker run  -d -p 3000:3000 --name places iamiddy/local-places:0.0.1