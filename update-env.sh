source .env

ENV_FILE=$1
DST_DIR=$2

scp -i $PEM_FILE ./config/$ENV_FILE ubuntu@$AWS_HOST:$DST_DIR/.config
