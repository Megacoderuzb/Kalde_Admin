import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillEdit,
  AiFillEye,
  AiFillDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import useNews from "../Hooks/usePrays";

const PraysCards = () => {
  const [news, loading, deleteNews] = useNews();

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить эту Прайс?")) {
        await deleteNews(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(loading);
  if (loading) {
    return <div>Загрузка ...</div>;
  }
  if (!news || !Array.isArray(news) || news.length === 0) {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2>Прайс пока нет</h2>
          <Link to={`/createPrays`} className="btn btn-primary col-2 me-1">
            <AiOutlinePlus /> Добавить Прайс
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="d-flex justify-content-between">
        <h2>Прайс</h2>
        <Link to={`/createPrays`} className="btn btn-primary col-2 me-1">
          <AiOutlinePlus />
          Добавить Прайс
        </Link>
      </div>
      {news.map((News) => (
        <div key={News.id} className="w-25">
          <div className="card overflow-hidden" aria-hidden="true">
            <div className="card-body">
              <p className="card-text">
                ID :{News.id}
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-danger">Имя : {News.title_ru}</span>
                </span>
                <span className="d-flex justify-content-between align-items-center">
                  <p className="text-secondary">Описание: {News.title_ru}</p>
                </span>
                <a
                  style={{ textDecoration: "none" }}
                  href={News.image_url}
                  alt={News.image_url}
                  className="card-text pb-4"
                >
                  LINK
                </a>
              </p>
              <div className="d-flex g-3">
                <Link
                  to={`/editPrays/${News.id}`}
                  className="btn btn-warning col-4 me-1"
                >
                  <AiFillEdit />
                </Link>
                {/* <Link
                  to={`/prays/${News.id}`}
                  className="btn btn-primary col-4 me-1"
                >
                  <AiFillEye />
                </Link> */}
                <button
                  onClick={() => {
                    handleDelete(News.id);
                  }}
                  className="btn btn-danger col-4 me-1"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PraysCards;
