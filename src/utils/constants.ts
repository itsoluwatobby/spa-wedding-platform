
export const AccountDetails = {
  bank1: {
    bankName: 'Guaranty Trust Bank',
    accountName: 'Akinola Oluwaseun Moses',
    accountNumber: '0253676497'
  },
  bank2: {
    bankName: 'Fidelity Bank',
    accountName: 'Oluwapelumi Salami Kafilat',
    accountNumber: '6370284740'
  }
};

export const initState = {
  data: {} as SuccessResponse<RSVPProps>['data'],
  hasSubmitted: false,
  isLoading: false,
  reload: 0,
  error: null,
};