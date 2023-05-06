import React, { useEffect, useState } from "react";
import checklistData from "./checklist-data.json";

interface IItem {
  label: string;
  isChecked: boolean;
  subItems: ISubItem[];
}
interface ISubItem {
  label: string;
  isChecked: boolean;
}

const TheChecklist: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("checklist-items");
    const parsedItems =
      storedItems != null
        ? (JSON.parse(storedItems) as IItem[])
        : checklistData;
    setItems(parsedItems);
  }, []);

  const toggleParent = (index: number): void => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isChecked: !item.isChecked,
          subItems: item.subItems.map((subItem) => ({
            ...subItem,
            isChecked: !item.isChecked
          }))
        };
      }
      return item;
    });

    setItems(updatedItems);
    localStorage.setItem("checklist-items", JSON.stringify(updatedItems));
  };

  const toggleSubItem = (parentIndex: number, subItemIndex: number): void => {
    const updatedItems = items.map((item, i) => {
      if (i === parentIndex) {
        const updatedSubItems = item.subItems.map((subItem, j) => {
          if (j === subItemIndex) {
            return {
              ...subItem,
              isChecked: !subItem.isChecked
            };
          }
          return subItem;
        });

        const allSubItemsChecked = updatedSubItems.every(
          (subItem) => subItem.isChecked
        );

        return {
          ...item,
          isChecked: allSubItemsChecked,
          subItems: updatedSubItems
        };
      }
      return item;
    });

    setItems(updatedItems);
    localStorage.setItem("checklist-items", JSON.stringify(updatedItems));
  };

  return (
    <ul className="checklist-container">
      {items.map((item, index) => (
        <li
          key={index}
          className={
            item.isChecked
              ? "checklist-parent-item checked-list"
              : "checklist-parent-item"
          }>
          <label>
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => {
                toggleParent(index);
              }}
            />
            {item.label}
          </label>

          <ul>
            {item.subItems.map((subItem, subIndex) => (
              <li
                key={subIndex}
                className={
                  subItem.isChecked
                    ? "checklist-child-item checked-list"
                    : "checklist-child-item"
                }>
                {" "}
                <label>
                  <input
                    type="checkbox"
                    checked={subItem.isChecked}
                    onChange={() => {
                      toggleSubItem(index, subIndex);
                    }}
                  />
                  {subItem.label}
                </label>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default TheChecklist;
