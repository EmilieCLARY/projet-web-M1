import axios from 'axios';
import { AuthorModel } from '@/models';

type CreateAuthorProvider = {
  author: AuthorModel;
};

// Async pour pouvoir utiliser await
export const createNewAuthor = async (
  author: AuthorModel,
): Promise<CreateAuthorProvider> => {
  try {
    // Await for the API response before continuing
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
    });

    window.location.href = '/authors';

    return { author };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
