function isPrimitive(val) {
    const type = typeof val;
    return type === 'string' || type === 'number' || type === 'boolean';
}

export {
    isPrimitive
}