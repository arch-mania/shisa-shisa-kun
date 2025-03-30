/**
 * 住宅ローンの総支払額を計算する関数
 * @param monthlyPayment 月々の支払額（万円）
 * @param years ローン期間（年）
 * @param annualInterestRate 年利（小数点表記、デフォルト1%）
 * @returns 総支払額（万円）
 */
export const calculateTotalLoanAmount = (
  monthlyPayment: number,
  years: number = 35,
  annualInterestRate: number = 0.01
): number => {
  if (isNaN(monthlyPayment) || monthlyPayment <= 0) {
    return 0;
  }

  const monthlyInterestRate = annualInterestRate / 12; // 月利
  const totalPaymentMonths = years * 12; // 年数をヶ月数に変換

  const numerator = Math.pow(1 + monthlyInterestRate, totalPaymentMonths) - 1;
  const denominator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPaymentMonths);

  // 総支払額（万円単位）= 月々の支払い（万円）× 計算係数
  return monthlyPayment * (numerator / denominator);
};

/**
 * 賃貸住宅の総支払額を計算する関数
 * @param monthlyRent 月額家賃（万円）
 * @param age 現在の年齢
 * @param lifeExpectancy 想定寿命（デフォルト90歳）
 * @returns 総支払額（万円）
 */
export const calculateTotalRentAmount = (
  monthlyRent: number,
  age: number,
  lifeExpectancy: number = 90
): number => {
  if (isNaN(monthlyRent) || monthlyRent <= 0 || isNaN(age) || age <= 0) {
    return 0;
  }

  // 賃貸支払期間 = 想定寿命 - 現在の年齢
  const yearsOfRenting = lifeExpectancy - age;
  
  // 賃貸総支払額 = 月額家賃 × 12ヶ月 × 支払い年数
  return monthlyRent * 12 * yearsOfRenting;
}; 