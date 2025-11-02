import { TAcademicDepertment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepertment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  // ei model er ref model er sob data pete department model er ref part er property nam populate e add korte hobe
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getASingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    "academicFaculty",
  );
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
