FROM node:20.18.1-alpine3.20 as base

# Stage 1 : Responsible for building 
FROM base as builder 

WORKDIR /home/build

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY src/ src/

RUN npm run build

# Stage 2 : Runner
FROM base as runner

WORKDIR /home/app

COPY --from=builder /home/build/dist dist/
COPY --from=builder /home/build/package.json .

RUN npm install --omit=dev

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# now this application run as this user not the root user,this user doesnt have the permissions to root user
USER nodejs 

EXPOSE 8000

ENV PORT=8000

CMD [ "npm","start" ]
