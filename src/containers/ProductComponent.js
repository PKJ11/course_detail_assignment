import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductComponent = ({ products }) => {
  const [likesMap, setLikesMap] = useState({});

  const handleLikeClick = async (id) => {
    try {
      const isCurrentlyLiked = likesMap[id] || false;

      const response = await fetch(`http://localhost:5000/courses/${id}/like`, {
        method: isCurrentlyLiked ? "DELETE" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikesMap((prevLikesMap) => ({
          ...prevLikesMap,
          [id]: !isCurrentlyLiked,
        }));
        // You can update other state or perform additional actions here
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const renderList = products.map((product) => {
    const { id, name, thumbnail, description, enrollmentStatus, likes: initialLikes } = product;
    const isLiked = likesMap[id] || false;

    return (
      <div className="four wide column" key={id} style={{ minWidth: '280px' }}>
        <div className="ui link cards">
          <div className="card">
            <div className="image">
              <img src={thumbnail} alt={name} />
            </div>
            <div className="content">
              <Link to={`/course/${id}`}>
                <div className="header">{name}</div>
                <div className="price"> {description}</div>
                
              </Link>
              <div className="meta" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <div className="meta">{enrollmentStatus}</div>
                <div>
                  <i
                    className={`heart icon ${isLiked ? 'red' : 'grey'}`}
                    onClick={() => handleLikeClick(id)}
                    style={{marginRight:'15px'}}
                  ></i>
                  {isLiked ? initialLikes + 1 : initialLikes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default ProductComponent;
