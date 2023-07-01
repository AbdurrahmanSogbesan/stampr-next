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
    let uploadTask;
    if (!dataUrl) {
      const filename = `${fileName || file.name}_${new Date().getTime()}`;
      uploadTask = storage
        .ref()
        .child(`/${storageDirectory}/${filename}/`)
        .put(file);
    } else {
      uploadTask = storage
        .ref()
        .child(`/${storageDirectory}/${fileName}/`)
        .putString(dataUrl, "data_url");
    }
    if (setUploadTask) {
      setUploadTask(uploadTask);
    }

    uploadTask.on(
      "state_changed",
      (snapshot: {
        bytesTransferred: number;
        totalBytes: number;
        state: any;
      }) => {
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
        Promise.reject(error);
      },
      () => {
        if (progressHookFn) {
          progressHookFn(100);
        }
      }
    );
    await uploadTask;
    const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
    return downloadUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
