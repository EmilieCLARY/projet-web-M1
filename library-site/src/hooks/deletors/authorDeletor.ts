import axios from 'axios';

export const deleteAuthorById = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
    );
    console.log(response.data);
    window.location.href = '/authors';
  } catch (error) {
    console.error(error);
    throw error;
  }
};
