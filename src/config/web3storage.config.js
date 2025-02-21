import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ 
  token: import.meta.env.VITE_WEB3_STORAGE_TOKEN 
});

export const uploadToWeb3Storage = async (file) => {
  try {
    const cid = await client.put([file]);
    return `https://${cid}.ipfs.w3s.link/${file.name}`;
  } catch (error) {
    console.error('Error uploading to Web3.Storage:', error);
    throw error;
  }
};

export const getFromWeb3Storage = async (cid) => {
  try {
    return `https://${cid}.ipfs.w3s.link/`;
  } catch (error) {
    console.error('Error getting from Web3.Storage:', error);
    throw error;
  }
}; 