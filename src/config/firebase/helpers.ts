import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytesResumable,
  uploadString,
  UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from ".";

interface UploadFileOptions {
  file?: any;
  dataUrl?: string;
  fileName?: string;
  storageDirectory?: string;
  progressHookFn?: ((progress: number) => void) | null;
  errorHookFn?: ((error: any) => void) | null;
  setUploadTask?: ((uploadTask: any) => void) | null;
}

export const applyUserFilter = (
  userId: any,
  query: { where: (arg0: string, arg1: string, arg2: any) => void },
  key = "userId"
) => {
  if (userId) {
    query.where(key, "==", userId);
  }
};

export const uploadFile = async ({
  file = "",
  dataUrl = "",
  fileName = "",
  storageDirectory = "files",
  progressHookFn = null,
  errorHookFn = null,
  setUploadTask = null,
}: UploadFileOptions): Promise<string> => {
  try {
    let uploadTask: Promise<unknown>;
    let fileRef: StorageReference;
    if (!dataUrl) {
      const filename = `${fileName || file.name}_${new Date().getTime()}`;
      fileRef = ref(storage, `/${storageDirectory}/${filename}/`);
      uploadTask = new Promise((resolve, reject) => {
        const task = uploadBytesResumable(fileRef, file);
        if (setUploadTask) {
          setUploadTask(uploadTask);
        }
        task.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            const progress = Math.ceil(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            switch (snapshot.state) {
              case "running":
                if (progressHookFn) {
                  progressHookFn(progress);
                }
                break;
              default:
                break;
            }
          },
          (error: any) => {
            if (errorHookFn) {
              errorHookFn(error);
            }
            reject(error);
          },
          () => {
            if (progressHookFn) {
              progressHookFn(100);
            }
          }
        );
        task.then(resolve).catch(reject);
      });
    } else {
      // todo: uploadString doesnt have $.on function
      fileRef = ref(storage, `${storageDirectory}/${fileName}/`);
      uploadTask = uploadString(fileRef, dataUrl, "data_url");
      if (setUploadTask) {
        setUploadTask(uploadTask);
      }
    }

    await uploadTask;
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
