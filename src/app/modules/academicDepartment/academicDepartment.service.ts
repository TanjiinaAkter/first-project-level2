import { TAcademicDepertment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepertment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getASingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id });
  return result;
};
const updateASingleAcademicDepartmentIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDepertment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    {
      _id: id,
    },
    payLoad,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getASingleAcademicDepartmentFromDB,
  updateASingleAcademicDepartmentIntoDB,
};
