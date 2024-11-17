import { useState, useEffect } from "react";
import cartContext from "./cartContext";

export default function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const userEmailId = localStorage.getItem('email') || ".";
    const URL = `${import.meta.env.VITE_CURD_CURD}/cart${userEmailId.split(".").join("")}`;

    // Fetch cart data from the API when the component mounts
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // GET data from the API
                const response = await fetch(URL);
                const cartData = await response.json();
                
                setCartProducts(cartData.products || []);
                setTotal(cartData.totalItems || 0);
                setTotalPrice(cartData.totalPrice || 0);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, [URL]);

    const addToCart = async (product) => {
        // Check if the product is already in the cart
        const existingProduct = cartProducts.find((prod) => prod.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
            setCartProducts([...cartProducts]);
            setTotalPrice((prev) => prev + product.price);
            setTotal((prev) => prev + 1);

            // Update product quantity in the backend
            try {
                await fetch(`${URL}/update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        quantity: existingProduct.quantity,
                    }),
                });
            } catch (error) {
                console.error("Error updating product quantity:", error);
            }

            return;
        }

        const newProduct = {
            id: product.id,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1,
        };

        setTotal((prev) => prev + 1);
        setTotalPrice((prev) => prev + product.price);
        setCartProducts([...cartProducts, newProduct]);

        // Add new product to the backend
        try {
            await fetch(`${URL}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
        } catch (error) {
            console.error("Error adding product to the cart:", error);
        }
    };

    const removeFromCart = async (productId) => {
        const foundProduct = cartProducts.find((product) => product.id === productId);

        if (!foundProduct) return;

        setCartProducts(cartProducts.filter((product) => product.id !== productId));
        setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
        setTotal((prev) => prev - foundProduct.quantity);

        // Remove product from the backend
        try {
            await fetch(`${URL}/remove/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Error removing product from the cart:", error);
        }
    };

    return (
        <cartContext.Provider value={{ cartProducts, totalCartItems: total, totalPrice, addToCart, removeFromCart }}>
            {children}
        </cartContext.Provider>
    );
}
