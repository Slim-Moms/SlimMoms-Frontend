import React from "react";
import { useNavigate } from "react-router-dom";
import "./DailyCalorieIntake.css";

export default function DailyCalorieIntake({ data }) {
  const navigate = useNavigate();

  if (!data || !data.dailyRate) {
    return (
      <div className="intake_modal_content">
        <h2 className="modal_title">
          Calculations in progress...
        </h2>
      </div>
    );
  }

  const { dailyRate, notAllowedProducts } = data;

  const handleRegisterClick = () => {
    navigate("/registration");
  };

  return (
    <div className="intake_modal_content">
      <h2 className="modal_title">
        Your recommended daily calorie intake is
      </h2>

      <div className="calories_display">
        <span className="calories_number">
          {Math.round(dailyRate)}
        </span>
        <span className="calories_unit">
          kcal
        </span>
      </div>

      <div className="forbidden_foods">
        <h3>
          Foods you should not eat
        </h3>
        <ol>
          {notAllowedProducts && notAllowedProducts.length > 0 ? (
            notAllowedProducts.slice(0, 5).map((product, index) => (
              <li key={index}>
                {product}
              </li>
            ))
          ) : (
            <li>No specific restrictions.</li>
          )}
        </ol>
      </div>

      <button
        type="button"
        className="orange_btn"
        onClick={handleRegisterClick}
      >
        Start losing weight
      </button>
    </div>
  );
}
