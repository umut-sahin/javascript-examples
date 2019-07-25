import test from "ava";

import Interpreter, { __private__ } from "../src/interpreter";


// region private function wrappingAddOnByte(...)

function wrappingAddOnByte(t, inputs, output) {
  t.is(__private__.wrappingAddOnByte(inputs[0], inputs[1]), output);
}
wrappingAddOnByte.title =
  (subtitle = "", inputs) =>
    `${subtitle} private function wrappingAddOnByte(${inputs[0]}, ${inputs[1]})`.trim();

test(wrappingAddOnByte, [0, 0], 0);
test(wrappingAddOnByte, [0, 1], 1);
test(wrappingAddOnByte, [0, 2], 2);
test(wrappingAddOnByte, [0, 253], 253);
test(wrappingAddOnByte, [0, 254], 254);
test(wrappingAddOnByte, [0, 255], 255);

test(wrappingAddOnByte, [1, 0], 1);
test(wrappingAddOnByte, [1, 1], 2);
test(wrappingAddOnByte, [1, 2], 3);
test(wrappingAddOnByte, [1, 253], 254);
test(wrappingAddOnByte, [1, 254], 255);
test(wrappingAddOnByte, [1, 255], 0);

test(wrappingAddOnByte, [2, 0], 2);
test(wrappingAddOnByte, [2, 1], 3);
test(wrappingAddOnByte, [2, 2], 4);
test(wrappingAddOnByte, [2, 253], 255);
test(wrappingAddOnByte, [2, 254], 0);
test(wrappingAddOnByte, [2, 255], 1);

test(wrappingAddOnByte, [253, 0], 253);
test(wrappingAddOnByte, [253, 1], 254);
test(wrappingAddOnByte, [253, 2], 255);
test(wrappingAddOnByte, [253, 253], 250);
test(wrappingAddOnByte, [253, 254], 251);
test(wrappingAddOnByte, [253, 255], 252);

test(wrappingAddOnByte, [254, 0], 254);
test(wrappingAddOnByte, [254, 1], 255);
test(wrappingAddOnByte, [254, 2], 0);
test(wrappingAddOnByte, [254, 253], 251);
test(wrappingAddOnByte, [254, 254], 252);
test(wrappingAddOnByte, [254, 255], 253);

test(wrappingAddOnByte, [255, 0], 255);
test(wrappingAddOnByte, [255, 1], 0);
test(wrappingAddOnByte, [255, 2], 1);
test(wrappingAddOnByte, [255, 253], 252);
test(wrappingAddOnByte, [255, 254], 253);
test(wrappingAddOnByte, [255, 255], 254);

// endregion

// region private function wrappingSubOnByte(...)

function wrappingSubOnByte(t, inputs, output) {
  t.is(__private__.wrappingSubOnByte(inputs[0], inputs[1]), output);
}
wrappingSubOnByte.title =
  (subtitle = "", inputs) =>
    `${subtitle} private function wrappingSubOnByte(${inputs[0]}, ${inputs[1]})`.trim();

test(wrappingSubOnByte, [0, 0], 0);
test(wrappingSubOnByte, [0, 1], 255);
test(wrappingSubOnByte, [0, 2], 254);
test(wrappingSubOnByte, [0, 253], 3);
test(wrappingSubOnByte, [0, 254], 2);
test(wrappingSubOnByte, [0, 255], 1);

test(wrappingSubOnByte, [1, 0], 1);
test(wrappingSubOnByte, [1, 1], 0);
test(wrappingSubOnByte, [1, 2], 255);
test(wrappingSubOnByte, [1, 253], 4);
test(wrappingSubOnByte, [1, 254], 3);
test(wrappingSubOnByte, [1, 255], 2);

test(wrappingSubOnByte, [2, 0], 2);
test(wrappingSubOnByte, [2, 1], 1);
test(wrappingSubOnByte, [2, 2], 0);
test(wrappingSubOnByte, [2, 253], 5);
test(wrappingSubOnByte, [2, 254], 4);
test(wrappingSubOnByte, [2, 255], 3);

test(wrappingSubOnByte, [253, 0], 253);
test(wrappingSubOnByte, [253, 1], 252);
test(wrappingSubOnByte, [253, 2], 251);
test(wrappingSubOnByte, [253, 253], 0);
test(wrappingSubOnByte, [253, 254], 255);
test(wrappingSubOnByte, [253, 255], 254);

test(wrappingSubOnByte, [254, 0], 254);
test(wrappingSubOnByte, [254, 1], 253);
test(wrappingSubOnByte, [254, 2], 252);
test(wrappingSubOnByte, [254, 253], 1);
test(wrappingSubOnByte, [254, 254], 0);
test(wrappingSubOnByte, [254, 255], 255);

test(wrappingSubOnByte, [255, 0], 255);
test(wrappingSubOnByte, [255, 1], 254);
test(wrappingSubOnByte, [255, 2], 253);
test(wrappingSubOnByte, [255, 253], 2);
test(wrappingSubOnByte, [255, 254], 1);
test(wrappingSubOnByte, [255, 255], 0);

// endregion


// region static get Interpreter.MEMORY_SIZE

test("static get Interpreter.MEMORY_SIZE", (t) => {
  t.is(Interpreter.MEMORY_SIZE, 30000);
});

// endregion
