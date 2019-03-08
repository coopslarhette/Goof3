/* eslint-disable handle-callback-err */

const path = require('path');
const parse = require(path.posix.normalize('../parser'));
const fs = require('fs');

const exampleDirectory = './examples/';

describe('The grammar', () => {
    fs.readdirSync(exampleDirectory).forEach(name => {
        if (name.endsWith('.goof')) {
            it(`matches the program ${name}`, done => {
                fs.readFile(
                    `${exampleDirectory}${name}`,
                    'utf-8',
                    (err, input) => {
                        // In this test we just care that it parses without errors
                        expect(parse(input)).toBeTruthy();
                        done();
                    }
                );
            });
        } else if (name.endsWith('.error')) {
            it(`detects a syntax error in ${name}`, done => {
                fs.readFile(
                    `${exampleDirectory}/${name}`,
                    'utf-8',
                    (err, input) => {
                        // We always wrap Ohm failures in an error with text "Syntax Error"
                        expect(() => parse(input)).toThrow(/Syntax Error/);
                        done();
                    }
                );
            });
        }
    });
});