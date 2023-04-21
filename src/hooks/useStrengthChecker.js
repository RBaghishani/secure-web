export const useStrengthChecker = (password) => {
  let pwdCheck = 0;
  let validateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W", ".{15,}"];
  validateRegex.forEach((regex, i) => {
    if (new RegExp(regex).test(password)) {
      pwdCheck += 1;
    }
  });
  switch (pwdCheck) {
    case 0:
      return {
        strength: 0,
        label: "",
      };
    case 1:
      return {
        strength: 1,
        label: "weak",
      };
    case 2:
      return {
        strength: 2,
        label: "fair",
      };
    case 3:
      return {
        strength: 3,
        label: "good",
      };
    case 4:
      return {
        strength: 4,
        label: "strong",
      };
    case 5:
      return {
        strength: 5,
        label: "good job!",
        isStrong: true
      };
    default:
      return null;
  }

}