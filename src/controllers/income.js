import { incomeRepository } from "../repositories/index.js";
import HttpStatusCode from "../helpers/HttpStatusCode.js";
import Income from "../models/Income.js";
import { MAX_RECORD } from "../Global/constants.js";
const getIncomeList = async (req, res) => {
  let { page = 1, size = MAX_RECORD, searchString = "" } = req.query;
  size = size <= MAX_RECORD ? size : MAX_RECORD;
  let filteredIncomes = await IncomeRepository.getIncomeList({
    page,
    size,
    searchString,
  });
  res.status(HttpStatusCode.OK).json({
    message: "Get Income list",
    size: filteredIncomes.length,
    page,
    searchString,
    data: filteredIncomes,
  });
};

const getIncomeById = async (req, res) => {
  let IncomeId = req.params.id;
  try {
    let Income = await IncomeRepository.getIncomeById(IncomeId);
    res.status(HttpStatusCode.OK).json({
      message: "Get Income by id",
      data: Income,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const createIncome = async (req, res) => {
  const { name, image } = req.body;
  await IncomeRepository.createIncome({ name, image });
  res.send(`Post new Income + ${name}`);
};

const updateIncome = async (req, res) => {
  const { id, name, image } = req.body;
  try {
    let Income = await IncomeRepository.updateIncome({ id, name, image });
    res.status(HttpStatusCode.OK).json({
      message: "Update Income by id",
      data: Income,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const deleteIncome = async (req, res) => {
  const id = req.params.id;
  try {
    let Income = await IncomeRepository.deleteIncome(id);
    res.status(HttpStatusCode.OK).json({
      message: "Delete Income by id",
      data: Income,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};
const generateFakeIncomes = async (req, res) => {
  await IncomeRepository.generateFakeIncomes(req.body);
};
export default {
  getIncomeList,
  createIncome,
  updateIncome,
  deleteIncome,
  generateFakeIncomes,
  getIncomeById,
};
