import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import Rating from '@mui/material/Rating';

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5, 
  };

  return (
    <div className="reviewCard">
      <PersonIcon xlassName='personIcon'/>
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
