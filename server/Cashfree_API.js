require("dotenv").config();
const axios = require("axios");

//Get Authorization Token

const GetToken = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://payout-api.cashfree.com/payout/v1/authorize",
      data: {},
      headers: {
        "X-Client-Id": process.env.CF_ID,
        "X-Client-Secret": process.env.CF_SECRET,
      },
    });

    if (response.data.status == "SUCCESS") return response.data.data.token;
    else {
      console.log("Token Acquisition Failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Get Beneficiary Details By Beneficiary Id
const GetBeneficiary = async (beneid) => {
  try {
    const url =
      "https://payout-api.cashfree.com/payout/v1/getBeneficiary/" + beneid;
    const token = await GetToken();
    const response = await axios({
      method: "get",
      url: url,
      data: {},
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.data.status == "SUCCESS") return response.data;
    else {
      console.log("Fetching Beneficiary Data failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Add Beneficiary
const AddBeneficiary = async (data) => {
  try {
    const token = await GetToken();
    const response = await axios({
      method: "post",
      url: "https://payout-api.cashfree.com/payout/v1/addBeneficiary",
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.status == "SUCCESS") return response.data;
    else {
      console.log("Adding New Beneficiary failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Standard Transfer

const StandardTransfer = async (data) => {
  try {
    const token = await GetToken();
    const response = await axios({
      method: "post",
      url: "https://payout-api.cashfree.com/payout/v1/requestTransfer",
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status == 200) return response.data;
    else {
      console.log("Transfer Request Failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Fetching Transfer Status using reference Id
const StandardTransferStatusByRefId = async (refid) => {
  try {
    const token = await GetToken();
    const response = await axios({
      method: "get",
      url: "https://payout-api.cashfree.com/payout/v1.1/getTransferStatus",
      params: {
        referenceId: refid,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.status == "SUCCESS") return response.data;
    else {
      console.log("Trasfer Status Fetch Request Failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

//fetching Transfer Status using Transfer Id
const StandardTransferStatusByTransferId = async (transferid) => {
  try {
    const token = await GetToken();
    const response = await axios({
      method: "get",
      url: "https://payout-api.cashfree.com/payout/v1.1/getTransferStatus",
      params: {
        transferId: transferid,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.status == "SUCCESS") return response.data;
    else {
      console.log("Trasfer Status Fetch Request Failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Batch Tranfer API
const BatchTransfer = async (data) => {
  try {
    const token = await GetToken();
    const response = await axios({
      method: "post",
      url: "https://payout-api.cashfree.com/payout/v1/requestBatchTransfer",

      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.status == "SUCCESS") return response.data;
    else {
      console.log("Batch Trasfer Request Failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

//get Batch Transfer Status usin batch transfer id
const BatchTransferStatus = async (batchTransferId) => {
  try {
    const token = await GetToken();
    const response = await axios({
      method: "get",
      url: "https://payout-api.cashfree.com/payout/v1/getBatchTransferStatus",
      params: {
        batchTransferId: batchTransferId,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.status == "SUCCESS") return response.data;
    else {
      console.log("Batch Trasfer Status Fetch Failed");
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  GetToken,
  GetBeneficiary,
  AddBeneficiary,
  StandardTransfer,
  StandardTransferStatusByTransferId,
  StandardTransferStatusByRefId,
  BatchTransfer,
  BatchTransferStatus,
};
