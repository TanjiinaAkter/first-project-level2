import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  //    "err": {
  //         "errorLabelSet": {},
  //         "errorResponse": {
  //             "index": 0,
  //             "code": 11000,
  //             "errmsg": "E11000 duplicate key error collection: tsfirst-project.academicdepartments index: name_1 dup key: { name: \"department of Computer Science\" }",
  //             "keyPattern": {
  //                 "name": 1
  //             },
  //             "keyValue": {
  //                 "name": "department of Computer Science"
  //             }
  //         },
  //         "index": 0,
  //         "code": 11000,
  //         "keyPattern": {
  //             "name": 1
  //         },
  //         "keyValue": {
  //             "name": "department of Computer Science"
  //         }
  //     },

  // duplicate key er nam ber kore anchi, jekono array ba obj er moddhe obj thakle seta theke specific index value ber korte hole Object.keys evabe ber korte hoy,যদি err?.keyValue undefined বা null হয়, তাহলে একটি empty object {} ব্যবহার করা হবে।

  const duplicatedField = Object.keys(err?.keyValue || {})[0] || "unknownField";
  // duplicate value ber kore anchi
  const duplicatedValue = err?.keyValue?.[duplicatedField] || "Unknown";

  const message = `Duplicate value for field "${duplicatedField}": "${duplicatedValue}"`;

  const errorSources: TErrorSource = [
    {
      path: duplicatedField,
      message: `${duplicatedValue} already exists`,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateError;
