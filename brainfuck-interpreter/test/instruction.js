import test from "ava";

import Instruction from "../src/instruction";


// region static get Instruction.type

test("static get Instruction.type", (t) => {
  t.deepEqual(
    Object.keys(Instruction.type),
    [
      "MOVE_LEFT",
      "MOVE_RIGHT",
      "INCREMENT",
      "DECREMENT",
      "READ",
      "WRITE",
      "START_LOOP",
      "END_LOOP",
    ],
  );
});

// endregion


// region Instruction.toString(...)

function toString(t, inputs, output) {
  t.is(new Instruction(inputs[0], inputs[1] || 0).toString(), output);
}
toString.title = (subtitle = "", inputs) => {
  const instructionName =
    Object.keys(Instruction.type).find(key => Instruction.type[key] === inputs[0]);
  const maybeData = inputs[1] ? `, data: ${inputs[1]}` : "";
  return `${subtitle} Instruction.toString() @ { type: ${instructionName}${maybeData} }`.trim();
};

test(toString, [Instruction.type.MOVE_LEFT, 0], "");
test(toString, [Instruction.type.MOVE_LEFT, 1], "<");
test(toString, [Instruction.type.MOVE_LEFT, 3], "<<<");

test(toString, [Instruction.type.MOVE_RIGHT, 0], "");
test(toString, [Instruction.type.MOVE_RIGHT, 1], ">");
test(toString, [Instruction.type.MOVE_RIGHT, 3], ">>>");

test(toString, [Instruction.type.INCREMENT, 0], "");
test(toString, [Instruction.type.INCREMENT, 1], "+");
test(toString, [Instruction.type.INCREMENT, 3], "+++");

test(toString, [Instruction.type.DECREMENT, 0], "");
test(toString, [Instruction.type.DECREMENT, 1], "-");
test(toString, [Instruction.type.DECREMENT, 3], "---");

test(toString, [Instruction.type.READ], ",");

test(toString, [Instruction.type.WRITE], ".");

test(toString, [Instruction.type.START_LOOP, 0], "[");
test(toString, [Instruction.type.START_LOOP, 1], "[");
test(toString, [Instruction.type.START_LOOP, 3], "[");

test(toString, [Instruction.type.END_LOOP, 0], "]");
test(toString, [Instruction.type.END_LOOP, 1], "]");
test(toString, [Instruction.type.END_LOOP, 3], "]");

// endregion
