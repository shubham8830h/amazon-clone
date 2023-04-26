export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

// error are avalible (error.response.data.message) in backend they can show oterwise general meassage shows(error.message)
