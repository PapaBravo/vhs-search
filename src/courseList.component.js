import React from 'react'

function CourseList(props) {
  
  return (
    <div className="course-list">
      {props.courses.map(c =>
        <div className="course" key={c.guid}>
          <span>{c.title}</span>

        </div>
      )}
    </div>
  );
}

export default CourseList; 