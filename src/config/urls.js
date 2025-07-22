const env = "dev"; // Change to "prod" for production

const config = {
  dev: {
    QUIZMICRO: "https://quiz.brainbucks.co.in",
    AUTHMICRO: "https://auth.brainbucks.co.in",
    PRERECMICRO: "https://prerec.brainbucks.co.in",
    NOTIFYMICRO: "https://notify.brainbucks.co.in",
    BLOBURL: "https://auth.brainbucks.co.in/stream/get/public?blobname=",
    IMAGE_URL: "https://auth.brainbucks.co.in/stream/get/public?blobname=",
    CHATURL: "https://socket.brainbucks.co.in",
    TICKETURL: "https://notify.brainbucks.co.in",
    ROOMURL: "https://room.brainbucks.co.in",
    APPURL: "https://app.brainbucks.co.in",
  },
  prod: {
    QUIZMICRO: "https://quiz.brainbucks.in",
    AUTHMICRO: "https://auth.brainbucks.in",
    PRERECMICRO: "https://prerec.brainbucks.in",
    NOTIFYMICRO: "https://notify.brainbucks.in",
    BLOBURL: "https://auth.brainbucks.in/stream/get/public?blobname=",
    IMAGE_URL: "https://auth.brainbucks.in/stream/get/public?blobname=",
    CHATURL: "https://socket.brainbucks.in",
    TICKETURL: "https://notify.brainbucks.in",
    ROOMURL: "https://room.brainbucks.in",
    APPURL: "https://app.brainbucks.in",
  },
};

export const {
  QUIZMICRO,
  AUTHMICRO,
  PRERECMICRO,
  NOTIFYMICRO,
  BLOBURL,
  IMAGE_URL,
  CHATURL,
  TICKETURL,
  ROOMURL,
  APPURL,
} = config[env];

export const IFSC_CHECk = 'https://ifsc.razorpay.com'; // Static - same in both
export { env };
