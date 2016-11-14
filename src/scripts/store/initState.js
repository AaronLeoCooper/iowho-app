/**
 * Initial states to provider to reducers
 */

export const IOweWidget = () => ({
  iOweThem: true,
  name: '',
  amount: ''
})

export const OwesState = () => ({
  currenciesList: ['$', '£', '€'],
  currencyKey: 0,
  owes: []
})

export const ErrorState = () => ({
  hasError: false,
  message: '',
  key: ''
})
