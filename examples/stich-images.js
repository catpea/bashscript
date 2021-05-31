#!/usr/bin/env -S node --trace-uncaught
import { inspect } from 'util';
import { cmd } from '../index.js';

const { montage } = cmd;
const files = ['image1.png', 'image2.png', 'image3.png'];
const tile = 2;
const filePath = '/tmp/test.jpg';
const command = montage({'-background': '"#212529"'}, ...files, {'-geometry': '320x230', '-tile':`${tile}x`}, filePath);

console.log(await command.string); // montage -background "#212529" a.png b.png c.png -geometry 320x230 -tile 2x /tmp/test.jpg
// await command.exe; // to execute;
