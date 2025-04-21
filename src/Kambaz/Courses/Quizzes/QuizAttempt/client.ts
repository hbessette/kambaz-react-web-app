import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZ_ATTEMPT_API = `${REMOTE_SERVER}/api/quizAttempt`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateQuizAttempt = async (quizAttempt: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZ_ATTEMPT_API}/${quizAttempt._id}`,
    quizAttempt
  );
  return data;
};
