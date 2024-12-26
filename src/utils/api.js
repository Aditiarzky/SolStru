import axios from 'axios';
import getErrorMessage from './error';

const baseUrl = 'https://sol-stru-server.vercel.app';


async function login(loginData) {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, loginData);
      const { message, success, data } = response.data;
      if (success) {
        return { message, success, token: data.token };
      }
      throw new Error(message);
    } catch (error) {
      const message = getErrorMessage(error);
      return { message, success: false };
    }
  }

async function addProjek(addProjekData) {
  try {
    const response = await axios.post(`${baseUrl}/api/projek`, addProjekData);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function deleteProjek(id) {
  try {
    const response = await axios.delete(`${baseUrl}/api/projek/${id}`);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function editProjek(editProjekData, pjid) {
  try {
    const response = await axios.put(`${baseUrl}/api/pesanan/${pjid}`, editProjekData);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}
async function editPesanan(editPesananData, psid) {
  try {
    const response = await axios.put(`${baseUrl}/api/pesanan/${psid}`, editPesananData);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function addPesanan(addPesananData) {
    try {
      const response = await axios.post(`${baseUrl}/api/pesanan`, addPesananData);
      const { message, success } = response.data;
      if (success) {
        return { message, success };
      }
      throw new Error(message);
    } catch (error) {
      const message = getErrorMessage(error);
      return { message, success: false };
    }
}

async function deletePesanan(id) {
  try {
    const response = await axios.delete(`${baseUrl}/api/pesanan/${id}`);
    const { message, success } = response.data;
    if (success) {
      return { message, success };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}


async function getAllProjek() {
  try {
    const response = await axios.get(`${baseUrl}/api/projek`);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, projek: data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function getDetailProjek(id) {
  try {
    const response = await axios.get(`${baseUrl}/api/projek/${id}`);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, projek: data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function getAllPesanan() {
  try {
    const response = await axios.get(`${baseUrl}/api/pesanan`);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, pesanan: data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

export{
    getAllProjek,
    getDetailProjek,
    addPesanan,
    addProjek,
    editProjek,
    editPesanan,
    deletePesanan,
    deleteProjek,
    getAllPesanan,
    login,

}