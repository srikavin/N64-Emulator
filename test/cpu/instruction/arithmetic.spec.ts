import {disassemble} from "../../../src/disassembly";
import {Cpu} from "../../../src/cpu/cpu";
import {ArithmeticInstructions} from "../../../src/cpu/instructions/arithmetic";
import {RInstruction} from "../../../src/cpu/instruction";
import {expect} from "chai";
import {Register} from "../../../src/cpu/register";

describe('add', () => {
    let cpu = new Cpu();

    beforeEach(() => {
        cpu = new Cpu();
    })

    it('should add two numbers', function () {
        // add $s0, $a0, $zero
        let inst = <RInstruction>disassemble(new Uint32Array([0x808020]), 0);

        ArithmeticInstructions.add(inst, cpu)

        expect(cpu.reg_s(Register.s0)).equals(BigInt(0))

        // cpu.reg_s(Register.a0, 2n)
    });
})