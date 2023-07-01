import { applyUserFilter } from "../config/firebase/helpers";
import api from "../config/axios";
import { STAMPS } from "../config/firebase/collections";
import { read, save } from "src/config/firebase";

export const stampDocument = (payload: any) => {
  return api.post(``, payload);
};

export const saveStamp = (payload: { [x: string]: any; uid?: any }) => {
  return save(STAMPS, payload);
};

// export const getStamps = async (userId: any, key = "userId") => {
//   let query = db.collection(STAMPS);
//   applyUserFilter(userId, query, key);
//   const res: any[] = [];
//   await query
//     .get()
//     .then((querySnapshot: any[]) =>
//       querySnapshot.forEach((doc) => res.push(doc.data()))
//     );
//   return res;
// };

export const getStorageUsage = async (userId: string) => {
  const stamps = await read(STAMPS);
  console.log(`stamps`, stamps);
  return stamps.reduce((total, curr) => total + curr.size, 0);
};
