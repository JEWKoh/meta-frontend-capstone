import React from "react";
import "./TestimonialCard.scss";
import starIcon from "../assets/star.svg";

function TestimonialCard({ author, description, image, rating }) {
  return (
    <div className="testimonial-card" data-testid="testimonial-card">
      <div className="testimonial-card-rating">
        {rating &&
          [...Array(rating)].map((_, index) => (
            <img key={index} src={starIcon} alt="star" height={15} width={15} />
          ))}
      </div>

      <div className="testimonial-card-container">
        <img className="testimonial-card-profile-picture" src={image} alt="author" height={50}></img>
        <p className="testimonial-card-author">{author}</p>
      </div>
      <p className="testimonial-card-description">{description}</p>
    </div>
  );
};

export default TestimonialCard;