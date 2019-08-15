<div align="center">
  <h1>command-line-arguments</h1>
  A simple program, which demonstrates how to iterate over the arguments, which are passed during the program invocation
</div>

## Authors

- [umut-sahin](https://github.com/umut-sahin) - Umut Şahin \<umutsahin@protonmail.com>

## Prerequisites

- [write-to-console] example.

## Description

This program iterates over the [**process.argv**], which is an array containing passed command line arguments during the invocation of the node command.

The program uses the [**entries**] method on the [**process.argv**] to also get the indexes.

Then for every argument in the list, it prints the index of the argument as well as the argument itself.

After every single argument is printed, the program finishes.

## Usage

```
$ npm run -s command-line-arguments
```

```
$ npm run -s command-line-arguments -- [...]
```

## Arguments and flags

- Argument: **...**,
  - Type: **Any**
  - Optional: **true**
  - Multiple: **true**

## Example runs

```
$ npm run -s command-line-arguments
0: <path-to-node>/node
1: <path-to-repository>/command-line-arguments/src/main.js
```

```
$ npm run -s command-line-arguments -- example "example with spaces" -e --example
0: <path-to-node>/node
1: <path-to-repository>/command-line-arguments/src/main.js
2: example
3: example with spaces
4: -e
5: --example
```

## Known bugs

None

## Limitations

None

## Notes

- [Example runs](#example-runs) are executed in a [Linux] environment.
  Their output may slightly differ if you are on a different platform.

## Further reading

- [Command Line Arguments in Node.js]


[//]: # (Links)

[**entries**]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
[**process.argv**]:
  https://nodejs.org/api/process.html#process_process_argv
[Command Line Arguments in Node.js]:
  https://stackabuse.com/command-line-arguments-in-node-js/
[Linux]:
  https://en.wikipedia.org/wiki/Linux
[write-to-console]:
  https://github.com/umut-sahin/javascript-examples/tree/master/write-to-console
