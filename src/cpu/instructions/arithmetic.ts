import {IInstruction, RInstruction} from "../instruction";
import {Cpu} from "../cpu";
import {BIGINT_1, INT32_MAX, INT64_MAX, UINT32_MAX, UINT64_MAX} from "../../util";
import {Register} from "../register";

export class IntegerOverflowException extends Error {

}

export const ArithmeticInstructions = {
    add: add,
    addi: addi,
    addu: addu,
    addiu: addiu,
    dadd: dadd,
    daddi: daddi
}

function add(instruction: RInstruction, cpu: Cpu) {
    let ret = cpu.reg_s(instruction.rs) + cpu.reg_s(instruction.rt);

    if (ret > INT32_MAX) {
        // handle exception
        throw new IntegerOverflowException();
    }

    cpu.reg_lo_s(instruction.rd, Number(ret));
}

function addi(instruction: IInstruction, cpu: Cpu) {
    let ret = cpu.reg_s(instruction.rs) + BigInt(instruction.imm);

    if (ret > INT32_MAX) {
        // handle exception
        throw new IntegerOverflowException();
    }

    cpu.reg_u(instruction.rt, ret);
}

function addu(instruction: RInstruction, cpu: Cpu) {
    // unsigned overflow acts a wrap around
    let ret = (cpu.reg_u(instruction.rs) + cpu.reg_u(instruction.rt)) % (UINT32_MAX + BIGINT_1);

    cpu.reg_u(instruction.rd, ret)
}

function addiu(instruction: IInstruction, cpu: Cpu) {
    // unsigned overflow acts a wrap around
    let ret = (cpu.reg_u(instruction.rs) + BigInt(instruction.imm_us)) % (UINT32_MAX + BIGINT_1);

    cpu.reg_u(instruction.rt, ret);
}

function dadd(instruction: RInstruction, cpu: Cpu) {
    let ret = (BigInt.asIntN(128, cpu.reg_s(instruction.rs)) + BigInt.asIntN(128, cpu.reg_s(instruction.rt)));

    if (ret > INT64_MAX) {
        // handle exception
        throw new IntegerOverflowException();
    }

    cpu.reg_s(instruction.rd, ret);
}

function daddi(instruction: IInstruction, cpu: Cpu) {
    let ret = (BigInt.asIntN(128, cpu.reg_s(instruction.rs)) + BigInt.asIntN(128, BigInt(instruction.imm)));

    if (ret > INT64_MAX) {
        // handle exception
        throw new IntegerOverflowException();
    }

    cpu.reg_s(instruction.rt, ret);
}

function daddiu(instruction: IInstruction, cpu: Cpu) {
    let ret = (cpu.reg_u(instruction.rs) + BigInt(instruction.imm)) % UINT64_MAX;

    cpu.reg_u(instruction.rt, ret);
}

function daddu(instruction: RInstruction, cpu: Cpu) {
    let ret = (cpu.reg_u(instruction.rs) + BigInt(instruction.rt)) % UINT64_MAX;

    cpu.reg_u(instruction.rd, ret);
}

function ddiv(instruction: RInstruction, cpu: Cpu) {
    const rs = cpu.reg_s(instruction.rs)
    const rt = cpu.reg_s(instruction.rt)

    let lo = rt === BigInt(0) ? rt : rs / rt;
    let hi = rs % rt;

    cpu.reg_s(Register.lo, lo);
    cpu.reg_s(Register.hi, hi);
}

function ddivu(instruction: RInstruction, cpu: Cpu) {
    const rs = cpu.reg_u(instruction.rs)
    const rt = cpu.reg_u(instruction.rt)

    let lo = rt === BigInt(0) ? rt : rs / rt;
    let hi = rs % rt;

    cpu.reg_u(Register.lo, lo);
    cpu.reg_u(Register.hi, hi);
}

function div(instruction: RInstruction, cpu: Cpu) {
    const rs = cpu.reg_lo_s(instruction.rs)
    const rt = cpu.reg_lo_s(instruction.rt)

    let lo = rt === 0 ? rt : rs / rt;
    let hi = rs % rt;

    cpu.reg_u(Register.lo, BigInt(lo));
    cpu.reg_u(Register.hi, BigInt(hi));
}

