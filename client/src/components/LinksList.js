import React    from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => links.length > 0 ? (
  <table>
    <thead>
    <tr>
      <th>ID</th>
      <th>Оригинальная ссылка</th>
      <th>Сокращенная ссылка</th>
      <th>Просмотров</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    {links.map(({ _id, from, to, views }) => (
      <tr key={_id}>
        <td>{_id}</td>
        <td>{to}</td>
        <td>{from}</td>
        <td>{views}</td>
        <td>
          <Link to={`/detail/${_id}`}>Открыть</Link>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
) : <p className="center">Ссылок пока нет</p>