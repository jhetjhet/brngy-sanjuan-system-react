import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const items = [...Array(3).keys()];

function Pagination({ currPage, pageCount, onChange, itemsPerPage }) { //currPage, pageCount, onChange, maxLinkCount

    return (
        <ReactPaginate
            nextLabel="next >"
            onPageChange={onChange}
            // forcePage={currPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            className="flex font-semibold mb-4"
            pageClassName=""
            pageLinkClassName="block border px-4 py-2 hover:border-broom-500 focus:ring-4 focus:ring-broom-400"
            previousClassName=""
            previousLinkClassName="block border px-4 py-2 hover:border-broom-500 focus:ring-4 focus:ring-broom-400"
            nextClassName=""
            nextLinkClassName="block border px-4 py-2 hover:border-broom-500 focus:ring-4 focus:ring-broom-400"
            breakLabel="..."
            breakClassName=""
            breakLinkClassName="block border px-4 py-2 hover:border-broom-500 focus:ring-4 focus:ring-broom-400"
            containerClassName=""
            activeClassName="bg-broom-200"
            renderOnZeroPageCount={null}
        />
    );
}

Pagination.defaultProps = {
    currPage: 1,
    itemsPerPage: 5,
    onChange: () => {},
}

Pagination.propTypes = {
    currPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    onChange: PropTypes.func,
    pageCount: PropTypes.number.isRequired,
}

export default Pagination;