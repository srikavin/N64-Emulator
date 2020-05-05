import {Register} from "./register";
import {Opcode} from "./opcode";

interface InstructionBase {
    opcode: Opcode;
}

export type Instruction = FRInstruction | RInstruction | JInstruction | IInstruction
type InstructionFunction =
    COP1_Function_SD_Base
    | COP1_Function_S
    | COP1_Function_D
    | COP1_Function_WL
    | SPECIAL_Functions
    | REGIMM_rt;
export type RInstructionOpcode = Opcode.SPECIAL;
export type FRInstructionOpcode = Opcode.COP1;
export type JInstructionOpcode = Opcode.J | Opcode.JAL;
export type IInstructionOpcode = Opcode.SLTI
    | Opcode.SLTIU
    | Opcode.ANDI
    | Opcode.ORI
    | Opcode.LUI
    | Opcode.SW
    | Opcode.BEQ
    | Opcode.BNE
    | Opcode.BLEZ
    | Opcode.BGTZ
    | Opcode.ADDI
    | Opcode.ADDIU
    | Opcode.LB
    | Opcode.LW
    | Opcode.LBU
    | Opcode.LHU
    | Opcode.SB
    | Opcode.SH;

export interface RInstruction extends InstructionBase {
    opcode: RInstructionOpcode
    /**
     * Source register
     */
    rs: Register;
    /**
     * Source/Destination register
     */
    rt: Register;
    /**
     * Destination register
     */
    rd: Register;
    /**
     * Used in shift instructions instead of rt
     */
    shamt: number;
    /**
     * Specifies which R-format instruction to execute
     */
    func: InstructionFunction;
}

export interface FRInstruction extends InstructionBase {
    opcode: FRInstructionOpcode;
    /**
     * Source register
     */
    fs: Register;
    /**
     * Source/Destination register
     */
    ft: Register;
    /**
     * Destination register
     */
    fd: Register;
    /**
     * Instruction format specifier
     */
    fmt: COP1_Fmt;
    /**
     * Specifies which R-format instruction to execute
     */
    func: InstructionFunction;
}

export interface JInstruction extends InstructionBase {
    opcode: JInstructionOpcode;
    /**
     * The address to jump to shifted right by two.
     * (26-bit value)
     */
    addr: number
}

export interface IInstruction extends InstructionBase {
    opcode: IInstructionOpcode
    /**
     * Source register
     */
    rs: Register;
    /**
     * Target register
     */
    rt: Register;
    /**
     * Immediate signed value (16-bit value) or memory offset
     */
    imm: number;
    /**
     * Immediate un-signed value (16-bit value) or memory offset
     */
    imm_us: number;
}

interface CPU_SPECIAL_Instruction extends InstructionBase {
    opcode: Opcode.SPECIAL,
    function: SPECIAL_Functions
}

interface CPU_rt_Instruction extends InstructionBase {
    opcode: Opcode.REGIMM,
    rt: REGIMM_rt
}

interface _COP1_Instruction extends InstructionBase {
    opcode: Opcode.COP1,
    fmt: COP1_Fmt
}

interface COP1_tf_Instruction extends _COP1_Instruction {
    fmt: COP1_Fmt.BC,
    tf: COP1_nd_tf
}

interface COP1_S_Instruction extends _COP1_Instruction {
    fmt: COP1_Fmt.S,
    function: COP1_Function_SD_Base | COP1_Function_S
}

interface COP1_D_Instruction extends _COP1_Instruction {
    fmt: COP1_Fmt.D,
    function: COP1_Function_SD_Base | COP1_Function_D
}

interface COP1_WL_Instruction extends _COP1_Instruction {
    fmt: COP1_Fmt.W | COP1_Fmt.L,
    function: COP1_Function_WL
}

export enum SPECIAL_Functions {
    SLL = 0b000_000,
    SRL = 0b000_010,
    SRA = 0b000_011,
    SLLV = 0b000_100,
    SRLV = 0b000_110,
    SRAV = 0b000_111,

    JR = 0b001_000,
    JALR = 0b001_001,
    SYSCALL = 0b001_100,
    BREAK = 0b001_101,
    SYNC = 0b001_111,

    MFHI = 0b010_000,
    MTHI = 0b010_001,
    MFLO = 0b010_010,
    MTLO = 0b010_011,
    DSLLV = 0b010_100,
    DSRLV = 0b010_110,
    DSRAV = 0b010_111,

    MULT = 0b011_000,
    MULTU = 0b011_001,
    DIV = 0b011_010,
    DIVU = 0b011_011,
    DMULT = 0b011_100,
    DMULTU = 0b011_101,
    DDIV = 0b011_110,
    DDIVU = 0b011_111,

    ADD = 0b100_000,
    ADDU = 0b100_001,
    SUB = 0b100_010,
    SUBU = 0b100_011,
    AND = 0b100_100,
    OR = 0b100_101,
    XOR = 0b100_110,
    NOR = 0b100_111,

    SLT = 0b101_010,
    SLTU = 0b101_011,
    DADD = 0b101_100,
    DADDU = 0b101_101,
    DSUB = 0b101_110,
    DSUBU = 0b101_111,

    TGE = 0b110_000,
    TGEU = 0b110_001,
    TLT = 0b110_010,
    TLTU = 0b110_011,
    TEQ = 0b110_100,
    TNE = 0b110_110,

    DSLL = 0b111_000,
    DSRL = 0b111_010,
    DSRA = 0b111_011,
    DSLL32 = 0b111_100,
    DSRL32 = 0b111_110,
    DSRA32 = 0b111_111
}

export enum REGIMM_rt {
    BLTZ = 0b00_000,
    BGEZ = 0b00_001,
    BLTZL = 0b00_010,
    BGEZL = 0b00_011,

    TGEI = 0b01_000,
    TGEIU = 0b01_001,
    TLTI = 0b01_010,
    TLTIU = 0b01_011,
    TEQI = 0b01_100,
    TNEI = 0b01_110,

    BLTZAL = 0b10_000,
    BGEZAL = 0b10_001,
    BLTZALL = 0b10_010,
    BGEZALL = 0b10_011
}

export enum COP1_Fmt {
    MFC1 = 0b00_000,
    DMFC1 = 0b00_001,
    CFC1 = 0b00_010,
    MTC1 = 0b00_100,
    DMTC1 = 0b00_101,
    CTC1 = 0b00_110,

    BC = 0b01_000,

    S = 0b10_000,
    D = 0b10_001,
    W = 0b10_100,
    L = 0b10_101
}

export enum COP1_nd_tf {
    BC1F = 0b0_0,
    BC1T = 0b0_1,
    BC1FL = 0b1_0,
    BC1TL = 0b1_1
}

/**
 * Represents the shared functions for COP1 instructions where fmt = S or D
 */
enum COP1_Function_SD_Base {
    ADD = 0b000_000,
    SUB = 0b000_001,
    MUL = 0b000_010,
    DIV = 0b000_011,
    SQRT = 0b000_100,
    ABS = 0b000_101,
    MOV = 0b000_110,
    NEG = 0b000_111,

    ROUND_L = 0b001_000,
    TRUNC_L = 0b001_001,
    CEIL_L = 0b001_010,
    FLOOR_L = 0b001_011,
    ROUND_W = 0b001_100,
    TRUNC_W = 0b001_101,
    CEIL_W = 0b001_110,
    FLOOR_W = 0b001_111,

    CVT_W = 0b100_100,
    CVT_L = 0b100_101,

    C_F = 0b110_000,
    C_UN = 0b110_001,
    C_EQ = 0b110_010,
    C_UEQ = 0b110_011,
    C_OLT = 0b110_100,
    C_ULT = 0b110_101,
    C_OLE = 0b110_110,
    C_ULE = 0b110_111,

    C_SF = 0b111_000,
    C_NGLE = 0b111_001,
    C_SEQ = 0b111_010,
    C_NGL = 0b111_011,
    C_LT = 0b111_100,
    C_NGE = 0b111_101,
    C_LE = 0b111_110,
    C_NGT = 0b111_111
}

enum COP1_Function_S {
    CVT_D = 0b100_001
}

enum COP1_Function_D {
    CVT_S = 0b100_000
}

enum COP1_Function_WL {
    CVT_S = 0b100_000,
    CVT_D = 0b100_001
}