import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uz_product_name: "",
    ru_product_name: "",
    en_product_name: "",
    uz_desc: "",
    ru_desc: "",
    en_desc: "",
    // category_id: null,
    // price: "",
    // barcode: "",
    // diametr: "",
    // ichki_diametr: "",
    // ichki_uzunlik: "",
    // tashqi_uzunlik: "",
    // razmer: "",
    // soni: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0); // Initialize with null or appropriate default value

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data.data);
        console.log(response.data.data);
        // toast.success("успешный");
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        toast.error("Не удалось загрузить категории");
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const val = event.target.value;
    const sVal = Number(val);
    setSelectedCategoryId(sVal);
    console.log("SVAL bu ", sVal);
    console.log("SVAL bu ", typeof sVal);
  };

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

    // if (
    //   formData.diametr == "" ||
    //   formData.ichki_diametr == "" ||
    //   formData.ichki_uzunlik == "" ||
    //   formData.tashqi_uzunlik == "" ||
    //   formData.razmer == "" ||
    //   formData.soni == "" ||
    //   (formData.diametr == "" &&
    //     formData.ichki_diametr == "" &&
    //     formData.ichki_uzunlik == "" &&
    //     formData.tashqi_uzunlik == "" &&
    //     formData.razmer == "" &&
    //     formData.soni == "")
    // ) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
    //   // formDataWithImage.append("price", formData.price);
    //   // formDataWithImage.append("barcode", formData.barcode);

      formDataWithImage.append("image", imageFile);
      formDataWithImage.append("category_id", selectedCategoryId);
    // } else {
    //   formDataWithImage.append("uz_product_name", formData.uz_product_name);
    //   formDataWithImage.append("ru_product_name", formData.ru_product_name);
    //   formDataWithImage.append("en_product_name", formData.en_product_name);
    //   formDataWithImage.append("uz_desc", formData.uz_desc);
    //   formDataWithImage.append("ru_desc", formData.ru_desc);
    //   formDataWithImage.append("en_desc", formData.en_desc);
    //   // formDataWithImage.append("price", formData.price);
    //   // formDataWithImage.append("barcode", formData.barcode);

    //   // formDataWithImage.append("diametr", formData.diametr);
    //   // formDataWithImage.append("ichki_diametr", formData.ichki_diametr);
    //   // formDataWithImage.append("ichki_uzunlik", formData.ichki_uzunlik);
    //   // formDataWithImage.append("tashqi_uzunlik", formData.tashqi_uzunlik);
    //   // formDataWithImage.append("razmer", formData.razmer);
    //   // formDataWithImage.append("soni", formData.soni);

    //   formDataWithImage.append("image", imageFile);
    //   formDataWithImage.append("category_id", selectedCategoryId);
    // }

    console.log(formData);

    try {
      setIsUploading(true);

      const response = await axios.post("/products", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data", // Use the correct content type
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Product added:", response.data.data);
      toast(response.data.message, { type: "success" });
      navigate("/products");
    } catch (error) {
      console.log("Error adding product:", error);

      if (error) {
        // console.log("Server Response Data:", error.response.data);
        // console.log("Status Code:", error.response.status);
        toast("Ошибка добавления продукта & Проверьте штрих-код", {
          type: "error",
        });
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
          <h2>Добавить новый продукт</h2>
          <Link to={`/products`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все продукты
          </Link>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="uz_product_name" className="form-label">
              Имя (узбекский) <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="uz_product_name"
              name="uz_product_name"
              value={formData.uz_product_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_product_name" className="form-label">
              Имя (Русский) <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="ru_product_name"
              name="ru_product_name"
              value={formData.ru_product_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_product_name" className="form-label">
              Имя (Английский) <span className="text-danger">Обязательно</span>{" "}
              :
            </label>
            <input
              type="text"
              id="en_product_name"
              name="en_product_name"
              value={formData.en_product_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="uz_desc" className="form-label">
              Информация (узбекский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <textarea
              id="uz_desc"
              name="uz_desc"
              value={formData.uz_desc}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_desc" className="form-label">
              Информация (русский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <textarea
              id="ru_desc"
              name="ru_desc"
              value={formData.ru_desc}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_desc" className="form-label">
              Информация (Английский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <textarea
              id="en_desc"
              name="en_desc"
              value={formData.en_desc}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category_id" className="form-label">
              Категории <span className="text-danger">Обязательно</span> :
            </label>
            <select
              id="category_id"
              name="category_id"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="form-control"
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.ru_category_name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Цена <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="barcode" className="form-label">
              Штрих-код <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="number"
              id="barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="diametr" className="form-label">
              Диаметр <span className="text-danger">Oбязательно</span> :
            </label>
            <input
              type="number"
              id="diametr"
              name="diametr"
              value={formData.diametr}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ichki_diametr" className="form-label">
              Внутренний диаметр{" "}
              <span className="text-danger">Необязательно</span>:
            </label>
            <input
              type="number"
              id="ichki_diametr"
              name="ichki_diametr"
              value={formData.ichki_diametr}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ichki_uzunlik" className="form-label">
              Внутренняя длина{" "}
              <span className="text-danger">Необязательно</span>:
            </label>
            <input
              type="number"
              id="ichki_uzunlik"
              name="ichki_uzunlik"
              value={formData.ichki_uzunlik}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tashqi_uzunlik" className="form-label">
              Внешняя длина <span className="text-danger">Необязательно</span>:
            </label>
            <input
              type="number"
              id="tashqi_uzunlik"
              name="tashqi_uzunlik"
              value={formData.tashqi_uzunlik}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="razmer" className="form-label">
              Размер <span className="text-danger">Необязательно</span>:
            </label>
            <input
              type="number"
              id="razmer"
              name="razmer"
              value={formData.razmer}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="soni" className="form-label">
              Номер <span className="text-danger">Необязательно</span> :
            </label>
            <input
              type="number"
              id="soni"
              name="soni"
              value={formData.soni}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div> */}

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение<span className="text-danger"> Oбязательно</span> :
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
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

export default ProductForm;
