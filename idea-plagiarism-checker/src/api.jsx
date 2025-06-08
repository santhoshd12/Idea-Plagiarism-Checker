import axios from "axios";

const url = "http://localhost:5000";

export const checkPlagiarism = async (data_text) => {
  const res = await axios.post(`${url}/api/check`, data_text);
  return res.data.result;
};

export const tipgenerate = async (data_text) => {
  const res = await axios.post(`${url}/api/tip`, data_text);
  return res.data.tips;
};
