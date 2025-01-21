import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Praysdetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});

  useEffect(() => {
    axios
      .get(`/prays`)
      .then((response) => {
        console.log(id);
        console.log(response.data);
        let newsData = response.data.filter((e) => {
          console.log(e, "e");

          if (e.id == id) return e;
        });
        console.log(newsData[0], "newsdata");
        setNews(newsData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch(`http://localhost:6000/news/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => setnews(data.data));
  }, [id]); // Include 'id' in the dependency array to re-fetch when id changes
  console.log(news, "state");
  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 mb-5">
          <div className="col-12 h-100 pt-5">
            <div className="card overflow-hidden" aria-hidden="true">
              <a
                href={news.image_url}
                // alt={News.image_url}
                className="card-image-top placeholder-card-image"
              >
                LINK
              </a>

              <div className="card-body">
                <div className="card-text">
                  <h5 className="news-description my-3">ID : {news.id}</h5>
                </div>
                <h3 className="card-title text-truncate">
                  Имя : {news.title_ru}
                </h3>

                <div className="d-flex g-3 row">
                  <p className="text-secondary ">Описание: {news.desc_ru}</p>
                  <div className="col-6 d-flex justify-content-between">
                    {/* <h6 className="fs-2">{news.category}</h6> */}
                  </div>
                  <div className="col-6"></div>
                </div>
              </div>
            </div>

            <Link
              to={"/prays"}
              className="btn btn-primary w-25 d-flex justify-content-center m-auto fs-6 mt-5"
            >
              <i className="fa-solid fa-arrow-left d-flex justify-content-center m-1"></i>{" "}
              назад
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Praysdetails;
