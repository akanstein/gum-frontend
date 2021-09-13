import { Modal, notification, Rate } from "antd";
import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { reviewProduct } from "../services";

const ReviewModalForm = ({ visible, onCancel, product, fetchProduct }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function inputChange(e) {
    setReview(e.target.value);
  }

  async function submitReview() {
    let data = {
      rating: rating,
      review: review,
    };
    setSubmitting(true);
    try {
      let review = await reviewProduct(product.id, data);
      if (review.status) notification.success({ message: "Review submitted" });
      onCancel();
      fetchProduct();
    } catch (error) {
      notification.error({ message: "Error", description: error.message });
    }
    setSubmitting(false);
  }

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      style={{
        borderRadius: "20px",
      }}
      wrapClassName="gm-mdl"
      footer={null}
    >
      {submitting && <Loader />}
      <div className="p-5">
        <h2 className="text-3xl font-bold mb-5">What's your rating</h2>
        <p className="mb-5 text-base">Rating</p>
        <Rate allowHalf onChange={(value) => setRating(value)} />
        <p className="my-5 text-base">Review</p>
        <input
          className="border-0 h-14 w-full focus:shadow rounded p-2 rev-inp"
          type="text"
          placeholder="Start typing..."
          onChange={inputChange}
        />
        <button
          onClick={submitReview}
          className="border p-2 px-4 rounded-md hover:shadow-md mt-5"
        >
          Submit Review
        </button>
      </div>
    </Modal>
  );
};

export default ReviewModalForm;
