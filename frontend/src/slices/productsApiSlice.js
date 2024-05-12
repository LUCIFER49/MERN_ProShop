import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  // any endpoint with products will be here
  endpoints: (builder) => ({

    // For All Product
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    // For Single Product
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // For creating a Product in database
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    })
  }),
});

// How to export a Query for fetching data
export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation } = productsApiSlice;
