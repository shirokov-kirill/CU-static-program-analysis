FROM node:22-bullseye
ENV NODE_VERSION=22.2.0

WORKDIR /home/student/

# Install dependencies and clean up afterwards
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    apt-transport-https \
    lsb-release \
    sudo && \
    wget https://souffle-lang.github.io/ppa/souffle-key.public -O /usr/share/keyrings/souffle-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/souffle-archive-keyring.gpg] https://souffle-lang.github.io/ppa/ubuntu/ stable main" | tee /etc/apt/sources.list.d/souffle.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends souffle && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install the project dependencies
COPY . .
RUN git submodule update --init --recursive && \
    cd ./deps/misti/ && \
    yarn install && yarn build
RUN yarn install

CMD [ "/bin/bash" ]
