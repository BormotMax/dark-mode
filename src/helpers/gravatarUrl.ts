import md5 from 'md5';
import axios from 'axios';

export const getGravatarImage = async (email: string): Promise<null | Blob> => {
  try {
    const checkedEmail = email ? email.trim().toLowerCase() : '';
    const response = await axios.get<Blob>(
      `https://www.gravatar.com/avatar/${md5(checkedEmail)}?d=404`,
      { responseType: 'blob' },
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
