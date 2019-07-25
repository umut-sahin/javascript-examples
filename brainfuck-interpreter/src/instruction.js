import assert from "assert";

export default class Instruction {
  static get type() {
    return {
      MOVE_LEFT: 1,
      MOVE_RIGHT: 2,
      INCREMENT: 3,
      DECREMENT: 4,
      READ: 5,
      WRITE: 6,
      START_LOOP: 7,
      END_LOOP: 8,
    };
  }


  constructor(type, data = 0) {
    assert(Object.values(Instruction.type).includes(type));

    this._type = type;
    this.data = data;
  }


  toString() {
    switch (this._type) {
      case Instruction.type.MOVE_LEFT: {
        return "<".repeat(this.data);
      }
      case Instruction.type.MOVE_RIGHT: {
        return ">".repeat(this.data);
      }
      case Instruction.type.INCREMENT: {
        return "+".repeat(this.data);
      }
      case Instruction.type.DECREMENT: {
        return "-".repeat(this.data);
      }
      case Instruction.type.READ: {
        return ",";
      }
      case Instruction.type.WRITE: {
        return ".";
      }
      case Instruction.type.START_LOOP: {
        return "[";
      }
      case Instruction.type.END_LOOP: {
        return "]";
      }
      default: {
        assert(false);
        return "";
      }
    }
  }
}
