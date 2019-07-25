<div align="center">
  <h1>http-hello-world-server</h1>
  A simple program which demonstrates how to create the most basic <a href="https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol">HTTP</a> server which responds the same way to every request whatsoever
</div>

## Authors

- [umut-sahin](https://github.com/umut-sahin) - Umut Şahin \<umutsahin@protonmail.com>

## Prerequisites

None

## Description

This program uses the [**createServer**] function from the built-in [**http**] module to create an [HTTP] server, which listens to port **8080**.

Then for each incoming request, it responses with the text **"Hello World!"**.

## Usage

```
$ npm run -s http-hello-world-server
```

## Arguments and flags

None

## Example run

```
$ npm run -s http-hello-world-server

```
Then, in another terminal
```
$ curl 127.0.0.1:8080
Hello World!
```

## Known bugs

None

## Limitations

None

## Notes

None

## Further reading

- [The Node http module]


[//]: # (Links)

[**createServer**]:
  https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
[**http**]:
  https://nodejs.org/api/http.html
[HTTP]:
  https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[The Node http module]:
  https://flaviocopes.com/node-module-http/
