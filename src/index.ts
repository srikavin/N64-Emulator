import {disassemble} from './disassembly'
import {extractBits} from './util'
import {Register} from "./cpu/register";

console.log(disassemble);
console.log(extractBits);

// @ts-ignore
window.reg = Register