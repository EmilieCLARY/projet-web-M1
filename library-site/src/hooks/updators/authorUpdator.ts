import axios from 'axios';

export const updateAuthorById = async (id: string): Promise<void> => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
    );
    console.log(response.data);
    window.location.href = `/authors/${id}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
