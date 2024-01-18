import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedCourse,
  removeSelectedcourese,
} from "../redux/actions/courseActions";
import "./ProductPage.css";

const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const {
    thumbnail,
    name,
    enrollmentStatus,
    instructor,
    description,
    students,
    syllabus,
    prerequisites,
    duration,
    location,
    schedule,
  } = product;
  const dispatch = useDispatch();

  const fetchProductDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/courses/${id}`);
      dispatch(selectedCourse(response.data));
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedcourese());
    };
  }, [productId]);

  const [syllabusExpanded, setSyllabusExpanded] = useState(false);

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="ui placeholder segment">
            <div
              className="ui two column stackable center aligned grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: window.innerWidth <= 800 ? "row" : "column",
              }}
            >
              <div className="ui vertical divider">AND</div>
              <div className="middle aligned row">
                <div className="column lp" style={{ height: "100%" }}>
                  <img
                    className="ui fluid image"
                    src={thumbnail}
                    alt={name}
                    style={{ height: "100%" }}
                  />
                </div>
                <div className="column rp" style={{ height: "100%" }}>
                  <h1>{name}</h1>
                  <h2>
                    <a
                      className={`ui ${
                        enrollmentStatus === "Close"
                          ? "red"
                          : enrollmentStatus === "Open"
                          ? "teal"
                          : enrollmentStatus === "Inprogress"
                          ? "orange"
                          : ""
                      } tag label`}
                    >
                      {enrollmentStatus}
                    </a>
                    <span
                      style={{ marginLeft: "10px", fontSize: "medium" }}
                      className="ui brown block header"
                    >
                      Duration: {duration}
                    </span>
                  </h2>
                  <p style={{ marginBottom: "5px" }}>{location}</p>
                  <h3 className="ui brown block header">
                    Instructor: {instructor}
                  </h3>
                  <h3 className="ui brown block header"> {schedule}</h3>
                  <p style={{ fontSize: "small" }}>{description}</p>
                  <div className="ui vertical animated button" tabIndex="0">
                    <div className="hidden content">
                      <i className="icon address book outline"></i>
                    </div>
                    <div className="visible content">Enroll</div>
                  </div>
                  {prerequisites && prerequisites.length > 0 && (
                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <h2>Prerequisites</h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          marginTop: "20px",
                        }}
                      >
                        {prerequisites.map((prerequisite, index) => (
                          <button
                            key={index}
                            className="ui  button"
                            style={{
                              fontSize: "small",
                              marginBottom: "5px",
                              background: "rgba(0, 0, 255, 0.6)",
                              border: "none",
                              color: "white",
                            }}
                          >
                            {prerequisite}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {students && students.length > 0 && (
                    <div>
                      <h2>Students</h2>
                      <table className="ui celled table">
                        <thead>
                          <tr>
                            {/* <th>ID</th> */}
                            <th>Name</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr key={student.id}>
                              {/* <td>{student.id}</td> */}
                              <td>
                                <NavLink
                                  to={`/user/${student.id}`}
                                  activeClassName="active"
                                >
                                  {student.name}
                                </NavLink>
                              </td>
                              <td>{student.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#f0f0f0",
              padding: "10px",
              width: "100%",
              marginBottom: '40px'
            }}
          >
            <h2
              style={{
                cursor: "pointer",
                color: "blue",
              }}
              onClick={() => {
                setTimeout(() => setSyllabusExpanded(!syllabusExpanded), 500);
              }}
            >
              Syllabus
            </h2>
            {syllabusExpanded && (
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>Week</th>
                    <th>Topic</th>
                    <th>Content</th>
                  </tr>
                </thead>
                <tbody>
                  {syllabus.map((item) => (
                    <tr key={item.week}>
                      <td>{item.week}</td>
                      <td>{item.topic}</td>
                      <td>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px', width: '100%', marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', color: 'grey', fontSize: '25px' }}>
              Hope you will enjoy the course!
            </p>
          </div>
        </>
        
      )}
    </div>
  );
};

export default ProductDetails;
