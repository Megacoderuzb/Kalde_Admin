import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";

const CreatePrays = () => {
  const [formData, setFormData] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    desc_uz: "",
    desc_ru: "",
    desc_en: "",
  });
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      toast.error("Вы должны выбрать картинку.", { type: "error" });
      return;
    }

    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }

    formDataWithImage.append("image", imageFile);

    try {
      setIsUploading(true);

      const response = await axios.post("/prays", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("news added:", response.data.data);
      toast("добавлена", { type: "success" });
      navigate("/prays");
    } catch (error) {
      console.log("Error adding prs:", error.message);
      //   toast(error.message, { type: "error" });

      if (error.message) {
        console.log("Server Response Data:", error.response.data);
        console.log("Status Code:", error.response.status);
        toast("Ошибка добавления Прайс", { type: "error" });
      }
      if (
        error.message ==
        'Произошла ошибка error: insert into "images" ("filename", "image_url") values ($1, $2) returning "id", "image_url", "filename" - duplicate key value violates unique constraint "images_filename_unique"'
      ) {
        toast("Изображение с таким названием уже загружено", { type: "error" });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Добавить Прайс </h2>
          <Link to={`/prays`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все Прайс
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Заголовок (узбекский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="title_uz"
              // value={formData.title_uz}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Заголовок (Русский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="title_ru"
              // value={formData.title_ru}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Заголовок (Английский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="en_category_name"
              name="title_en"
              // value={formData.title_en}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Oписание (узбекский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="desc_uz"
              placeholder="1- yanvar, 2025"
              // value={formData.desc_uz}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Oписание (Русский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="desc_ru"
              placeholder="1 января 2025 г."
              // value={formData.desc_ru}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Oписание (Английский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="en_category_name"
              name="desc_en"
              placeholder="January 1, 2025"
              // value={formData.desc_en}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение<span className="text-danger"> Необязательно</span> :
            </label>
            <input
              type="file"
              id="image"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
              onChange={handleImageChange}
              className="form-control"
              required
            />
          </div>
          <div>
            {isUploading && <p>Загрузка, пожалуйста подождите ....</p>}
            <button
              type="submit" // Changed to type="submit"
              className="btn btn-primary mb-5 col-3 me-1"
              disabled={isUploading}
            >
              Добавлять
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePrays;
