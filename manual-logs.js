// Node script to send each line of a log file in Docker Compose stdout format to fluentd

const fs = require("fs");
const readline = require("readline");
const http = require("http");
const https = require("https");

// Command line arguments
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Usage: node manual-logs.js [logfile]");
  process.exit(1);
}

const IS_HTTPS = process.env.IS_HTTPS || false;

const httpLib = IS_HTTPS ? https : http;

const httpOptions = {
  hostname: process.env.FLUENTD_HOSTNAME || "localhost",
  port: process.env.FLUENTD_PORT || 9880,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const DOCKER_COMPOSE_SERVICE_SEPARATOR = "|";

function parseComposeLog(line) {
  const idx = line.indexOf(DOCKER_COMPOSE_SERVICE_SEPARATOR);
  return {
    composeService: line.substring(0, idx).trim(),
    log: line.substring(idx + 1).trim(),
  };
}

function processLogLine(line) {
  const { composeService, log } = parseComposeLog(line);
  const data = {
    log,
  };

  const options = {
    path: `/${composeService}`,
    ...httpOptions,
  };
  const req = httpLib.request(options, (res) => {
    if (res.statusCode !== 200) {
      console.error(res.statusCode);
    }
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });
  req.write(JSON.stringify(data));
  req.end();
}

async function processLogs(file) {
  const fileStream = fs.createReadStream(file);

  const lineReader = readline.createInterface({
    input: fileStream,
    // Recognize all line breaks
    crlfDelay: Infinity,
  });

  for await (const line of lineReader) {
    processLogLine(line);
  }
}

const logFile = args[0];

processLogs(logFile);
