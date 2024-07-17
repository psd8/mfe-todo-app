FROM node:20 as base

WORKDIR /autosave

ENV PATH /autosave/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Bundle app source
# add app
COPY . ./


FROM base as development

EXPOSE 8084 
CMD [ "yarn", "start" ]
