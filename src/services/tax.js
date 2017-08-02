// @flow
type calculateResponse = {
  data: number
};

export function calculate(amount: number): Promise<calculateResponse> {
  return Promise.resolve({
    data: amount * 0.0825
  });
}
