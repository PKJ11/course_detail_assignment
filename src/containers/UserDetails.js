import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetails = ({ courses }) => {
  const { userId } = useParams();
  const [completedCourses, setCompletedCourses] = useState([]);

  const handleCompleteCourse = (courseId) => {
    if (!completedCourses.includes(courseId)) {
      setCompletedCourses([...completedCourses, courseId]);
    }
  };

  const userCourses = courses.filter((course) =>
    course.students.some((student) => student.id === parseInt(userId))
  );

  const renderList = userCourses.map((course) => {
    const { id, name, thumbnail, instructor, dueDate, students } = course;
    const student = students.find((student) => student.id === parseInt(userId));
    const isCourseCompleted = completedCourses.includes(id);

    let progressBarColor;
    let progressBarLength;
    let progress = 0;  // Initialize progress here

    if (isCourseCompleted) {
      progressBarColor = 'green';
      progressBarLength = '100%';
    } else {
      progress = student.progress;

      if (progress >= 0 && progress <= 33) {
        progressBarColor = 'red';
      } else if (progress >= 34 && progress <= 67) {
        progressBarColor = 'orange';
      } else {
        progressBarColor = 'green';
      }

      progressBarLength = `${progress}%`;
    }

    const progressBarStyle = {
      width: progressBarLength,
      background: progressBarColor,
      transition: 'width 0.5s',
    };

    return (
      <div key={id} style={{ marginRight: '10px', marginBottom: '10px' }}>
        <Link to={`/course/${id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={thumbnail} alt={name} />
              </div>
              <div className="content">
                <div className="header">{name}</div>
                <div className="meta">Instructor: {instructor}</div>
                <div className="meta">Due Date: {dueDate}</div>
                <h3 className="meta">Progress Bar</h3>
                <div className="ui indicating progress" data-percent={progress} style={{ marginBottom: '10px' }}>
                  <div className="bar" style={progressBarStyle}></div>
                </div>
                {isCourseCompleted && (
                  <h2 style={{fontSize:'18px'}}>Course Completed </h2>
                )}
              </div>
            </div>
          </div>
        </Link>
        <button
  onClick={() => handleCompleteCourse(id)}
  style={{
    marginTop: '20px',
    backgroundColor: 'rgba(0, 0, 255, 0.6)',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    border: 'none', // Remove border
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add box shadow
  }}
>
  Mark as Completed
</button>
      </div>
    );
  });

  return (
    <div className="ui grid container">
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>


  <div>
  {userCourses.length > 0 ? (
      <p>
        Courses taken by{' '}
        <span style={{ fontWeight: 'bold', color: 'red' }}>
          {userCourses[0].students.find((student) => student.id === parseInt(userId)).name}
        </span>
      </p>
    ) : (
      <p>No Courses</p>
    )}
  </div>


      </h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>{renderList}</div>
    </div>
  );
};

export default UserDetails;
