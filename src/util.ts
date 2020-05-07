export const INT32_MAX = 2147483647;
export const INT32_MIN = -2147483648;

export const INT64_MAX = 9223372036854775807;
export const INT64_MIN = -9223372036854775808;

export const UINT32_MAX = BigInt(4294967295);
export const UINT64_MAX = BigInt(18446744073709551615);

export const BIGINT_1 = BigInt(1);

/**
 * Extracts the specified bits from the given value. Bit 31 is the highest-order (left-most) bit.
 * @param val The number to extract bits from
 * @param start The starting bit (inclusive)
 * @param end The ending bit (inclusive)
 * @param signed Whether to treat the returned value as signed or unsigned
 */
export function extractBits(val: number, start: number, end: number, signed = false) {
    let tmp = (start - end + 1 < 32) ? (1 << (start - end + 1)) : 0xFFFFFFFF
    let ret = val >>> end & (tmp - 1);

    // Check if most-significant bit is set
    if (signed && (ret & (tmp >>> 1))) {
        return -((ret ^ (tmp - 1)) + 1)
    }

    return ret
}

/**
 * Returns the value of the given number treated as a signed value. Applies two's complement if
 * the most-significant bit is set.
 * @param val The number to convert
 * @param size The size (in bits) of the number
 */
export function convertToUnsignedValue(val: number, size: number = 32) {
    let tmp = (size + 1 < 32) ? ((1 << size) - 1) : 0xFFFFFFFF

    // Check if most-significant bit is set
    if (val & tmp) {
        // Two's complement
        return -((val ^ tmp) + 1)
    }
    return val
}