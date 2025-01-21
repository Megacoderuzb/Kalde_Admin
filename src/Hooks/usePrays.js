import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;

    async function getNews() {
      try {
        setLoading(true);

        const res = await axios.get("/prays");
        if (unmounted) return;
        console.log(res.status === 200);
        if (res.status === 200) setNews(res.data);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getNews();

    return () => {
      unmounted = true;
    };
  }, []);

  async function deleteNews(id) {
    try {
      const options = {
        method: "DELETE",
        url: `/prays/${id}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const res = await axios(options);
      if (res.status === 200) {
        // Remove the deleted category from the News state
        setNews((prevNews) =>
          prevNews.filter((category) => category.id !== id)
        );

        toast.info("Прайс удалена");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return [news, loading, deleteNews];
}

export default useNews;
