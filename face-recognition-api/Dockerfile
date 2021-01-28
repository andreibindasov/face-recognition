FROM node:14.14.0

WORKDIR /usr/src/face-recognition-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]

# docker build -t smartbraindockercontainer .
# docker run -it smartbraindockercontainer >> ENTER INSIDE THE CONTAINER
# docker run -it -d smartbraindockercontainer >> RUNNING IN THE BACKGROUND
# docker ps >> SEE ALL THE CONTAINERS CURRENTLY RUNNING
# docker exec -it [hash] bash >> ACCESS THE BASH WHILE RUNNING
# docker stop [hash]
# docker run -it -p 3030:3030 smartbraindockercontainer ?????????