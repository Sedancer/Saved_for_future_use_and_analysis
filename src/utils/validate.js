import moment from "moment";
import { cloneDeep } from "lodash";
import v from "validator";

export const creationState = schema => {
  let tmp = Object.entries(schema);
  let state = tmp.reduce((state, [prop, v]) => {
    const value = v;
    state[prop] = {
      value: value.defaultValue ? value.defaultValue : "",
      error: false,
      errorMessage: "",
      validations: value.validations ? value.validations : [],
      links: value.links ? value.links : []
    };
    return state;
  }, {});
  return state;
};
// export const getVulueFromState = state => {
//   let result = {};
//   Object.entries(state).forEach(([prop, obj]) => {
//     const t = obj;
//
//     result[prop] = t.value;
//   });
//   return result;
// };
export const isIp = value => {
  return v.isIP(value);
};
export const isURL = value => {
  return v.isURL(value);
};

// function formatterPropertyForValidation(state) {
//   const arrayFromObject = Object.entries(state);
//   return arrayFromObject.map(([key, value]) => {
//     return {
//       value: value,
//       name: key,
//       error: false,
//       errorMessage: "",
//       links: [],
//       validations: []
//     };
//   });
// }

// function setValidations(rules) {
//   return arrayState => {
//     return arrayState.map(el => {
//       return {
//         ...el,
//         validations: rules[el.name]
//       };
//     });
//   };
// }
// const arrayToObject = array => {
//   return array.reduce((obj, item) => {
//     obj[item.name] = item;
//     return obj;
//   }, {});
// };
// function setLinks(linksMap, state) {
//   return state.map(el => {
//     return {
//       ...el,
//       links: linksMap[el.name] ? linksMap[el.name] : []
//     };
//   });
// }

// export const validationDTO = (state, rules, links) => {
//   let arrayProperties = formatterPropertyForValidation(state);
//   let addRules = setValidations(rules);
//   let arrayWithRules = addRules(arrayProperties);
//   let result = setLinks(links, arrayWithRules);
//
//   return arrayToObject(result);
// };

export const validator = state => {
  const cloneStore = cloneDeep(state);
  return (name, value) => {
    const element = cloneStore[name];
    let links = element.links.map(prop => {
      return cloneStore[prop];
    });
    let error = { message: "", linkError: [] };

    element.validations.forEach(fn => {
      let err = fn(value, links);
      if (err.message) error = err;
    });
    if (error.message) {
      return {
        ...element,
        error: true,
        errorMessage: error.message,
        value: value
      };
    } else {
      return {
        ...element,
        error: false,
        errorMessage: error.message,
        value: value
      };
    }
  };
};

// export const validateAll = state => {
//   const v = validator(state);
//   let VALID = true;
//   let result = [];
//   Object.entries(state).forEach(([prop, obj]) => {
//     let value = obj;
//     const property = v(prop, value.value);
//     if (property.error) {
//       VALID = false;
//       result.push(property);
//     }
//   });
//   return { isValid: VALID, errorState: result };
// };

export const isValid = state => {
  let VALID = true;
  const v = validator(state);
  Object.entries(state).forEach(([prop, obj]) => {
    let value = obj;
    const property = v(prop, value.value);
    if (property.error) {
      VALID = false;
    }
  });
  return VALID;
};

export const validate = state => {
  const cloneStore = cloneDeep(state);
  return (name, value) => {
    const element = cloneStore[name];
    let links = element.links.map(prop => {
      return cloneStore[prop];
    });
    let resultDTO = {
      ...element,
      error: false,
      errorMessage: "",
      value: value
    };
    let error = false;
    element.validations.forEach(([fn, message]) => {
      if (fn(value, links)) error = message;
    });

    if (error) {
      resultDTO.error = true;
      resultDTO.errorMessage = error;
    }
    return resultDTO;
  };
};

export const isValidV2 = state => {
  let VALID = true;
  const v = validate(state);
  Object.entries(state).forEach(([prop, obj]) => {
    let value = obj;
    const property = v(prop, value.value);
    if (property.error) {
      VALID = false;
    }
  });
  return VALID;
};

// export const validateAllV2 = state => {
//   const v = validate(state);
//   let VALID = true;
//   let result = [];
//   Object.entries(state).forEach(([prop, obj]) => {
//     let value = obj;
//     const property = v(prop, value.value);
//     if (property.error) {
//       VALID = false;
//       result.push(property);
//     }
//   });
//   return { isValid: VALID, errorState: result };
// };

export const required = value => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return true;
  }
};

export const password = (value, [retry]) => {
  if (value !== retry.value) return true;
};

export const timeStart = value => {
  if (moment(value).isBefore(moment(new Date()).format("YYYY-MM-DD"))) return true;
};

export const rangeTime = (value, [date]) => {
  if (!(moment(value, "YYYY-MM-DD").valueOf() > moment(date.value).valueOf())) return true;
};

export const isTime = value => {
  if (!moment(value, "HH:mm").isValid()) return true;
  if (!moment(moment(new Date()).format("YYYY-MM-DD") + " " + value).isValid()) return true;
};

// const IMSI = value => {
//   let length = value.toString().length;
//   if (length > 15 || length < 14) return "не дійсний IMSI";
//   return "";
// };
//
// const IMEI = value => {
//   let length = value.toString().length;
//   if (length !== 15) return "не дійсний IMEI";
//   return "";
// };
//
// const MSISDN = value => {
//   let length = value.toString().length;
//   if (length > 15 || length < 9) return "не дійсний MSISDN";
//   return "";
// };

// const MSISDNAnotherNetwork = value => {
//   let length = value.toString().length;
//   if (length > 15 || length < 9) return "не дійсний MSISDNAnotherNetwork";
//   return "";
// };
