import { paymentHistoryRepository } from "../repositories/index.js";
import HttpStatusCode from "../helpers/HttpStatusCode.js";
import PaymentHistory from "../models/PaymentHistory.js";
import { MAX_RECORD } from "../Global/constants.js";
const getPaymentHistoryList = async (req, res) => {
  let { page = 1, size = MAX_RECORD, searchString = "" } = req.query;
  size = size <= MAX_RECORD ? size : MAX_RECORD;
  let filteredPaymentHistories =
    await paymentHistoryRepository.getPaymentHistoryList({
      page,
      size,
      searchString,
    });
  res.status(HttpStatusCode.OK).json({
    message: "Get Payment History list",
    size: filteredPaymentHistories.length,
    page,
    searchString,
    data: filteredPaymentHistories,
  });
};

// const getPaymentHistoryById = async (req, res) => {
//   let PaymentHistoryId = req.params.id;
//   try {
//     let PaymentHistory = await PaymentHistoryRepository.getPaymentHistoryById(
//       PaymentHistoryId
//     );
//     res.status(HttpStatusCode.OK).json({
//       message: "Get PaymentHistory by id",
//       data: PaymentHistory,
//     });
//   } catch (exception) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//       message: exception.message,
//     });
//   }
// };

const createPaymentHistory = async (req, res) => {
  const { name, image, date, money } = req.body;
  await paymentHistoryRepository.createPaymentHistory({
    name,
    image,
    date,
    money,
  });
  res.send(`Post new PaymentHistory + ${name}`);
};

// const updatePaymentHistory = async (req, res) => {
//   const { id, name, image } = req.body;
//   try {
//     let PaymentHistory = await PaymentHistoryRepository.updatePaymentHistory({
//       id,
//       name,
//       image,
//     });
//     res.status(HttpStatusCode.OK).json({
//       message: "Update PaymentHistory by id",
//       data: PaymentHistory,
//     });
//   } catch (exception) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//       message: exception.message,
//     });
//   }
// };

// const deletePaymentHistory = async (req, res) => {
//   const id = req.params.id;
//   try {
//     let PaymentHistory = await PaymentHistoryRepository.deletePaymentHistory(
//       id
//     );
//     res.status(HttpStatusCode.OK).json({
//       message: "Delete PaymentHistory by id",
//       data: PaymentHistory,
//     });
//   } catch (exception) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//       message: exception.message,
//     });
//   }
// };
// const generateFakePaymentHistorys = async (req, res) => {
//   await PaymentHistoryRepository.generateFakePaymentHistorys(req.body);
// };
export default {
  getPaymentHistoryList,
  createPaymentHistory,
  //   updatePaymentHistory,
  //   deletePaymentHistory,
  //   generateFakePaymentHistorys,
  //   getPaymentHistoryById,
};
