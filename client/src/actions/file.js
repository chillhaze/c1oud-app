import axios from "axios";
import { setFiles, addFile, deleteFileAction } from "../reducers/fileReducer";
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from "../reducers/uploadReducer";
import { hideLoader, showLoader } from "../reducers/appReducer";
import { API_URL } from "../config";
import { toast } from "react-hot-toast";

export function getFiles(dirId, sort) {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      let url = `${API_URL}/api/files`;
      if (dirId) {
        url = `${API_URL}/api/files?parent=${dirId}`;
      }
      if (sort) {
        url = `${API_URL}/api/files?sort=${sort}`;
      }
      if (dirId && sort) {
        url = `${API_URL}/api/files?parent=${dirId}&sort=${sort}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch(setFiles(response.data.files));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/files`,
        {
          name,
          type: "dir",
          parent: dirId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      dispatch(addFile(response.data));

      toast.success(`"${name}" created`);
    } catch (error) {
      console.log(error);
      toast.error(`"${name}" already exists`);
    }
  };
}

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      if (dirId) {
        formData.append("parent", dirId);
      }

      //add uploaded files to upload screen
      const uploadFile = { name: file.name, progress: 0, id: Date.now() };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));
      //----------------------------

      const response = await axios.post(
        `${API_URL}/api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          //отследить прогресс
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            // console.log("total", totalLength);
            if (totalLength) {
              uploadFile.progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              dispatch(changeUploadFile(uploadFile));
            }
          },
        }
      );

      dispatch(addFile(response.data));
      toast.success(`File uploaded`);
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
    }
  };
}

export async function downloadFile(file) {
  const response = await fetch(`${API_URL}/api/files/download?id=${file._id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (response.status === 200) {
    const blob = await response.blob();
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadURL;
    link.download = file.name;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export function deleteFile(file) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/files?id=${file._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      dispatch(deleteFileAction(file._id));
      toast.error(`Deleted!`);

      console.log(response.data.message);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(`${error.message}`);
    }
  };
}

export function searchFile(search) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/files/search?search=${search}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      dispatch(setFiles(response.data));
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}
