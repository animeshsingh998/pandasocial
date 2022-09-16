export const getDetails = (user) => {
  const { password, ...otherDetails } = user._doc;
  return otherDetails;
};

export const validIdParams = (id) => {
  if (id.length < 24) {
    return false;
  } else {
    return true;
    }
}
