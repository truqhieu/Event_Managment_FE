import { Suspense } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";

export default function LazyLoading({ children }) {
  return (
    <Suspense fallback={<div className="loading-center" style={{ height: "100vh" }}><Spin /></div>}>
      {children}
    </Suspense>
  );
}

LazyLoading.propTypes = {
  children: PropTypes.node.isRequired,
};
