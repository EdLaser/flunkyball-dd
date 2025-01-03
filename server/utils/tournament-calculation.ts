const teamThresholds = [2, 4, 8, 16, 32, 46];
// iterate over the thresholds and check if the number is greater or eqaul to the threshold and smaller than the next threshold
// if it is equal the threshold return the number if it is not subtract the threshold from the number and return the number of teams and the result of the subtraction as the teams that have to be split up
export const calculateTeams = (number: number): [number, number] => {
  for (let i = 0; i < teamThresholds.length; i++) {
    if (number >= teamThresholds[i] && number < teamThresholds[i + 1]) {
      return [teamThresholds[i], number - teamThresholds[i]];
    }
  }
  return [0, number];
};

const groupAmount = {
  8: 4,
  16: 4,
  32: 8,
  46: 8,
}