export type TErrorSource = {
  // duplicate error e 11000 emn ashe tai or diye number set hoyeche
  path: string | number;
  message: string;
  //একাধিক error object রাখতে পারবেন [] er moddhe
}[];
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
