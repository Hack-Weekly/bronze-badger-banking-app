import { Link } from "react-router-dom";
import { menu } from "./menuItems.ts";
import "./menu.scss";

const Menu = () => {
  return (
    <div className="container">
      <div className="menu">
        <div className="name">
          <span>Banking App</span>
        </div>
        {menu.map((item) => (
          <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <span className="listItemTitle">{listItem.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Menu;
