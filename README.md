# Puppet Show [![Build Status](https://travis-ci.com/slominskir/puppet-show.svg?branch=master)](https://travis-ci.com/slominskir/puppet-show)
Leverages the [Puppeteer](https://github.com/GoogleChrome/puppeteer) library to expose Chromium print-to-pdf over a web service

![Screenshot](https://cdn.rawgit.com/slominskir/puppet-show/master/Screenshot.png)

Use this web service to programatically convert web pages to PDF.  For example, create a cron job that emails a daily PDF report generated on a web page.  The HTML form allows you to easily build your request for embedding in another application.

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

## See Also
   - [Chrome Remote Control (DevTools) Protocol](https://chromedevtools.github.io/devtools-protocol/tot/Page#method-printToPDF)
   
## Similar Projects
   - [Puppetron](https://github.com/cheeaun/puppetron)
   - [URL-to-PDF-API](https://github.com/alvarcarto/url-to-pdf-api)
