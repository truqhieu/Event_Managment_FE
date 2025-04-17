import LazyLoading from "./lazyLoading";

const wrapWithLazy = (Component) => (
  <LazyLoading>
    <Component />
  </LazyLoading>
);

export default wrapWithLazy;
