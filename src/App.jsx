import { Routes, Route } from "react-router-dom";
import Redirect from "./Components/Redirect.jsx";
import Contact from "./Pages/Contact.jsx";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Oferta from "./Pages/Oferta.jsx";
import ProductForm from "./Components/newProduct.jsx";
import ProductsList from "./Pages/Products.jsx";
import EditProduct from "./Components/editProduct.jsx";
import CategoriesForm from "./Components/newCategories.jsx";
import CategoriesList from "./Pages/Categories.jsx";
import CategoryDetailsList from "./Pages/CategoryDetails.jsx";
import MoreInfo from "./Pages/ProductDetails.jsx";
import EditCategories from "./Components/editCategories.jsx";
import News from "./Pages/News.jsx";

import Prays from "./Pages/Prays.jsx";
import CreatePrays from "./Components/createPrays.jsx";
import Praysdetails from "./Components/PraysDetails.jsx";
import EditPrays from "./Components/EditPrays.jsx";
// import createNews from "./Components/createNews.jsx";
import CreateNews from "./Components/createNews.jsx";
import Newsdetails from "./Components/NewsDetails.jsx";
import EditNews from "./Components/EditNews.jsx";
import Dealers from "./Pages/Dealers.jsx";
import CreateDealers from "./Components/CreateDealers.jsx";
import EditDealers from "./Components/EditDealers.jsx";
import EditAdmin from "./Components/editAdmin.jsx";

import DealerDetails from "./Components/DealerDetails.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<MoreInfo />} />
        <Route path="/createProduct" element={<ProductForm />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />

        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/categories/:id" element={<CategoryDetailsList />} />
        <Route path="/createCategory" element={<CategoriesForm />} />
        <Route path="/editCategories/:id" element={<EditCategories />} />

        <Route path="/news" element={<News />} />
        <Route path="/createNews" element={<CreateNews />} />
        <Route path="/news/:id" element={<Newsdetails />} />
        <Route path="/editNews/:id" element={<EditNews />} />

        <Route path="/prays" element={<Prays />} />
        <Route path="/createPrays" element={<CreatePrays />} />
        <Route path="/prays/:id" element={<Praysdetails />} />
        <Route path="/editPrays/:id" element={<EditPrays />} />

        <Route path="/dealers" element={<Dealers />} />
        <Route path="/createDealers" element={<CreateDealers />} />
        <Route path="/dealers/:id" element={<DealerDetails />} />
        <Route path="/editDealers/:id" element={<EditDealers />} />

        <Route path="/editAdmin" element={<EditAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/public-offer" element={<Oferta />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default App;
