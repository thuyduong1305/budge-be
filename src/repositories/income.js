import { print } from "../helpers/print.js";
import { faker } from "@faker-js/faker";
import { Income } from "../models/index.js";
import income from "../controllers/income.js";
import Exception from "../exceptions/Exception.js";
const getIncomeList = async ({ page, size, searchString }) => {
  // console.log("Get Income list");
  page = parseInt(page);
  size = parseInt(size);
  let filteredIncomes = await Income.aggregate([
    {
      $match: {
        $or: [{ name: { $regex: `.*${searchString}.*`, $options: "i" } }],
      },
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);
  return filteredIncomes;
};
const getIncomeById = async (incomeId) => {
  let income = await Income.findById(incomeId);
  if (!income) {
    throw new Exception("Cant find income");
  }
  return income;
};
const createIncome = async ({ name, image }) => {
  try {
    const income = await Income.create({ name, image });
    return income;
  } catch (exception) {
    if (!!exception.errors) {
      console.log("Input error: ", exception.errors);
    }
  }
};
const updateIncome = async ({ id, name, image }) => {
  const income = await Income.findById(id);
  income.name = name ?? income.name;
  income.image = image ?? income.image;
  await income.updateOne({ _id: id, name, image });
  return income;
};
const deleteIncome = async (id) => {
  try {
    let result = await Income.findOneAndDelete({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};
const generateFakeIncomes = async () => {
  [...Array(100).keys()].forEach(async (index) => {
    let fakeIncome = {
      name: `${faker.person.fullName()}-fake`,
      image: faker.datatype.number({ min: 0, max: 100 }).toString(),
    };
    await Income.create(fakeIncome);
  });
};
export default {
  getIncomeList,
  createIncome,
  updateIncome,
  deleteIncome,
  generateFakeIncomes,
  getIncomeById,
};
