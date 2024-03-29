const express = require("express");
const app = express();
const port = 8000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {
  printDetails,
  GetAllData,
  GetData,
  WriteData,
  DeleteData,
} = require("./firebase/firebaseConfig");
const {
  AddBeneficiary,
  GetToken,
  GetBeneficiary,
  StandardTransfer,
  StandardTransferStatusByRefId,
  StandardTransferStatusByTransferId,
  BatchTransfer,
  BatchTransferStatus,
} = require("./Cashfree");

//middlewares
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(bodyParser.json());

//testing route
app.get("/check", async (req, res) => {
  res.send({
    ServerStatus: "active",
  });
});

//server
const initServer = () => {
  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });
};

initServer();

// const FirebaseTestFunctions=async()=>{
// // GetAllData().then((data) => {
// //   console.log(data);
// // });

// // GetData("yilK7sb4nO6IsCEogZkF").then((data) => {
// //   console.log(data);
// // });

// // WriteData(
// //   {
// //     age: "22",
// //     name: "Test",
// //     email: "test@gmail.com",
// //   },
// //   "123"
// // );

// // DeleteData("yilK7sb4nO6IsCEogZkF");
// }

const TestData = async () => {
  const beneficiary = {
    beneId: "JOHN180124",
    name: "john doe",
    email: "johndoe@cashfree.com",
    phone: "9876543210",
    bankAccount: "00011020001772",
    ifsc: "HDFC0000001",
    address1: "ABC Street",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
  };

  const beneficiary2 = {
    beneId: "123457",
    name: "John Wick",
    email: "johnwick@cashfree.com",
    phone: "9876543210",
    bankAccount: "00224412311300",
    ifsc: "YESB0000001",
    address1: "ABC Street",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
  };

  const TransferData = {
    beneId: "123456",
    amount: "1.00",
    transferId: "2",
  };

  const BatchTransferData = {
    batchTransferId: "batch1",
    batchFormat: "BENEFICIARY_ID",
    batch: [
      {
        transferId: "PTM_00121241112",
        amount: "12",
        beneId: "123456",
        remarks: "working",
      },
    ],
  };
  // const response = await GetToken();

  // const response = await GetBeneficiary("JOHN18011343");

  // const response = await AddBeneficiary(beneficiary2);

  // const response = await StandardTransfer(TransferData);

  // const response = await StandardTransferStatusByRefId("1467020289");

  // const response = await StandardTransferStatusByTransferId("2");

  // const response = await BatchTransfer(BatchTransferData);

  // const response = await BatchTransferStatus("batch1");

  // console.log(response);
};

TestData();
