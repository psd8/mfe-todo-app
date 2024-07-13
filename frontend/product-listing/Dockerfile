FROM node:20 as base

WORKDIR /product-listing

ENV PATH /product-listing/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Bundle app source
# add app
COPY . ./

FROM base as development

EXPOSE 8082 
CMD [ "yarn", "start" ]