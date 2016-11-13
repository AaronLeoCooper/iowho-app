const validateStr = (content) => `${content}`.length > 0
const validateNumber = (content) => parseInt(content).toString() !== 'NaN' && parseInt(content) >= 0
const validateBool = (content) => typeof content === 'boolean'
const validateObj = (content) => typeof content === 'object'
const validateArr = (content) => Array.isArray(content)

const validationRules = {
  id: undefined,
  iOweThem: undefined,
  name: { validate: validateStr, errorMsg: 'Wait! What\'s their name?' },
  amount: { validate: validateNumber, errorMsg: 'Hold on! How much is owed?' },
  currency: { validate: validateStr, errorMsg: 'Which currency?' }
}

export const validateOwe = (owe) => {
  return Object.keys(owe)
    .reduce((errorObj, oweKey) => {
      let validation = validationRules[oweKey]
      if (typeof validation === 'undefined' || errorObj.hasError) return errorObj

      if (!validation.validate(owe[oweKey])) {
        return { key: oweKey, message: validation.errorMsg, hasError: true }
      }

      return errorObj
    }, { key: '', message: '', hasError: false })
}
