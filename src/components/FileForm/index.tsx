import styles from "./FileForm.module.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "..";
import { uploadFile } from "src/config/firebase/helpers";
import fileSize from "src/utils/fileSize";
import { truncate } from "src/utils/truncate";
import { toast } from "react-hot-toast";

interface FileFormProps {
  file: any;
  onStartUpload: () => void;
  onSuccess: (arg: any) => void;
  setProgress: (arg: any) => void;
  setUploadTask: (arg: any) => void;
  btnLabel: string;
}

export const FileForm: React.FC<FileFormProps> = ({
  btnLabel = "Upload Stamp",
  file,
  onStartUpload,
  onSuccess,
  setProgress,
  setUploadTask,
}) => {
  const [name, setName] = useState(file.name);
  // todo: come back to this 'any'
  const canUpload = useSelector((state: any) => state.user.canUpload);

  const handleUpload = async () => {
    try {
      if (!file) return;
      if (onStartUpload) {
        onStartUpload();
      }
      const uploadedUrl = await uploadFile({
        file,
        fileName: name,
        storageDirectory: "toptal",
        progressHookFn: setProgress,
        setUploadTask,
      });
      if (onSuccess) {
        onSuccess({
          documentId: new Date().getTime(),
          url: uploadedUrl,
          name,
          size: fileSize(file.size),
        });
      }
    } catch (error: any) {
      toast.error(error.message as string);
      console.log(error);
    }
  };
  return (
    <div className="w-100">
      <div
        className={`d-flex mb-3 w-100 align-items-center justify-content-start`}
      >
        <img
          className={styles.Image}
          src="https://image.shutterstock.com/image-vector/folder-icon-symbol-flat-style-260nw-1475533136.jpg"
        />
        <div className="d-flex flex-column">
          <span className={styles.FormTitle}>{truncate(name, 20, "...")}</span>
          <span className={styles.FormSubtitle}>{fileSize(file.size)} KB</span>
        </div>
      </div>
      <form className="d-flex flex-column">
        <Input
          value={name}
          onChange={(event: any) => setName(event.target.value)}
        />
        <Button
          className="mt-4 fw-little"
          label={btnLabel}
          disabled={!canUpload}
          handleClick={handleUpload}
        />
      </form>
    </div>
  );
};
