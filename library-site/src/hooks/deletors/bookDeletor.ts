import axios from 'axios';

export const deleteBookById = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
    );
    console.log(response.data);
    window.location.href = '/books';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBookFromAuthorById = async (idBook: string, idAuthor: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${idBook}`,
    );
    console.log(response.data);
    window.location.href = `${idAuthor}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
