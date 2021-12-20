let URL;

if (process.env.NODE_ENV !== 'production') {
  URL = 'http://localhost:5000/';
} else {
  URL = '';
}

export const checkLogin = async () => {
  const token = await localStorage.getItem('TOKEN');
  if (token === '' || token === null) {
    return false;
  }

  return true;
};

export const BASE_URL = URL;
