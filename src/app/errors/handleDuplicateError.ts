import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;

  //value ber kore anchi extract kore double quotes theke regex diye
  const match = err.message.match(/"([^"]*)"/);
  console.log(match);
  // ekhane match console e array dey tai extractedMessage niyechi
  //   [
  //   '"department of Computer Science"',
  //   'department of Computer Science',
  //   index: 106,
  //   input: 'E11000 duplicate key error collection: tsfirst-project.academicdepartments index: name_1 dup key: { name: "department of Computer Science" }',
  //   groups: undefined
  // ]

  const extractedMessage = match?.[1] ?? "Unknown";
  const errorSources: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleDuplicateError;
