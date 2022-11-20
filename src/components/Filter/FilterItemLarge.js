import "./FilterItemLarge.css";

const FilterItemLarge = (props) => {
  return (
    <section className="filter-large">
      <p className="filter__left-notes">
        {props.leftItems.length >= 1 ? props.leftItems.length : "No"} items left
      </p>
      <div className="filter__wrapper">
        <p
          className={`filter__filter filter__all ${
            props.allItems && "filter__current"
          }`}
          onClick={props.setAllItemsHandler}
        >
          All
        </p>
        <p
          className={`filter__filter filter__active ${
            props.activeItems && "filter__current"
          }`}
          onClick={props.setActiveItemsHandler}
        >
          Active
        </p>
        <p
          className={`filter__filter filter__completed ${
            props.completedItems && "filter__current"
          }`}
          onClick={props.setCompletedItemsHandler}
        >
          Completed
        </p>
      </div>
      <p
        className="filter__clear-complete"
        onClick={props.clearCompletedHandler}
      >
        Clear completed
      </p>
    </section>
  );
};

export default FilterItemLarge;
