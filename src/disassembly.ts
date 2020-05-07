import {extractBits} from "./util";
import {getFPRegister, getRegister} from "./cpu/register";
import {COP1_Fmt, Instruction, SPECIAL_Functions} from "./cpu/instruction";
import {
    isFRInstructionOpcode,
    isIInstructionOpcode,
    isJInstructionOpcode,
    isRInstructionOpcode,
    Opcode
} from "./cpu/opcode";


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

export function getFormat(id: number) {
    const fmt = COP1_Fmt[id];

    if (fmt in COP1_Fmt) {
        return COP1_Fmt[fmt as keyof typeof COP1_Fmt]
    }
    throw new Error(`Unknown format value ${id}!`)
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
    } else if (isFRInstructionOpcode(opcode)) {
        return {
            opcode: opcode,
            fmt: getFormat(extractBits(val, 25, 21)),
            func: getFunction(extractBits(val, 5, 0)),
            nd: extractBits(val, 17, 17) === 1,
            tf: extractBits(val, 16, 16) === 1,
            fd: getFPRegister(extractBits(val, 10, 6)),
            fs: getFPRegister(extractBits(val, 15, 11)),
            ft: getFPRegister(extractBits(val, 20, 16))
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


