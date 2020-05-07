import {Cpu} from "../../src/cpu/cpu";
import {expect} from "chai";
import {Register} from "../../src/cpu/register";

describe('registers', () => {
    let cpu = new Cpu();

    beforeEach(() => {
        cpu = new Cpu();
    });

    it('should accept changes to registers', function () {
        cpu.reg_s(Register.s0, BigInt(12))
        expect(cpu.reg_s(Register.s0)).equal(BigInt(12))

        cpu.reg_u(Register.s0, BigInt(121))
        expect(cpu.reg_u(Register.s0)).equal(BigInt(121))
    });
})