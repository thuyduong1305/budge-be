import { print } from "../helpers/print.js";
import { faker } from "@faker-js/faker";
import { Amount } from "../models/index.js";
import amount from "../controllers/amount.js";
import Exception from "../exceptions/Exception.js";
const getAmountList = async ({ page, size, searchString }) => {
  // console.log("Get amount list");
  page = parseInt(page);
  size = parseInt(size);
  let filteredAmounts = await Amount.aggregate([
    {
      $match: {
        $or: [{ name: { $regex: `.*${searchString}.*`, $options: "i" } }],
      },
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);
  return filteredAmounts;
};
const getAmountById = async (amountId) => {
  let amount = await Amount.findById(amountId);
  if (!amount) {
    throw new Exception("Cant find amount");
  }
  return amount;
};
const createAmount = async ({ name, image }) => {
  try {
    const amount = await Amount.create({ name, image });
    return amount;
  } catch (exception) {
    if (!!exception.errors) {
      console.log("Input error: ", exception.errors);
    }
  }
};
const updateAmount = async ({ id, name, image }) => {
  const amount = await Amount.findById(id);
  amount.name = name ?? amount.name;
  amount.image = image ?? amount.image;
  await amount.updateOne({ id, name, image });
  return amount;
};
const deleteAmount = async (id) => {
  try {
    let result = await Amount.findOneAndDelete({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};
const generateFakeAmounts = async () => {
  [...Array(100).keys()].forEach(async (index) => {
    let fakeAmount = {
      name: `${faker.person.fullName()}-fake`,
      image: faker.datatype.number({ min: 0, max: 100 }).toString(),
    };
    await Amount.create(fakeAmount);
  });
};
export default {
  getAmountList,
  createAmount,
  updateAmount,
  deleteAmount,
  generateFakeAmounts,
  getAmountById,
};
