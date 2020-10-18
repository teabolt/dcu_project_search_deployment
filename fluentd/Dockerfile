# fluentd/Dockerfile

# Base image
FROM fluent/fluentd:v1.11.4-debian-1.0

# Use root account for dependencies
USER root

# Install dependencies
RUN ["gem", "install", "fluent-plugin-elasticsearch", "--version", "4.2.0"]

# Copy configuration file
COPY ./fluentd.conf /fluentd/etc/
