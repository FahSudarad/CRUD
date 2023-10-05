import axios from "axios";
const API_BASE_URL = "https://65072edc3a38daf4803f369f.mockapi.io/CRUD";

export async function fetchAllUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error);
    throw error;
  }
}

export async function fetchUsersLimit({ page, limit }) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error);
    throw error;
  }
}

export async function fetchUserDataById(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ ID: ${userId}`, error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดในการลบผู้ใช้ ID: ${userId}`, error);
    throw error;
  }
}
export async function createUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}`, userData);
    return response.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้", error);
    throw error;
  }
}

export async function updateUser(userId, updatedUserData) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${userId}`,
      updatedUserData
    );
    return response.data;
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดในการแก้ไขผู้ใช้ ID: ${userId}`, error);
    throw error;
  }
}
