import { Search } from "lucide-react";
import "../css/searchbar.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Searchbar = ({ value, onChange }: Props) => {
  return (
    <div className="search-container">
      <button type="button" className="search-button" style={{ backgroundColor: "#f2f2f2" }}>
        <Search className="search-icon" />
      </button>

      <input
        type="text"
        value={value}
        placeholder="Produkte durchsuchen..."
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default Searchbar;