import axios from "axios";
import { useEffect, useState } from "react";

const usePostData = (url, postedData) => {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post(url, postedData);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [url, postedData]);

  return { data, loading, error };
};

export default usePostData;
