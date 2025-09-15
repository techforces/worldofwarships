import { useEffect, useRef, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import type { Vehicle } from "../../utils/queryTypes";
import VehicleItem from "./VehicleItem";

const BREAKPOINTS = {
  mobile: 0, // 1 col
  tablet: 767, // ≥640px => 2 cols
  desktop: 1281, // ≥1024px => 3 cols
};

function RowComponent({
  index,
  style,
  filteredData,
  columns,
  setItemIndex,
}: RowComponentProps<{
  columns: number;
  filteredData: Vehicle[];
  setItemIndex: (index: number) => void;
}>) {
  const items = [];

  for (let i = 0; i < columns; i++) {
    const idx = index * columns + i;

    items.push(
      filteredData[idx] && (
        <VehicleItem
          key={`r-${index}-c-${i}-item`}
          data={filteredData[idx]}
          index={idx}
          setItemIndex={setItemIndex}
        />
      )
    );
  }

  return (
    <div
      className={`vc-container-row grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5`}
      style={style}
    >
      {items}
    </div>
  );
}

const VirtualizedList = ({
  filteredData,
  setItemIndex,
}: {
  filteredData: Vehicle[];
  setItemIndex: (index: number) => void;
}) => {
  const [columns, setColumns] = useState(1);
  const [rowHeight, setRowHeight] = useState(385);
  const [parentRectTop, setParentRectTop] = useState(400);
  const vehicleListContainer = useRef<HTMLDivElement>(null);
  const dummy = useRef<HTMLDivElement>(null);

  // Фикс для ровного контейнера
  const setScrollbarWidth = () => {
    const el = vehicleListContainer.current?.querySelector(".vc-container");
    if (!el) return;
    const sb_width = el.offsetWidth - el.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      sb_width + "px"
    );
  };

  const getRowHeight = () => {
    return (dummy.current?.getBoundingClientRect().height as number) + 20;
  };

  const calculateColumns = () => {
    if (innerWidth > BREAKPOINTS.desktop) {
      setColumns(3);
    } else if (innerWidth > BREAKPOINTS.tablet) {
      setColumns(2);
    } else {
      setColumns(1);
    }

    setRowHeight(getRowHeight() as number);
  };

  useEffect(() => {
    dummy.current = document.querySelector(".vehicle-item--dummy");
    setScrollbarWidth();
    calculateColumns();
    setRowHeight(getRowHeight() as number);
    window.addEventListener("resize", calculateColumns);
    setParentRectTop(
      vehicleListContainer.current?.getBoundingClientRect().top as number
    );

    return () => {
      window.removeEventListener("resize", calculateColumns);
    };
  }, []);

  return (
    <div
      style={{
        height: `calc(100vh - ${parentRectTop}px)`,
      }}
      ref={vehicleListContainer}
    >
      <List
        className="vc-container"
        rowComponent={RowComponent}
        rowCount={Math.ceil(filteredData.length / columns)}
        rowHeight={rowHeight}
        rowProps={{ filteredData, setItemIndex, columns }}
      />
    </div>
  );
};

export default VirtualizedList;
