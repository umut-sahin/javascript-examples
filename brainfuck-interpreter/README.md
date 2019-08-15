<div align="center">
  <h1>brainfuck-interpreter</h1>
  A simple <a href="https://esolangs.org/wiki/brainfuck">Brainfuck</a> interpreter written in <a href="https://nodejs.org/en/">Node.js</a>
</div>

## Authors

- [umut-sahin](https://github.com/umut-sahin) - Umut Şahin \<umutsahin@protonmail.com>

## Prerequisites

None

## Description

This program is made out of three parts.

The first part is to parse the command line arguments and to read the passed script file.
[commander.js] package is used to parse the command line arguments, and the [fs] module is used to read the passed script file.

After that, it's time to parse the script file.
This can be achieved with the method **load** of the **Interpreter** class.
We did not call the **load** by hand, though.
The **constructor** of the **Interpreter** class handled that for us.
If the syntax of the script file is correct, no exceptions are thrown.

If everything went OK so far, we are now ready to interpret the parsed script.
We tell the interpreter to start interpreting the script by calling the **execute** method.
This method will go through the instructions one by one take the required actions.
If there are no memory violations, no exceptions are raised, and we are done.

## Usage

```
$ npm run -s brainfuck-interpreter -- <SCRIPT>
```

## Arguments and flags

- Argument: **SCRIPT**,
  - Type: **Path**
  - Optional: **false**
  - Multiple: **false**

## Example runs

```
$ npm run -s brainfuck-interpreter
UsageError: The following required argument was not provided: <SCRIPT>
```

```
$ npm run -s brainfuck-interpreter -- --help
Usage: brainfuck-interpreter <SCRIPT>

A simple Brainfuck interpreter written in Node.js

Options:
  -V, --version  output the version number
  -h, --help     output usage information
```

```
$ npm run -s brainfuck-interpreter -- -V
1.0.0
```

```
$ npm run -s brainfuck-interpreter -- brainfuck-interpreter/assets/hello-world.bf
Hello World!
```

```
$ npm run -s brainfuck-interpreter -- brainfuck-interpreter/assets/cat.bf
Hello World!
Hello World!
Goodbye World!
Goodbye World!
^D
```

```
$ npm run -s brainfuck-interpreter -- brainfuck-interpreter/assets/rot13.bf
Hello World!
Uryyb Jbeyq!
^D
```

## Known bugs

None

## Limitations

None

## Notes

- Due to the usage of `fs.openSync("/dev/stdin", "rs");`, some operating systems are not supported.
  However, this was the easiest and frankly the best way to implement such an example.

## Further reading

None


[//]: # (Links)

[commander.js]:
  https://github.com/tj/commander.js
[fs]:
  https://nodejs.org/api/fs.html
