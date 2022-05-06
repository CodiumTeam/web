import React from 'react';

function CourseCard({ title, description, list, imageUrl, buttonUrl }) {
  return (
    <article className="card card--large">
      <div className="card__header">
        <img
          width="200"
          height={180}
          loading="lazy"
          src={imageUrl}
          alt={title + 'illustration'}
          className="card__image"
        />
      </div>
      <p className="card__title">{title}</p>
      <p className="card__text">{description}</p>
      <div className="card__footer">
        <ul className="card__list">
          {list.map(function (item) {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <div>
          <a href={buttonUrl} className="button button--outline">
            Más información
          </a>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
