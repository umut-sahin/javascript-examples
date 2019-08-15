<div align="center">
  <h1>tcp-echo-server</h1>
  A simple program, which demonstrates how to create the most basic <a href="https://en.wikipedia.org/wiki/Transmission_Control_Protocol">TCP</a> server which echoes back what the client writes after successfully connecting
</div>

## Authors

- [umut-sahin](https://github.com/umut-sahin) - Umut Şahin \<umutsahin@protonmail.com>

## Prerequisites

None

## Description

This program uses the [**createServer**] function from the built-in [**net**] module to create a [TCP] server, which listens to port **8000**.
Then for each connected client, it responds with whatever the client writes.

Here the **client** variable is a [**Duplex Stream**], which means it is both a [**Readable Stream**] and a [**Writable Stream**].
[**Readable Stream**]s can be piped to [**Writable Stream**]s.
Usually, it is done by the [**pipe**] method of readable streams.
However, error handling can easily be forgotten with that approach, which may result in memory leaks.
[Node.js] **v10.0.0** introduced the [**pipeline**] function in the [**stream**] module to combine pipes, and luckily, it provides convenient error handling.
The [**pipeline**] function takes any number of streams to pipe together, and a callback as its last argument to notify the runtime when either the pipeline is fully done, or an error occurred during the pipeline.
In our case, we want to pipe the **client** to itself.
We don't care whether the piping process is successful, or we got an error during the piping process.
We want to end the connection with the client in either case.
Thus, we set the [**pipeline**]s callback so that the [**end**] method is called on the client in either case.

Then, finally, we start to listen to clients.

## Usage

```
$ npm run -s tcp-echo-server
```

## Arguments and flags

None

## Example run

```
$ npm run -s tcp-echo-server

```
Then, in another terminal
```
$ nc 127.0.0.1 8000
Hello World!
Hello World!
Goodbye World!
Goodbye World!
^C
```

## Known bugs

None

## Limitations

None

## Notes

None

## Further reading

- [Node.js Streams: Everything you need to know]
- [Understanding memory leaks in Node.js]


[//]: # (Links)

[**createServer**]:
  https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener
[**Duplex Stream**]:
  https://nodejs.org/api/stream.html#stream_class_stream_duplex
[**end**]:
  https://nodejs.org/api/stream.html#stream_writable_end_chunk_encoding_callback
[**net**]:
  https://nodejs.org/api/net.html
[**pipe**]:
  https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
[**pipeline**]:
  https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback
[**Readable Stream**]:
  https://nodejs.org/api/stream.html#stream_readable_streams
[**stream**]:
  https://nodejs.org/api/stream.html
[**Writable Stream**]:
  https://nodejs.org/api/stream.html#stream_writable_streams
[Node.js]:
  https://nodejs.org/
[Node.js Streams: Everything you need to know]:
  https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/
[TCP]:
  https://en.wikipedia.org/wiki/Transmission_Control_Protocol
[Understanding memory leaks in Node.js]:
  https://www.alxolr.com/articles/understanding-memory-leaks-in-node-js-part-1
