function calcParityBits(val) {
    let parityBits = [];

    /*** * * ***/

    for (let i = 0; i < Math.log2(val.length) + 1; i++) {
        let parity = 0;
        for (let j = 1; j <= val.length; j++) {
            if (j & (1 << i)) {
                parity ^= parseInt(val[j - 1], 2);
            }
        }
        parityBits.push(parity);
    }

    /*** * * ***/

    return parityBits;
}

function insParityBits(val) {
    /*** * Definitions * ***/
    let valWithParity;
    let valWithParityArr = [];
    let j = 0;
    let k = 0;
    let parityBits;

    /*** * Calculations * ***/

    for (let i = 1; i <= val.length + Math.log2(val.length) + 1; i++) {
        if (i === Math.pow(2, j)) {
            valWithParityArr.push('0'); // Temporary value for parity bit
            j++;
        } else {
            valWithParityArr.push(val[k]);
            k++;
        }
    }

    parityBits = calcParityBits(valWithParityArr);

    j = 0;
    for (let i = 0; i < parityBits.length; i++) {
        valWithParityArr[Math.pow(2, j) - 1] = parityBits[i].toString();
        j++;
    }

    valWithParity = valWithParityArr.join(''); 

    /*** * Res * ***/

    return valWithParity;
}

function correct(val) {
    let errPos;

    /*** * * ***/

    errPos = check(val);

    val = val.split('');
    val[errPos] = val[errPos] === '0' ? '1' : '0';
    val = val.join('');

    /*** * * ***/

    return val;
}

function check(val) {
    /*** * Definitions * ***/

    let errPos;

    /*** * Init values * ***/

    errPos = -1;

    /*** * Calculations * ***/

    for (let i = 0; i < Math.log2(val.length); i++) {
        let parity = 0;
        for (let j = 1; j <= val.length; j++) {
            if (j & (1 << i)) {
                parity ^= parseInt(val[j - 1], 2);
            }
        }
        if (parity !== 0) {
            errPos += Math.pow(2, i);
        }
    }

    /*** * Res * ***/

    // console
    if (errPos > -1) {
        console.log(`(fn) check : Error detected at position ${errPos} (counting from 0).`);
    } else {
        console.log("(fn) check : No error detected.");
    }

    // return
    return errPos;
}

function test(val) {
    /*** * Definitions * ***/

    let enc, corruptedEnc, correctedEnc

    /*** * Calculations * ***/

    enc = insParityBits(val);

    // Calculations : corrupted encoded
    corruptedEnc = enc.split('');
    corruptedEnc[3] = corruptedEnc[3] === '0' ? '1' : '0';
    corruptedEnc = corruptedEnc.join('');

    // Calculations : corrected encoded
    correctedEnc = correct(corruptedEnc);

    /*** * Checks * ***/

    // Checks : Correctness
    if (correctedEnc !== enc) {
        console.log("(fn) test : Test Failed : correctedData !== encodedData");
        return;
    } else {
        console.log("(fn) test : Test Passed");
    }

    /*** * Res * ***/

    console.log(`(fn) test : Val: ${val}`);
    console.log(`(fn) test : Encoded data: ${enc}`);
    console.log(`(fn) test : Corrupted encoded data: ${corruptedEnc}`);
    console.log(`(fn) test : Corrected encoded data: ${correctedEnc}`);
}

test("1011");