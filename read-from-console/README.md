<div align="center">
  <h1>read-from-console</h1>
  A simple program which demonstrates how to read from the standard input
</div>

## Authors

- [umut-sahin](https://github.com/umut-sahin) - Umut Şahin \<umutsahin@protonmail.com>

## Prerequisites

- [write-to-console] example.

## Description

This program first asks the user to input an integer kindly.
Then it waits for the user input.

All the I/O operations in [Node.js] are non-blocking by default.
So, in this case, waiting for the user input is actually setting an event listener on the [**data**] event of the [**process.stdin**] then doing absolutely nothing.

Once the data is entered, the event dispatcher calls the callback that we passed, and the callback tries to convert the input to a number.
This can be done using the unary **+** operator.
If this operation fails, the number becomes [**NaN**].
Then the callback checks if the entered number is not [**NaN**] and in fact an integer.

If the check fails, it means that the user gave us bad input.
In this case, we respond with the message: **"You did not enter an integer. That was not nice."**.
Otherwise, the user is cooperative so, we reply with: **"You entered ${enteredInteger}. Thank you for your cooperation."**.

## Usage

```
$ npm run -s read-from-console
```

## Arguments and flags

None

## Example runs

```
$ npm run -s read-from-console
- Could you enter an integer, please?
+ 42
- You entered 42. Thank you for your cooperation.
```

```
$ npm run -s read-from-console
- Could you enter an integer, please?
+ Hello World!
- You did not enter an integer. That was not nice.
```

```
$ npm run -s read-from-console
- Could you enter an integer, please?
+ 42Hello World!
- You did not enter an integer. That was not nice.
```

```
$ npm run -s read-from-console
- Could you enter an integer, please?
+ 42.42
- You did not enter an integer. That was not nice.
```

## Known bugs

- Overflow and underflow conditions (See [Limitations](#limitations)).

## Limitations

- Every number in [JavaScript] is [IEEE754 Double precision] floating point number.
  That's why there are some edge cases, which can't be solved without using an [arbitrary precision arithmetic library], where the program behaves unexpectedly due to precision errors.

## Notes

- The asynchronous nature of [Node.js] makes it very difficult to write this kind of example.
  It's fine in this case, but this approach has the potential to become confusing as the code gets more and more complicated.
  That's why you should use a library such as [prompts] or [enquirer] instead.

## Further reading

None


[//]: # (Links)

[**data**]:
  https://nodejs.org/api/stream.html#stream_event_data
[**NaN**]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
[**process.stdin**]:
  https://nodejs.org/api/process.html#process_process_stdin
[arbitrary precision arithmetic library]:
  https://en.wikipedia.org/wiki/List_of_arbitrary-precision_arithmetic_software
[enquirer]:
  https://github.com/enquirer/enquirer
[IEEE754 Double precision]:
  https://en.wikipedia.org/wiki/Double-precision_floating-point_format
[JavaScript]:
  https://en.wikipedia.org/wiki/JavaScript
[Node.js]:
  https://nodejs.org/
[prompts]:
  https://github.com/terkelg/prompts
[write-to-console]:
  https://github.com/umut-sahin/javascript-examples/tree/master/write-to-console
