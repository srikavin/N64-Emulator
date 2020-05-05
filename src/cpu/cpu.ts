import {Register} from './register'
import {convertToUnsignedValue} from "../util";

const low_handler: ProxyHandler<any> = {
    get: (target, p, receiver) => {
        return target[2 * (<number>p) + 1];
    },
    set: (target, p, value, receiver): boolean => {
        target[2 * (<number>p) + 1] = value;
        return true;
    }
}

const high_handler: ProxyHandler<any> = {
    get: (target, p, receiver) => {
        return target[2 * (<number>p)];
    },
    set: (target, p, value, receiver): boolean => {
        target[2 * (<number>p)] = value;
        return true;
    }
}

export class Cpu {
    /**
     * 4.5 MB memory
     */
    memory = new ArrayBuffer(1024 * 4.5);

    private _registers = new ArrayBuffer(32 * 8 + 2 * 8);

    registers = new DataView(this._registers)

    reg_u(reg: Register, val?: bigint): bigint {
        const offset = reg * 8;
        if (val) {
            this.registers.setBigUint64(offset, val);
            return val;
        }
        return this.registers.getBigUint64(offset);
    }

    reg_s(reg: Register, val?: bigint): bigint {
        const offset = reg * 8;
        if (val) {
            this.registers.setBigInt64(offset, val);
            return val;
        }
        return this.registers.getBigInt64(offset);
    }

    reg_lo_u(reg: Register, val?: number): number {
        const offset = (2 * reg + 1) * 8;
        if (val) {
            this.registers.setUint32(offset, val);
            return val;
        }
        return this.registers.getUint32(offset)
    }

    reg_lo_s(reg: Register, val?: number): number {
        const offset = (2 * reg + 1) * 8;
        if (val) {
            this.registers.setInt32(offset, val);
            return val;
        }
        return this.registers.getInt32(offset)
    }

    reg_hi_u(reg: Register, val?: number) {
        const offset = (2 * reg) * 8;
        if (val) {
            this.registers.setUint32(offset, val);
            return val;
        }
        return this.registers.getUint32(offset)
    }

    reg_hi_s(reg: Register, val?: number): number {
        const offset = (2 * reg) * 8;
        if (val) {
            this.registers.setInt32(offset, val);
            return val;
        }
        return this.registers.getInt32(offset)
    }
}