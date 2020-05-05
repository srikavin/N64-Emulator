import {disassemble, disassembleAll} from '../src/disassembly';
import {expect} from 'chai';
import {Register} from "../src/cpu/register";
import {IInstruction, Instruction, JInstruction, RInstruction, SPECIAL_Functions} from "../src/cpu/instruction";
import {Opcode} from "../src/cpu/opcode";

describe('disassemble()', () => {
    it('should disassemble add $t0, $t1, $t2', () => {
        const test = new Uint32Array(1)
        test[0] = 0b000000_01001_01010_01000_00000_100000

        const result = disassemble(test, 0);

        const expected: RInstruction = {
            opcode: Opcode.SPECIAL,
            rs: Register.t1,
            rt: Register.t2,
            rd: Register.t0,
            shamt: 0,
            func: SPECIAL_Functions.ADD
        }

        expect(result).to.eql(expected);
    });

    it('should disassemble sll $t5, $t4, 2', () => {
        const test = new Uint32Array(1)
        test[0] = 0b000000_00000_01100_01101_00010_000000

        const result = disassemble(test, 0);

        const expected: RInstruction = {
            opcode: Opcode.SPECIAL,
            rs: Register.zero,
            rt: Register.t4,
            rd: Register.t5,
            shamt: 2,
            func: SPECIAL_Functions.SLL
        }

        expect(result).to.eql(expected);
    });

    it('should disassemble j 120', () => {
        const test = new Uint32Array(1)
        test[0] = 0b000010_00000000000000000000011110

        const result = disassemble(test, 0);

        const expected: JInstruction = {
            opcode: Opcode.J,
            addr: 0b00000000000000000000011110
        }

        expect(result).to.eql(expected);
    });

    it('should disassemble addi $a0, $s0, -1', () => {
        const test = new Uint32Array(1)
        test[0] = 0x2204ffff

        const result = disassemble(test, 0);

        const expected: IInstruction = {
            opcode: Opcode.ADDI,
            rt: Register.a0,
            rs: Register.s0,
            imm: -1,
            imm_us: 0xFFFF
        }

        expect(result).to.eql(expected);
    });

    it('should disassemble addi $sp, $sp, -8; addi $a0, $a0, -1; j 0x1048594;', () => {
        const test = new Uint32Array(3)
        test[0] = 0x23bdfff8
        test[1] = 0x2084ffff
        test[2] = 0x08100012

        const result = disassembleAll(test);

        const expected: Array<Instruction> = [
            {
                opcode: Opcode.ADDI,
                rt: Register.sp,
                rs: Register.sp,
                imm: -8,
                imm_us: 0xFFF8
            },
            {
                opcode: Opcode.ADDI,
                rt: Register.a0,
                rs: Register.a0,
                imm: -1,
                imm_us: 0xFFFF
            },
            {
                opcode: Opcode.J,
                addr: 0x100012
            }
        ]

        expect(result).to.eql(expected);
    });
});