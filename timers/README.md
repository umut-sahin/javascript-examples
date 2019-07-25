<div align="center">
  <h1>timers</h1>
  A simple program which demonstrates how to use timers to execute a function indefinitely but with a delay
</div>

## Authors

- [umut-sahin](https://github.com/umut-sahin) - Umut Şahin \<umutsahin@protonmail.com>

## Prerequisites

- [write-to-console] example.

## Description

This program uses [**setInterval**] and [**clearInterval**] functions, which are defined in the global execution context, to achieve the purpose of executing the same function over and over again with a delay.

[**setInterval**] takes a function and duration in milliseconds and creates a timer, which executes the passed function again and again with the delay of passed duration.
It returns a handle to the created timer.
[**clearInterval**] takes a timer handle created by [**setInterval**] function call and stops the timer.

Let's go back to our example.
The function our timer executes in every **1000** millisecond is a function, which increments the value of a variable called **passedSeconds** (which is initially **0**) by **1** and prints the value of **passedSeconds** with additional information to the standard output.
Then the function checks if the value of **passedSeconds** is equal to **3**.
If so, it deletes the timer with a [**clearInterval**] function call, which causes the process to finish.

## Usage

```
$ npm run -s timers
```

## Arguments and flags

None

## Example run

```
$ npm run -s timers
1 seconds passed.
2 seconds passed.
3 seconds passed.
```

## Known bugs

None

## Limitations

- Because the way the [Node.js] works, a timer is not guaranteed to work exactly after the specified amount of time has passed.
  What happens is after the specified amount of time has passed, [Node.js] puts a new event to the event queue.
  That event will be processed in the next tick of the event loop.
  So if the event loop is blocked or taking a long time for some reason, the function, which the timer is supposed to execute after the specified amount of time will be executed with an additional delay.
  This can be proven easily by adding a statement, which blocks the event loop such as `while (true) {}`  at the end of the [main.js] file.

## Notes

None

## Further reading

- [Timers in Node.js]


[//]: # (Links)

[**clearInterval**]:
  https://nodejs.org/api/timers.html#timers_clearinterval_timeout
[**setInterval**]:
  https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_args
[main.js]:
  https://github.com/umut-sahin/javascript-examples/blob/master/timers/src/main.js
[Node.js]:
  https://nodejs.org/
[Timers in Node.js]:
  https://nodejs.org/en/docs/guides/timers-in-node/
[write-to-console]:
  https://github.com/umut-sahin/javascript-examples/tree/master/write-to-console
