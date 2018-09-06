# Puppet Show [![Build Status](https://travis-ci.com/slominskir/puppet-show.svg?branch=master)](https://travis-ci.com/slominskir/puppet-show)
Leverages the [Puppeteer](https://github.com/GoogleChrome/puppeteer) library to expose Chromium print-to-pdf and screenshot over a service

![Screenshot](https://cdn.rawgit.com/slominskir/puppet-show/master/Screenshot.png)

Use this web service to programatically convert web pages to PDF or image.  For example, create a cron job that uses the service to generate a daily report PDF from a web page and then email it.  The HTML form allows you to easily build your request for embedding in an application.  This service should only be installed internally on an intranet and not exposed to the Internet as it can be easily abused and would be a high security risk (For example using a file:// protocol in the URL exposes local files).

## Install
```bash
npm i puppet-show
```
**Note**: This application runs on the Node.js JavaScript runtime, which can be downloaded [here](https://nodejs.org/en/download/).

## Run
```bash
npm start
```
Now navigate your web browser to http://localhost:3000/puppet-show.

## API
The URL parameter names for the web service end point __puppet-show/pdf__ and __puppet-show/screenshot__ mirror the option names for the puppeteer print-to-pdf and screenshot functions found [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions) and [here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions).  The puppet-show web forms can also be used to explore the API.

**Note**: The default values match the puppeteer defaults and the only required parameter is "url".

## Configure (Optional)
```bash
export PORT=3000
npm start
```
**Note**: Use the appropriate set environment variable command for your shell; Bash shell shown above.  For C Shell use "setenv PORT 3000", and for Windows use "set PORT 3000". 

## Docker (Optional)
Build image yourself
```bash
git clone https://github.com/slominskir/puppet-show
cd puppet-show
docker build -t slominskir/puppet-show .
docker run -d --rm -p 3000:3000 slominskir/puppet-show
# Navigate web browser to http://localhost:3000/puppet-show/
```
Or use image on [docker hub](https://hub.docker.com/r/slominskir/puppet-show/)
```bash
docker pull slominskir/puppet-show
docker run -d --rm -p 3000:3000 slominskir/puppet-show
# Navigate web browser to http://localhost:3000/puppet-show/
```


## See Also
   - [Puppet Show Wiki](https://github.com/slominskir/puppet-show/wiki)
   - [Chrome Remote Control (DevTools) Protocol](https://chromedevtools.github.io/devtools-protocol/tot/Page#method-printToPDF)
   
## Similar Projects
   - [Puppetron](https://github.com/cheeaun/puppetron)
   - [URL-to-PDF-API](https://github.com/alvarcarto/url-to-pdf-api)


> ![Logo](https://cdn.rawgit.com/slominskir/puppet-show/master/public/images/logo64x64.png)
