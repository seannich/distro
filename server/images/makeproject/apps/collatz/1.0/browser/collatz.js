function jobMain(command_line) {
    // Parse the command line args
    const args = JSON.parse(command_line);

    // Get the range of numbers from the arguments
    const min = args['min'];
    const max = args['max'];

    function collatz(number) {
        let currentNumber = number;
        let pastNumbers = new Set();

        while (currentNumber !== 1 && !pastNumbers.has(currentNumber)) {
            if (currentNumber % 2 == 0) {
                currentNumber /= 2;
            } else {
                currentNumber = currentNumber * 3 + 1;
            }
        }

        return currentNumber === 1;
    }

    let resultString = '';

    // Create results
    for (let i=min; i<(max+1); i++) {
        let collatzString = i.toString() + ',';
        if (collatz(i)) {
            collatzString += 'true';
        } else {
            collatzString += 'false';
        }

        resultString += collatzString + '\n';
    }

    return resultString;
}