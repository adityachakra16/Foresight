// Import React and Next.js Link component
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the Item type for menu and submenu items
type Item = {
  label: string | React.ReactNode;
  onClick?: () => void;
  href?: string;
  selected?: boolean;
  endcomponent?: React.ReactNode;
  submenuItems?: Item[];
  submenuComponent?: React.ReactNode;
  submenuLocation?: "left" | "right" | "top" | "bottom";
  submenuAlignment?: "start" | "end" | "center";
};

// Define props for the MenuItem component
interface MenuItemProps {
  item: Item;
  hovered: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// MenuItem component
const MenuItem = ({
  item,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: MenuItemProps) => {
  const {
    label,
    onClick,
    href,
    selected,
    endcomponent,
    submenuItems,
    submenuComponent,
    submenuLocation = "right",
    submenuAlignment = "start",
  } = item;

  let submenuContent = null;
  if (submenuItems && submenuItems.length > 0) {
    submenuContent = submenuItems.map((subItem, index) => (
      <li
        className={`submenu-item ${index === 0 ? "first-item" : ""} ${
          index === submenuItems.length - 1 ? "last-item" : ""
        }  `}
        key={index}
        onClick={subItem.onClick}
      >
        {subItem.label}
      </li>
    ));
  } else if (submenuComponent) {
    submenuContent = submenuComponent;
  }

  let menuItemContent = (
    <li
      className={`menu-item 
    `}
      style={{
        backgroundColor: selected
          ? "rgba(97, 96, 97, 0.3)"
          : hovered
          ? "rgba(97, 96, 97, 0.1)"
          : "transparent",
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`menu-item-content ${
          endcomponent ? "menu-item-with-end" : ""
        }`}
      >
        {label}
        {endcomponent && <span className="menu-item-end">{endcomponent}</span>}
      </div>

      {submenuContent && (
        <div
          className={`submenu-container submenu-${submenuLocation} submenu-align-${submenuAlignment}`}
        >
          {submenuContent}
        </div>
      )}
    </li>
  );

  if (href) {
    menuItemContent = <Link href={href}>{menuItemContent}</Link>;
  }

  return menuItemContent;
};

// Define props for the Menu component
interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: Item[];
  sections?: {
    title: string;
    items: Item[];
  }[];
  initIndex?: number | null;
}

// Menu component with support for both sectioned and non-sectioned menus
const Menu = ({ items, sections, initIndex = null }: MenuProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(initIndex);
  const renderMenuItems = (items: Item[]) =>
    items.map((item, itemIndex) => (
      <MenuItem
        key={itemIndex}
        item={item}
        hovered={hoveredIndex === itemIndex}
        onMouseEnter={() => setHoveredIndex(itemIndex)}
        onMouseLeave={() => setHoveredIndex(null)}
      />
    ));

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (hoveredIndex !== null) {
          const item = items[hoveredIndex];
          if (item.onClick) {
            item.onClick();
          }
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (hoveredIndex === null) {
          setHoveredIndex(0);
        } else if (hoveredIndex < items.length - 1) {
          setHoveredIndex(hoveredIndex + 1);
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (hoveredIndex === null) {
          setHoveredIndex(0);
        } else if (hoveredIndex > 0) {
          setHoveredIndex(hoveredIndex - 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [hoveredIndex, items]);

  // Check if sections are provided
  if (sections && sections.length > 0) {
    return (
      <ul className="menu-container">
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <li className="section-header">{section.title}</li>
            {renderMenuItems(section.items)}
          </React.Fragment>
        ))}
      </ul>
    );
  }

  // Fallback to rendering a flat list of items if no sections are provided
  return <ul className="menu-container">{renderMenuItems(items)}</ul>;
};

export default Menu;
