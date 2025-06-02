import axios from 'axios';
import getErrorMessage from './error';

const baseUrl = 'https://sol-stru-server.vercel.app';
// const baseUrl = 'http://localhost:3000';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

async function login(loginData) {
  try {
    const response = await api.post(`${baseUrl}/api/auth/login`, loginData);
    const { message, success, role} = response.data;
    if (success) {
      return { message, success, role };
    }
    throw new Error(message);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return { message, success: false };
  }
}

async function logout() {
  try {
    const response = await api.post(`${baseUrl}/api/auth/logout`);
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

async function getRefreshToken() {
  try {
    const response = await api.post(`${baseUrl}/api/auth/refresh-token`);
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

async function getStatusAuth() {
  try {
    const response = await api.get(`${baseUrl}/api/auth/status`);
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

async function getUserAuth() {
  try {
    const response = await api.get(`${baseUrl}/api/me`);
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function getUserById(id) {
  try {
    const response = await api.get(`${baseUrl}/api/users/${id}`);
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}
  
async function addProjek(addProjekData) {
  try {
    const response = await api.post(`${baseUrl}/api/project`, addProjekData);
    const { message, success, data} = response.data;
    if (success) {
      return { message, success, data};
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function deleteProjek(id) {
  try {
    const response = await api.delete(`${baseUrl}/api/project/${id}`);
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
    const response = await api.patch(`${baseUrl}/api/project/${pjid}`, editProjekData);
    const { message, success, data} = response.data;
    if (success) {
      return { message, success, data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function register(registerData) {
  try {
    const response = await api.post(`${baseUrl}/api/auth/register`, registerData);
    const { message, success, data} = response.data;
    if (success) {
      return { message, success, data};
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function addUser(addUserData) {
  try {
    const response = await api.post(`${baseUrl}/api/users`, addUserData);
    const { message, success, data} = response.data;
    if (success) {
      return { message, success, data};
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function deleteUser(id) {
  try {
    const response = await api.delete(`${baseUrl}/api/users/${id}`);
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

async function editUser(editedUser, id) {
  try {
    const response = await api.patch(`${baseUrl}/api/users/${id}`, editedUser);
    const { message, success, data} = response.data;
    if (success) {
      return { message, success, data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function editPesanan(editPesananData, psid) {
  try {
    const response = await api.patch(`${baseUrl}/api/order/${psid}`, editPesananData);
    const { message, success, data} = response.data;
    if (success) {
      return { message, success, data};
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

async function addPesanan(addPesananData) {
    try {
      const response = await api.post(`${baseUrl}/api/order`, addPesananData);
      const { message, success, data} = response.data;
      if (success) {
        return { message, success, data };
      }
      throw new Error(message);
    } catch (error) {
      const message = getErrorMessage(error);
      return { message, success: false };
    }
}

async function deletePesanan(id) {
  try {
    const response = await api.delete(`${baseUrl}/api/order/${id}`);
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
    const response = await api.get(`${baseUrl}/api/project`);
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
    const response = await api.get(`${baseUrl}/api/project/${id}`);
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
    const response = await api.get(`${baseUrl}/api/order`);
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

async function getAllNotification() {
  try {
    const response = await api.get(`${baseUrl}/api/notification`);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, notifications: data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

// POST buat notifikasi baru
async function createNotification(newData) {
  try {
    const response = await api.post(`${baseUrl}/api/notification/add`, newData);
    const { message, success, data } = response.data;
    if (success) {
      return { message, success, notification: data };
    }
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { message, success: false };
  }
}

// PATCH tandai notifikasi sebagai dibaca
async function markNotificationAsRead(id) {
  try {
    const response = await api.patch(`${baseUrl}/api/notification/${id}/baca`);
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

async function markAllNotificationsAsRead() {
  try {
    const response = await api.patch(`${baseUrl}/api/notification/baca`, {
      id: null, // trigger backend untuk tandai semua berdasarkan uid
    });
    const { message, success } = response.data;
    if (success) return { success, message };
    throw new Error(message);
  } catch (error) {
    const message = getErrorMessage(error);
    return { success: false, message };
  }
}

// DELETE hapus notifikasi
async function deleteNotification(id) {
  try {
    const response = await api.delete(`${baseUrl}/api/notification/${id}`);
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

export{
    getAllProjek,
    getDetailProjek,
    addPesanan,
    addProjek,
    editProjek,
    addUser,
    editUser,
    deleteUser,
    editPesanan,
    deletePesanan,
    deleteProjek,
    getAllPesanan,
    login,
    logout,
    getRefreshToken,
    getStatusAuth,
    getUserAuth,
    getUserById,
    getAllNotification,
    createNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    register,
}