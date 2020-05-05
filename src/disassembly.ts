import {extractBits} from "./util";
import {getRegister} from "./cpu/register";
import {Instruction, SPECIAL_Functions} from "./cpu/instruction";
import {isIInstructionOpcode, isJInstructionOpcode, isRInstructionOpcode, Opcode} from "./cpu/opcode";


export function getOpcode(instructions: Uint32Array, index: number): Opcode {
    const opcode: number = instructions[index] >> 26;

    const opcodeName = Opcode[opcode];

    if (opcodeName in Opcode) {
        return Opcode[opcodeName as keyof typeof Opcode]
    }
    throw new Error(`Unknown opcode ${opcode}!`)
}

export function getFunction(id: number) {
    const func = SPECIAL_Functions[id];

    if (func in SPECIAL_Functions) {
        return SPECIAL_Functions[func as keyof typeof SPECIAL_Functions]
    }
    throw new Error(`Unknown function value ${id}!`)
}

export function disassemble(instruction: Uint32Array, index: number): Instruction {
    const opcode = getOpcode(instruction, index);
    const val = instruction[index]

    if (isRInstructionOpcode(opcode)) {
        return {
            opcode: opcode,
            rs: getRegister(extractBits(val, 25, 21)),
            rt: getRegister(extractBits(val, 20, 16)),
            rd: getRegister(extractBits(val, 15, 11)),
            shamt: getRegister(extractBits(val, 10, 6)),
            func: getFunction(extractBits(val, 5, 0))
        }
    } else if (isJInstructionOpcode(opcode)) {
        return {
            opcode: opcode,
            addr: extractBits(val, 25, 0)
        }
    } else if (isIInstructionOpcode(opcode)) {
        return {
            opcode: opcode,
            rs: getRegister(extractBits(val, 25, 21)),
            rt: getRegister(extractBits(val, 20, 16)),
            imm: extractBits(val, 15, 0, true),
            imm_us: extractBits(val, 15, 0, false)
        }
    }
}

export function disassembleAll(instructions: Uint32Array) {
    const ret = [];
    for (let i = 0; i < instructions.length; i++) {
        ret.push(disassemble(instructions, i));
    }
    return ret;
}


