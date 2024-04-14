import { amountRepository } from "../repositories/index.js";
import HttpStatusCode from "../helpers/HttpStatusCode.js";
import Amount from "../models/Amount.js";
import { MAX_RECORD } from "../Global/constants.js";
const getAmountList = async (req, res) => {
  let { page = 1, size = MAX_RECORD, searchString = "" } = req.query;
  size = size <= MAX_RECORD ? size : MAX_RECORD;
  let filteredAmounts = await amountRepository.getAmountList({
    page,
    size,
    searchString,
  });
  res.status(HttpStatusCode.OK).json({
    message: "Get amount list",
    size: filteredAmounts.length,
    page,
    searchString,
    data: filteredAmounts,
  });
};

const getAmountById = async (req, res) => {
  let amountId = req.params.id;
  try {
    let amount = await amountRepository.getAmountById(amountId);
    res.status(HttpStatusCode.OK).json({
      message: "Get amount by id",
      data: amount,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const createAmount = async (req, res) => {
  const { name, image } = req.body;
  await amountRepository.createAmount({ name, image });
  res.send(`Post new amount + ${name}`);
};

const updateAmount = async (req, res) => {
  const { id, name, image } = req.body;
  try {
    let amount = await amountRepository.updateAmount({ id, name, image });
    res.status(HttpStatusCode.OK).json({
      message: "Update amount by id",
      data: amount,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const deleteAmount = async (req, res) => {
  const id = req.params.id;
  try {
    let amount = await amountRepository.deleteAmount(id);
    res.status(HttpStatusCode.OK).json({
      message: "Delete amount by id",
      data: amount,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};
const generateFakeAmounts = async (req, res) => {
  await amountRepository.generateFakeAmounts(req.body);
};
export default {
  getAmountList,
  createAmount,
  updateAmount,
  deleteAmount,
  generateFakeAmounts,
  getAmountById,
};
