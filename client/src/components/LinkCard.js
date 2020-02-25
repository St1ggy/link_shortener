import React from 'react'

export const LinkCard = ({ link: { to, from, views, date } }) => (
  <>
    <h2>Ссылка</h2>
    <p>Ваша ссылка: <a href={to} target="_blank" rel="noopener noreferrer">{to}</a></p>
    <p>Сокращенная ссылка: <a href={from} target="_blank" rel="noopener noreferrer">{from}</a></p>
    <p>Количество просмотров: <strong>{views}</strong></p>
    <p>Дата создания: <strong>{new Date(date).toLocaleDateString()}</strong></p>
  </>
)