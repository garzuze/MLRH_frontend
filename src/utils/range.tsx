export function range(start: number, stop: number, step: number = 1) {
    // Inspired by the python range built-in function
    // Creates a list that starts with start parameter, and increases (if step is positive)
    // Or decreases (if step is negative) until it hits the stop parameter
    // Exemples of usage:
    // range(1, 10, 1) => [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // range(10, 1, -1) => [10, 9, 8, 7, 6, 5, 4, 3, 2] 

    if (step === 0) throw new Error("Stop can't be 0!!!")
    const result: number[] = []

    if (step > 0) {
        for (let i = start; i < stop; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i > stop; i += step) {
            result.push(i);
        }
    }

    return result;
}