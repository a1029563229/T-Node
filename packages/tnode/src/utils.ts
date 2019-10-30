function isPrimitive(val): boolean {
    const type = typeof val;
    return type === 'string' || type === 'number' || type === 'boolean';
}

export {
    isPrimitive
}