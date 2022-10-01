import { CollegesList } from "../../Components/CollegesList/CollegesList";
import { Filters } from "../../Components/Filters/Filters";
import "./CollegesListPage.scss";

export const CollegesListPage = () => {
  return (
    <div className="collegesList">
      <div className="collegesList__inner">
        <Filters />
        <CollegesList />
      </div>
    </div>
  );
};
