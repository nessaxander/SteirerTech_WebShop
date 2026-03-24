import { useEffect, useState } from "react";
import type { IProduct } from "./types/IProduct.ts";
import {LoginPage} from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import {Navbar} from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/App.css'

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to load products");
              }
              return response.json();
            })
            .then((data: IProduct[]) => {
              setProducts(data);
              setLoading(false);
            })
            .catch((err: Error) => {
              setError(err.message);
              setLoading(false);
            });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

        return (
                <BrowserRouter>
                        <Navbar
                                search={search}
                                setSearch={setSearch}
                        />

                        <Routes>
                                <Route
                                        path="/"
                                        element={
                                                <MainPage search={search} products={products} />
                                        }
                                />
                                <Route path="/login" element={<LoginPage/>} />
                        </Routes>
                </BrowserRouter>
        );
}

export default App;