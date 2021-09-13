import { notification, Rate } from "antd";
import React, { useCallback, useState, useEffect } from "react";
import Loader from "../../components/Loader";
import ReviewModalForm from "./components/ReviewModalForm";
import { getProduct } from "./services";

const Product = () => {
  const [product, setProduct] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      let res = await getProduct();
      setProduct(res.data);
    } catch (error) {
      notification.error({ message: "Error", description: error.message });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className=" p-10 pt-20">
        <div className="w-full prd-container mx-auto text-left">
          <h2 className="text-3xl">{product?.name}</h2>
          <div className="flex items-center justify-between w-full border-b pb-10 mb-8">
            <div className="flex">
              <p className="text-2xl font-bold mr-3">
                {product.overallRating || 0}
              </p>
              <Rate
                disabled
                allowHalf
                value={Number(product.overallRating || 0)}
              />
            </div>
            <button
              onClick={() => setShowReviewForm(true)}
              className="border p-2 px-4 rounded hover:shadow-md"
            >
              Add Review
            </button>
          </div>
          <div>
            <p className="font-bold text-2xl mb-5">Reviews</p>
            {product.reviews && product.reviews.length ? (
              product.reviews.map((item, i) => (
                <div key={i} className="flex items-center mb-3">
                  <Rate disabled allowHalf value={Number(item.rating)} />
                  <p className="font-bold text-sm ml-4">{item.rating},</p>
                  <p className="text-gray-400 text-sm ml-1">{item.review}</p>
                </div>
              ))
            ) : (
              <div className="">
                <p className="text-gray-400 text-sm">
                  No reviews for this product
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <Loader />}
      {showReviewForm && (
        <ReviewModalForm
          visible={showReviewForm}
          onCancel={() => setShowReviewForm(false)}
          product={product}
          fetchProduct={fetchProduct}
        />
      )}
    </div>
  );
};

export default Product;
