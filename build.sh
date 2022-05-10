#!/bin/bash
docker build . -t everyplace/homebridge-logs-proxy-alpine;
docker save everyplace/homebridge-logs-proxy-alpine > logs-proxy.tar;
