import { useState,React } from "react";
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

// eslint-disable-next-line react/prop-types
const PaginationComp = ({ currentPage, amountItem = 6, totalItem, setCurrentPage, itemsPerPage }) => {
    const totalPage = Math.ceil(totalItem / itemsPerPage )

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const items = [];
    for (let number = 1; number <= totalPage; number++) {
        if (number >= currentPage 
            && number < ( amountItem - 1 + currentPage) 
            && totalPage > amountItem) {
            items.push(
                <Pagination.Item key={number} onClick={() => setCurrentPage(number)} active={number === currentPage}>
                  {number}
                </Pagination.Item>,
            );
        } else if(totalPage <= amountItem) {
            items.push(
                <Pagination.Item key={number} onClick={() => setCurrentPage(number)} active={number === currentPage}>
                  {number}
                </Pagination.Item>,
            );
        }
    }

    return (
        <div>
            <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)}/>
                <Pagination.Prev onClick={handlePrevClick}/>
                {
                    items.map(item => (
                       item
                   ))
                }
                {
                    totalItem > amountItem && (
                        <>
                        <Pagination.Ellipsis />
                        <Pagination.Item onClick={() => setCurrentPage(totalPage)}>{totalPage}</Pagination.Item>
                        </>
                    )
                }
                <Pagination.Next onClick={handleNextClick}/>
                <Pagination.Last onClick={() => setCurrentPage(totalPage)}/>
            </Pagination>
        </div>
    );
};

export default PaginationComp;

// PaginationNoti.propTypes = {
//     items: PropTypes.arrayOf(PropTypes.string).isRequired,
//     itemsPerPage: PropTypes.number.isRequired,
// };