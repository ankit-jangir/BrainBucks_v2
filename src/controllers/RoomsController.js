import {ToastAndroid} from 'react-native';
import BasicServices from '../services/BasicServices';
import RoomsApiService from '../services/api/RoomsApiService';

const roomServ = new RoomsApiService();

export async function createRoomInController(
  room_type,
  room_name,
  setErrorMessage,
  setLoading,
) {
  if (room_name.length === 0) {
    setErrorMessage('Enter name to create room');
    return;
  }
  setErrorMessage(null);
  let toast = {
    show(errorObj) {
      setErrorMessage(errorObj.text1);
    },
  };
  let res = await BasicServices.apiTryCatch(
    async () => {
      return await roomServ.createRoom(room_name, room_type);
    },
    toast,
    () => {
      setLoading(true);
    },
    () => {
      setLoading(false);
    },
  );

  return res;
}

export async function joinPublicRoomInController(room_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.joinPublicRoom(room_id);
  }, toast);
  return res;
}

export async function joinPrivateRoomInController(room_hash, toast) {
  if (!room_hash) {
    ToastAndroid.show('Please enter room hash first', ToastAndroid.SHORT);
  }
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.joinPrivateRoom(room_hash);
  }, toast);
  return res;
}

export async function withdrawJoinRequestInController(room_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.withdrawJoinRequest(room_id);
  }, toast);
  return res;
}

export async function rejectJoinRequestInController(room_id, user_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.rejectJoinRequest(room_id, user_id);
  }, toast);
  return res;
}

export async function acceptJoinRequestInController(room_id, user_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.acceptJoinRequest(room_id, user_id);
  }, toast);
  return res;
}

export async function exitRoomInController(room_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.exitRoom(room_id);
  }, toast);

  return res;
}

export async function deleteRoomInController(room_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.deleteRoom(room_id);
  }, toast);

  return res;
}

export async function registerQuizInController(quiz_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.registerInQuiz(quiz_id);
  }, toast);

  return res;
}

export async function joinQuizInController(quiz_id, toast, setLoading) {
  let res = await BasicServices.apiTryCatch(
    async () => {
      return await roomServ.joinQuiz(quiz_id);
    },
    toast,
    () => {
      setLoading(true);
    },
    () => {
      setLoading(false);
    },
  );

  return res;
}

export async function getQuestionInController(
  quiz_id,
  page,
  toast,
  dispatch,
  setSelectedOption,
) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.getQuestion(quiz_id, page);
  }, toast);

  if (res && res.question) {
    dispatch({
      type: 'change',
      state: {
        question: res.question,
        ans: res.selected_ans,
      },
    });
    setSelectedOption(res.selected_ans);
  }

  return res;
}

export async function updateAnswerInController(quiz_id, page, ans, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.updateAnswer(quiz_id, page, ans);
  }, toast);

  return res;
}

export async function submitQuizInController(
  quiz_id,
  submit_time_period,
  toast,
) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.submitQuiz(quiz_id, submit_time_period);
  }, toast);

  return res;
}

export async function scoreCardInController(quiz_id, toast) {
  let res = await BasicServices.apiTryCatch(async () => {
    return await roomServ.viewScorecard(quiz_id);
  }, toast);

  return res;
}

export async function CheckEligibilityForPublicRoom(toast, setLoading) {
  let res = await BasicServices.apiTryCatch(
    async () => {
      return await roomServ.checkEligibilityForPublicRoom();
    },
    toast,
    () => {
      setLoading(true);
    },
    () => {
      setLoading(false);
    },
  );

  return res;
}

export async function SendOTPToMail(email, toast, setMailLoading) {
  let res = await BasicServices.apiTryCatch(
    async () => {
      return await roomServ.sendOtpToMail(email);
    },
    toast,
    () => {
      setMailLoading(true);
    },
    () => {
      setMailLoading(false);
    },
  );

  return res;
}

export async function verifyOTP(email, otp, toast, setOtpLoading) {
  let res = await BasicServices.apiTryCatch(
    async () => {
      return await roomServ.verifyOtp(email, otp);
    },
    toast,
    () => {
      setOtpLoading(true);
    },
    () => {
      setOtpLoading(false);
    },
  );

  return res;
}
