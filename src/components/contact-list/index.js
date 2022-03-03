import React, { memo } from "react";
import "./index.css";
import PropTypes from "prop-types";

const ContactList = (props) => {
  const { contacts, searchText, onClickContact, activeContact } = props;
  const filteredObj = {};

  const mapData = (prevData) => {
    if (prevData && prevData.length > 0) {
      let sortedData = prevData
        .filter((el) => el.isActive === true)
        .sort(function compare(a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });

      if (searchText) {
        sortedData = sortedData.filter((el) =>
          `${el.firstName} ${el.middleName} ${el.lastName}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      }

      sortedData.forEach((el) => {
        const firstChar = el.firstName.toLowerCase().charAt(0);
        if (filteredObj[firstChar]) {
          filteredObj[firstChar] = [...filteredObj[firstChar], el.id];
        } else {
          filteredObj[firstChar] = [el.id];
        }
      });

      const mappedData = Object.keys(filteredObj).map((el) => {
        return {
          category: el.toUpperCase(),
          data: sortedData.filter((it) =>
            filteredObj[el.toLowerCase()].includes(it.id)
          ),
        };
      });
      return mappedData;
    }
  };
  return (
    <div className="list-menu">
      {contacts.length>0 ? mapData(contacts).map((el, index) => {
        return (
          <div className="text-a" key={`out-${index}`}>
            <h5 className="text-white text-sm text-left">{el.category}</h5>
            <ul className="text-left px-0">
              {el.data.map((item) => (
                <li key={`in-${item.id}`}>
                  <span
                  className={`text-white text-left cursor-pointer mb-2 d-flex ${activeContact?.id === item.id
                    ? "text-warning"
                    : ""}`}
                    onClick={() => {
                      onClickContact(item.id);
                    }}
                  >
                    {item.firstName}{" "}
                    {item?.middleName ? `${item?.middleName.charAt(0)}.` : ""}{" "}
                    {item.lastName}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      }) :<div>
          <h1>No data Found</h1>
        </div>}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  searchText: PropTypes.string,
  onClickContact: PropTypes.func,
  activeContact: PropTypes.object,
};
export default memo(ContactList);
