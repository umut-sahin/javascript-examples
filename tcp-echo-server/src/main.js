import net from "net";
import stream from "stream";

const server = net.createServer((client) => {
  stream.pipeline(client, client, () => client.end());
});

server.listen(8000);
