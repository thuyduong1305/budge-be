import { print } from "../helpers/print.js";
import { faker } from "@faker-js/faker";
import { PaymentHistory } from "../models/index.js";
import { paymentHistoryController } from "../controllers/index.js";
import Exception from "../exceptions/Exception.js";
const getPaymentHistoryList = async ({ page, size, searchString }) => {
  // console.log("Get PaymentHistory list");
  page = parseInt(page);
  size = parseInt(size);
  let filteredPaymentHistorys = await PaymentHistory.aggregate([
    {
      $match: {
        $or: [{ name: { $regex: `.*${searchString}.*`, $options: "i" } }],
      },
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);
  return filteredPaymentHistorys;
};
// const getPaymentHistoryById = async (PaymentHistoryId) => {
//   let PaymentHistory = await PaymentHistory.findById(PaymentHistoryId);
//   if (!PaymentHistory) {
//     throw new Exception("Cant find PaymentHistory");
//   }
//   return PaymentHistory;
// };
const createPaymentHistory = async ({ name, image, date, money, type }) => {
  try {
    const paymentHistory = await PaymentHistory.create({
      name,
      image,
      date,
      money,
      type,
    });
    return paymentHistory;
  } catch (exception) {
    if (!!exception.errors) {
      console.log("Input error: ", exception.errors);
    }
  }
};
// const updatePaymentHistory = async ({ id, name, image }) => {
//   const PaymentHistory = await PaymentHistory.findById(id);
//   PaymentHistory.name = name ?? PaymentHistory.name;
//   PaymentHistory.image = image ?? PaymentHistory.image;
//   await PaymentHistory.updateOne({ id, name, image });
//   return PaymentHistory;
// };
// const deletePaymentHistory = async (id) => {
//   try {
//     let result = await PaymentHistory.findOneAndDelete({ _id: id });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };
// const generateFakePaymentHistorys = async () => {
//   [...Array(100).keys()].forEach(async (index) => {
//     let fakePaymentHistory = {
//       name: `${faker.person.fullName()}-fake`,
//       image: faker.datatype.number({ min: 0, max: 100 }).toString(),
//     };
//     await PaymentHistory.create(fakePaymentHistory);
//   });
// };

export default {
  getPaymentHistoryList,
  createPaymentHistory,
  //   updatePaymentHistory,
  //   deletePaymentHistory,
  //   generateFakePaymentHistorys,
  //   getPaymentHistoryById,
};
