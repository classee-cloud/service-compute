FROM ubuntu

ENV RUNNER_VERSION=2.301.1

RUN useradd -m actions \
    && apt-get update \
    && apt-get install -y \
    && apt-get -y install git \
    wget \
    # add curl and jq
    curl \
    jq


RUN cd /home/actions && mkdir actions-runner && cd actions-runner \
    && wget https://github.com/actions/runner/releases/download/v2.301.1/actions-runner-linux-x64-2.301.1.tar.gz \
    && tar xzf ./actions-runner-linux-x64-2.301.1.tar.gz

WORKDIR /home/actions/actions-runner

# Here we change owner to user actions on the actions user's home directory
RUN chown -R actions ~actions && /home/actions/actions-runner/bin/installdependencies.sh

USER actions

# Add the script and make it the entrypoint
COPY entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]

