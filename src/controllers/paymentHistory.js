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

const createPaymentHistory = async (req, res) => {
  const { name, image, date, money, type } = req.body;
  await paymentHistoryRepository.createPaymentHistory({
    name,
    image,
    date,
    money,
    type,
  });
  res.send(`Post new PaymentHistory + ${name}`);
};

export default {
  getPaymentHistoryList,
  createPaymentHistory,
};
