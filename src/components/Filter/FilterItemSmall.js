import "./FilterItemSmall.css";

const FilterItemSmall = (props) => {
  return (
    <section className="filter-small">
      <div className="filter-small__wrapper_1">
        <p className="filter-small__left-notes">
          {props.leftItems.length >= 1 ? props.leftItems.length : "No"} items
          left
        </p>
        <p
          className="filter-small__clear-complete"
          onClick={props.clearCompletedHandler}
        >
          Clear completed
        </p>
      </div>

      <div className="filter-small__wrapper_2">
        <p
          className={`filter-small__filter filter__all ${
            props.allItems && "filter__current"
          }`}
          onClick={props.setAllItemsHandler}
        >
          All
        </p>
        <p
          className={`filter-small__filter filter__active ${
            props.activeItems && "filter__current"
          }`}
          onClick={props.setActiveItemsHandler}
        >
          Active
        </p>
        <p
          className={`filter-small__filter filter__completed ${
            props.completedItems && "filter__current"
          }`}
          onClick={props.setCompletedItemsHandler}
        >
          Completed
        </p>
      </div>
    </section>
  );
};

export default FilterItemSmall;
