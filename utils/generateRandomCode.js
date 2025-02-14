const generateRandomCode = (digit) => {
    if (digit <= 0) throw new Error("digit must be greater than 0!");
    const min = Math.pow(10, digit - 1);
    const max = Math.pow(10, digit) - 1;
    const randomCode = Math.floor(min + Math.random() * (max - min + 1));
    return randomCode;
}

module.exports = generateRandomCode;