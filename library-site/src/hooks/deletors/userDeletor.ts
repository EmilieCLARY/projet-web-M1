import axios from 'axios';

export const deleteUserById = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
    );
    console.log(response.data);
    window.location.href = '/users';
  } catch (error) {
    console.error(error);
    throw error;
  }
};
