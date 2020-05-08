import {FRInstructionOpcode, IInstructionOpcode, JInstructionOpcode, RInstructionOpcode} from "./instruction";

/**
 * Represents the opcode of an instruction.
 * The value of the enum is the 6-bit identifier.
 */
export enum Opcode {
    SPECIAL = 0b000_000,
    REGIMM = 0b000_001,
    J = 0b000_010,
    JAL = 0b000_011,
    BEQ = 0b000_100,
    BNE = 0b000_101,
    BLEZ = 0b000_110,
    BGTZ = 0b000_111,

    ADDI = 0b001_000,
    ADDIU = 0b001_001,
    SLTI = 0b001_010,
    SLTIU = 0b001_011,
    ANDI = 0b001_100,
    ORI = 0b001_101,
    XORI = 0b001_110,
    LUI = 0b001_111,

    COP0 = 0b010_000,
    COP1 = 0b010_001,
    COP2 = 0b010_010,
    BEQL = 0b010_100,
    BNEL = 0b010_101,
    BLEZL = 0b010_110,
    BGTZL = 0b010_111,

    DADDI = 0b011_000,
    DADDIU = 0b011_001,
    LDL = 0b011_010,
    LDR = 0b011_011,

    LB = 0b100_000,
    LH = 0b100_001,
    LWL = 0b100_010,
    LW = 0b100_011,
    LBU = 0b100_100,
    LHU = 0b100_101,
    LWR = 0b100_110,
    LWU = 0b100_111,

    SB = 0b101_000,
    SH = 0b101_001,
    SWL = 0b101_010,
    SW = 0b101_011,
    SDL = 0b101_100,
    SDR = 0b101_101,
    SWR = 0b101_110,
    P = 0b101_111,

    LL = 0b110_111,
    LWC1 = 0b110_111,
    LWC2 = 0b110_111,
    LLD = 0b110_100,
    LDC1 = 0b110_101,
    LDC2 = 0b110_110,
    LD = 0b110_111,

    SC = 0b111_000,
    SWC1 = 0b111_001,
    SWC2 = 0b111_010,
    SCD = 0b111_100,
    SDC1 = 0b111_101,
    SDC2 = 0b111_110,
    SD = 0b111_111
}

export function isRInstructionOpcode(opcode: Opcode): opcode is RInstructionOpcode {
    return opcode == Opcode.SPECIAL;
}

export function isFRInstructionOpcode(opcode: Opcode): opcode is FRInstructionOpcode {
    return opcode == Opcode.COP1;
}

export function isJInstructionOpcode(opcode: Opcode): opcode is JInstructionOpcode {
    return opcode == Opcode.JAL || opcode == Opcode.J;
}

export function isIInstructionOpcode(opcode: Opcode): opcode is IInstructionOpcode {
    return [
        Opcode.SLTI, Opcode.SLTIU, Opcode.ANDI, Opcode.ORI, Opcode.LUI, Opcode.SW, Opcode.BEQ, Opcode.BNE,
        Opcode.BLEZ, Opcode.BGTZ, Opcode.ADDI, Opcode.ADDIU, Opcode.LB, Opcode.LW, Opcode.LBU, Opcode.LHU,
        Opcode.SB, Opcode.SH, Opcode.DADDIU, Opcode.DADDI
    ].includes(opcode)
}