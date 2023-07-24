import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

export const CategoriesContext = createContext({
    products: [],
});

export const CategoriesProvider = ({ children }) => {
    // const [products, setProducts] = useState([PRODUCTS]);
    const [categoriesMap, setCategoriesMap] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
