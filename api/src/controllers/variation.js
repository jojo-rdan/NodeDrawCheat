function variation(arr, n) {
    if (n === 1) return arr;
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const subArr = [...arr];
        const fixed = subArr.splice(i, 1)[0];
        if (n === 2) {
            for (const iterator of subArr) {
                result.push(fixed + iterator);
            }
        }
        if (n > 2) {
            const preSolution = variation(subArr, n-1);
            for (const iterator of preSolution) {
                result.push(fixed + iterator);
            }
        }
    }
    return result;
}

module.exports = {
    variation
}