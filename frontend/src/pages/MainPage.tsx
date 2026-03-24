import FilteredProducts from "../view/FilteredProducts.tsx";

import type {IProduct} from "../types/IProduct.ts";

type Props = {
  search: string;
  products : IProduct[];
};

const MainPage = ({ search,products }: Props) => {
  return (
    <FilteredProducts
      currentSearch={search}
      products={products}
    />
  );
};

export default MainPage;