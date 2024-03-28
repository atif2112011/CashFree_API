require("dotenv").config();
const express = require("express");
const app = express();

//require CashfreeSDK
const cfSdk = require("cashfree-sdk");

//access the PayoutsSdk from CashfreeSDK
const { Payouts } = cfSdk;

// Instantiate Cashfree Payouts
const payoutsInstance = new Payouts({
  env: "TEST",
  clientId: process.env.CF_ID,
  clientSecret: process.env.CF_SECRET,
});

const transfer_id = 1;

//TODO get last transfer_id() form DB

//Get Beneficiary Details
const GetBeneficiary = async (id) => {
  try {
    const response = await payoutsInstance.beneficiary.getById({
      beneId: id,
    });

    if (response.status == "SUCCESS") {
      console.log("Beneficiary Recieved", response);
      return response;
    } else throw new Error("Invalid beneficiary Id", response);
  } catch (error) {
    console.log(error.message);
  }
};

//Add Beneficiary
const AddBeneficiary = async (data) => {
  try {
    const response = await payoutsInstance.beneficiary.add(data);

    if (response.status == "SUCCESS") {
      console.log(response);
      return response;
    } else throw new Error("Beneficiary Addition failed", response);
  } catch (error) {
    console.log(error.message);
  }
};

//Payout Transfer

const PayoutTransfer = async (beneid, amount) => {
  try {
    const response = await payoutsInstance.transfers.requestTransfer({
      beneId: beneid,
      transferId: transfer_id,
      amount: amount,
    });

    if (response.status == "SUCCESS") {
      console.log(response);
      //TODO update latest tranfer id in DB
      return response;
    } else throw new Error("Transfer Failed", response);
  } catch (error) {
    console.log(error.message);
  }
};

// APi to fetch tranfer details using transfer id
const StatusbyTransferId = async (transferid) => {
  try {
    const response = await payoutsInstance.transfers.getTransferStatus({
      transferId: transferid,
    });

    if (response) {
      console.log(response);
      return response;
    } else throw new Error("Failed to fetch transfer status", response);
  } catch (error) {
    console.log(error.message);
  }
};

// APi to fetch tranfer details using reference id
const StatusbyReferenceId = async (refid) => {
  try {
    const response = await payoutsInstance.transfers.getTransferStatus({
      referenceId: refid,
    });

    if (response) {
      console.log(response);
      return response;
    } else throw new Error("Failed to fetch transfer status", response);
  } catch (error) {
    console.log(error.message);
  }
};

const batchTransferId = 1;
//TODO get latest batch id from DB

//API for Batch Transfer
const BatchTransfer = async (batches) => {
  //Adding tranfer id to each batch
  batches = batches.map((batch) => {
    return { ...batch, transfer_id };
    // TODO increment transfer_id in DB
  });

  try {
    const response = await payoutsInstance.transfers.requestBatchTransfer({
      batchTransferId: batchTransferId,
      batchFormat: "BANK_ACCOUNT",
      batch: batches,
    });

    if (response.status == "SUCCESS") {
      console.log("Batch Req Accepted", response);
      //TODO
      // increment batchtransferid in DB
      return response;
    } else throw new Error("Batch Req failed", response);
  } catch (error) {
    console.log(error.message);
  }
};

//Get Batch Transfer Status

const getBatchTransferStatus = async (batchTransferId) => {
  try {
    const response = await payoutsInstance.tranfers.getBatchTransferStatus({
      batchTransferId: batchTransferId,
    });

    if (response) {
      console.log("Status Fetch Success", response);
      return response;
    } else throw new Error("Status Fetch failed");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  GetBeneficiary,
  AddBeneficiary,
  PayoutTransfer,
  StatusbyReferenceId,
  StatusbyTransferId,
  BatchTransfer,
  getBatchTransferStatus,
};
