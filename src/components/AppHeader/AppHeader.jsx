import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'



function AppHeader (){

  const NavBar = (props) =>{
return(
    <div>
    <header>
       {props.children}
     </header>
   </div>
   );
}

const Menu  = (props) =>{
  return(
    <nav>
    {props.children}
  </nav>
  );
  }
 const MenuItem= (props) =>{
    return(
       
      /*<Button htmlType="button" type="primary" size="medium">{props.text}</Button>*/
  
      <a href='#'>{props.icon}{props.text}</a>
    
      
    );
  }

  return (
    <NavBar>
    <Menu>
    <MenuItem text="Конструктор" icon={<BurgerIcon type="primary"/>}/>
    <MenuItem text="Лента заказов" icon={ <ListIcon type="primary"/>}/>
    <Logo/>
    <MenuItem text="Личный кабинет" icon={<ProfileIcon type="primary"/>}/>
    </Menu>
   </NavBar>
  );
}


export default AppHeader
