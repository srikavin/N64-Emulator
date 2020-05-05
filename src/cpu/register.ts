/**
 * 64-bit wide floating-point registers
 */
export enum FPRegister {
    /**
     * Implementation and Revision Number
     */
    f0,
    f1,
    f2,
    f3,
    f4,
    f5,
    f6,
    f7,
    f8,
    f9,
    f10,
    f11,
    f12,
    f13,
    f14,
    f15,
    f16,
    f17,
    f18,
    f19,
    f20,
    f21,
    f22,
    f23,
    f24,
    f25,
    f26,
    f27,
    f28,
    f29,
    f30,
    /**
     * FP Control and Status
     */
    f31,
}

/**
 * 32-bit wide CPU registers
 */
export enum Register {
    /**
     * Always zero
     */
    zero = 0,
    at = 1,
    v0 = 2,
    v1 = 3,
    a0 = 4,
    a1 = 5,
    a2 = 6,
    a3 = 7,
    t0 = 8,
    t1 = 9,
    t2 = 10,
    t3 = 11,
    t4 = 12,
    t5 = 13,
    t6 = 14,
    t7 = 15,
    s0 = 16,
    s1 = 17,
    s2 = 18,
    s3 = 19,
    s4 = 20,
    s5 = 21,
    s6 = 22,
    s7 = 23,
    t8 = 24,
    t9 = 25,
    k0 = 26,
    k1 = 27,
    /**
     * Global Pointer
     */
    gp = 28,
    /**
     * Stack Pointer
     */
    sp = 29,
    /**
     * Frame Pointer
     */
    fp = 30,
    /**
     * Return Address
     */
    ra = 31,
    /**
     * Special Purpose
     */
    lo = 32,
    /**
     * Special Purpose
     */
    hi = 33
}

export function getRegister(num: number) {
    const register = Register[num];

    if (register in Register) {
        return Register[register as keyof typeof Register]
    }
    throw new Error(`Unknown register value ${num}!`)
}