import FileOperations from '../models/fileOperations.js';

export const createFileRecord = async (fileData) => {
  try {
    return await FileOperations.create(fileData);
  } catch (error) {
    throw new Error('Error creating file record: ' + error.message);
  }
};

export const fetchFiles = async () => {
  try {
    return await FileOperations.findAll();
  } catch (error) {
    throw new Error('Error listing files: ' + error.message);
  }
};
