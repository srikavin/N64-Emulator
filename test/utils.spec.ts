import {convertToUnsignedValue, extractBits} from '../src/util';
import {expect} from 'chai';

describe('convertToUnsignedValue', () => {
    it('should convert 0xFFFFFFFF to -1', () => {
        const input = 0xFFFFFFFF;

        const output = convertToUnsignedValue(input, 32);

        expect(output).equals(-1);
    })

    it('should convert 0xFFF8 to -8', () => {
        const input = 0xFFF8;

        const output = convertToUnsignedValue(input, 16);

        expect(output).equals(-8);
    })
})

describe('extractBits', () => {
    it('should extract 0b11 from 0b10110', () => {
        const input = 0b10110;

        const output = extractBits(input, 2, 1);

        expect(output).equals(0b11);
    });

    it('should extract 0b1011 from 0b10110', () => {
        const input = 0b10110;

        const output = extractBits(input, 4, 1);

        expect(output).equals(0b1011);
    });

    it('should extract 0b10110 from 0b10110', () => {
        const input = 0b10110;

        const output = extractBits(input, 5, 0);

        expect(output).equals(0b10110);
    });

    it('should extract 0b10 from 0b10110', () => {
        const input = 0b10110;

        const output = extractBits(input, 1, 0);

        expect(output).equals(0b10);
    });

    it('should implement two\'s complement on 0b111 from 0b1110', () => {
        const input = 0b1110;

        const output = extractBits(input, 3, 1, true);

        expect(output).equals(-0b001);
    });

    it('should implement two\'s complement on 0b1111 1111 1111 1111 1111 1111 1111 1111', () => {
        const input = 0xFFFFFFFF;

        const output = extractBits(input, 31, 0, true);

        expect(output).equals(-1);
    });

    it('should extract opcode 0b000100 from 0b000100_01001_01010_01000_00000_100000', () => {
        const input = 0b000100_01001_01010_01000_00000_100000;

        const output = extractBits(input, 31, 26, true);

        expect(output).equals(0b000100);
    });

    it('should extract rs 0b01001 from 0b000100_01001_01010_01000_00000_100000', () => {
        const input = 0b000100_01001_01010_01000_00000_100000;

        const output = extractBits(input, 25, 21);

        expect(output).equals(0b01001);
    });
});