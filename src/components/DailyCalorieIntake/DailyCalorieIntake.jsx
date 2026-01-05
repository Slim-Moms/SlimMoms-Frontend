import React from "react";
import "./DailyCalorieIntake.css";

export default function DailyCalorieIntake({ data }) {
  // Veri yoksa bileşeni render etme
  if (!data) return null;

  // Dinamik hesaplama: Formdan gelen veriler kullanılıyor
  const { height, age, currentWeight } = data;

  // Yönerge: Dinamik veri görüntülemeyi gerçekleştir
  const calories = Math.round(10 * currentWeight + 6.25 * height - 5 * age + 5);

  return (
    <div className="intake_modal_content">
      <h2 className="modal_title">Your daily calorie intake should be</h2>

      <div className="calories_display">
        <span className="calories_number">{calories}</span>
        <span className="calories_unit"> kcal</span>
      </div>

      <div className="forbidden_foods">
        <h3>Foods you should not eat</h3>
        {/* Görseldeki gibi sıralı liste yapısı */}
        <ol>
          <li>Flour products</li>
          <li>Milk</li>
          <li>Red meat</li>
          <li>Smoked meats</li>
        </ol>
      </div>

      {/* Görseldeki turuncu buton */}
      <button type="button" className="orange_btn">
        Start losing weight
      </button>
    </div>
  );
}
