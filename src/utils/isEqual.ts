type valueType = Record<string, any> | string;

export default function isEqual(firstValue: valueType, secondValue: valueType): boolean {
    if (firstValue === secondValue) return true;
    if (firstValue == null || secondValue == null) return false;
    if (typeof firstValue !== typeof secondValue) return false;

    if (typeof firstValue === 'string') {
      return (firstValue === secondValue);
    }

    const aComplex = firstValue as Record<string, any>;
    const bComplex = secondValue as Record<string, any>;

    if (Object.keys(aComplex).length !== Object.keys(bComplex).length) return false;

    for (const key in aComplex) {
        if (!(key in bComplex)) return false;
        if (!isEqual(aComplex[key], bComplex[key])) return false;
    }

    return true;
}
