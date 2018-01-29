/**
 * Add to existing type property (that can be a string or array)
 * new one property. Needed to simplify creating helper button classes
 * like 'ButtonPrimary', 'ButtonPay', etc.
 */
const compose = (originalProps, type) => {
  const props = Object.assign({}, originalProps);

  if (!props.type) {
    props.type = type;
    return props;
  }

  if (typeof props.type === 'string') {
    props.type = [props.type, type];
    return props;
  }

  props.type.push(type);
  return props;
};

/**
 * Check if property is inside proposed types
 */
const has = (types, wantedType) => {
  if (!types) return false;
  if (typeof types === 'string') {
    return types === wantedType;
  }

  return types.includes(wantedType);
};

export {compose};
export {has};

export default {
  compose,
  has,
};