import {disassemble} from "../../../src/disassembly";
import {Cpu} from "../../../src/cpu/cpu";
import {ArithmeticInstructions, IntegerOverflowException} from "../../../src/cpu/instructions/arithmetic";
import {IInstruction, RInstruction} from "../../../src/cpu/instruction";
import {expect} from "chai";
import {Register} from "../../../src/cpu/register";
import {INT32_MAX, UINT32_MAX} from "../../../src/util";


describe('arithmetic instructions', () => {
    describe('add', () => {
        it('should add two registers', function () {
            let cpu = new Cpu();

            // add $s0, $a0, $zero
            let inst = <RInstruction>disassemble(new Uint32Array([0x808020]), 0);

            ArithmeticInstructions.add(inst, cpu)

            expect(cpu.reg_s(Register.s0)).equals(BigInt(0))
        });

        it('should error on overflow', function () {
            let cpu = new Cpu();

            // add $s2, $s1, $s0
            let inst = <RInstruction>disassemble(new Uint32Array([0x02309020]), 0)

            cpu.reg_s(Register.s1, BigInt(INT32_MAX))
            cpu.reg_s(Register.s0, BigInt(1))

            expect(() => {
                ArithmeticInstructions.add(inst, cpu)
            }).to.throw(IntegerOverflowException)

            expect(cpu.reg_s(Register.s0)).equals(BigInt(1))
            expect(cpu.reg_s(Register.s1)).equals(BigInt(INT32_MAX))
            expect(cpu.reg_s(Register.s2)).equals(BigInt(0))
        });
    })

    describe('addi', () => {
        it('should add two numbers', function () {
            let cpu = new Cpu();

            // addi $s2, $s1, 1335
            let inst = <IInstruction>disassemble(new Uint32Array([0x22320537]), 0);

            ArithmeticInstructions.addi(inst, cpu)
            expect(cpu.reg_s(Register.s2)).equals(BigInt(1335))

            cpu.reg_s(Register.s1, BigInt(12))

            ArithmeticInstructions.addi(inst, cpu)
            expect(cpu.reg_s(Register.s2)).equals(BigInt(1335 + 12))
        });

        it('should error on overflow', function () {
            let cpu = new Cpu();

            // addi $s2, $s1, 1
            let inst = <IInstruction>disassemble(new Uint32Array([0x22320001]), 0)

            cpu.reg_s(Register.s1, BigInt(INT32_MAX))

            expect(() => {
                ArithmeticInstructions.addi(inst, cpu)
            }).to.throw(IntegerOverflowException)

            expect(cpu.reg_s(Register.s1)).equals(BigInt(INT32_MAX))
            expect(cpu.reg_s(Register.s2)).equals(BigInt(0))
        });
    });

    describe('addu', () => {
        it('should add two numbers', function () {
            let cpu = new Cpu()

            // addu $s0, $s1, $s2
            let inst = <RInstruction>disassemble(new Uint32Array([0x2328021]), 0)

            cpu.reg_u(Register.s1, BigInt(12))

            ArithmeticInstructions.addu(inst, cpu)
            expect(cpu.reg_u(Register.s0)).equals(BigInt(12))

            cpu.reg_u(Register.s2, BigInt(981))

            ArithmeticInstructions.addu(inst, cpu)
            expect(cpu.reg_u(Register.s0)).equals(BigInt(12 + 981))
        });

        it('should not throw on overflow', function () {
            let cpu = new Cpu()

            // addu $s0, $s1, $s2
            let inst = <RInstruction>disassemble(new Uint32Array([0x2328021]), 0)

            cpu.reg_u(Register.s1, UINT32_MAX)

            ArithmeticInstructions.addu(inst, cpu)
            expect(cpu.reg_u(Register.s0)).equals(UINT32_MAX)

            cpu.reg_u(Register.s2, BigInt(981))

            ArithmeticInstructions.addu(inst, cpu)
            expect(cpu.reg_u(Register.s0)).equals(BigInt(980))
        });
    })


    describe('addiu', () => {
        it('should add two numbers', function () {
            let cpu = new Cpu()

            // addiu $s0, $s1, 1335
            let inst = <IInstruction>disassemble(new Uint32Array([0x26300537]), 0)

            cpu.reg_u(Register.s1, BigInt(12))

            ArithmeticInstructions.addiu(inst, cpu)
            expect(cpu.reg_u(Register.s0)).equals(BigInt(1335 + 12))

            cpu.reg_u(Register.s1, BigInt(981))

            ArithmeticInstructions.addiu(inst, cpu)
            expect(cpu.reg_u(Register.s0)).equals(BigInt(1335 + 981))
        });

        it('should not throw on overflow', function () {
            let cpu = new Cpu()

            // addiu $s0, $s1, 1
            let inst = <IInstruction>disassemble(new Uint32Array([0x26300001]), 0)

            cpu.reg_u(Register.s1, BigInt(UINT32_MAX))

            ArithmeticInstructions.addiu(inst, cpu)

            console.log(cpu.reg_u(Register.s0))
            expect(cpu.reg_u(Register.s0)).equals(BigInt(0))

            cpu.reg_u(Register.s1, BigInt(0))

            ArithmeticInstructions.addiu(inst, cpu)
            console.log(cpu.reg_s(Register.s0))
            expect(cpu.reg_s(Register.s0)).equals(BigInt(1))
        });
    });
})
