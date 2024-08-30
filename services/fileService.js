import { createFileRecord, fetchFiles } from "../repo/fileRepo.js";

export const saveFileRecord = async (fileData) => {
  try {
    console.log("saveFileRecord service started");
    return await createFileRecord(fileData);
    console.log("saveFileRecord service ended");
  } catch (error) {
    throw new Error("Error saving file record: " + error.message);
  }
};

export const fetchAllFiles = async () => {
  try {
    console.log("fetchAllFiles service started");
    return await fetchFiles();
    console.log("fetchAllFiles service ended");
  } catch (error) {
    throw new Error("Error fetching files: " + error.message);
  }
};
