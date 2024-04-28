import React, { useState } from 'react';
import listaMenu from '../utils/menu.json';
import CardMenu from '../components/CardMenu';

const Menu = () => {
  const [listadoMenu, setListadoMenu] = useState(listaMenu.meriendas);

  return (
    <div className='container mt-4'>
      <div className="row d-flex justify-content-center">
        {listadoMenu.map(item => (
          <CardMenu key={item.id} item={item} />
        ))}
      </div>
    </div >
  );
}

export default Menu;
