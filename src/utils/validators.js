exports.sanitizeInput = (input, maxLength = 100) => {
    if (typeof input !== "string") return input;
    return input.trim().slice(0, maxLength);
};

exports.validateScore = score => {
    if (typeof score !== "number") {
        return { valid: false, error: "Score must be a number" };
    }
    if (!Number.isFinite(score)) {
        return { valid: false, error: "Score must be a finite number" };
    }
    return { valid: true };
};
