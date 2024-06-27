import { useState,React } from "react";
import Button from 'react-bootstrap/Button';

export const PaginationNoti = ({ items, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <button
                key={number}
                id={number}
                onClick={handleClick}
                className={currentPage === number ? 'active' : ''}
            >
                {number}
            </button>
        ));
    };

    const convertTime = (isoDateString) => {
        const date = new Date(isoDateString);

        // Convert the date to ICT (Indochina Time) and format it
        const options = {
            timeZone: 'Asia/Bangkok', hour12: false,
            year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        };
        const ictDateStr = date.toLocaleString('en-US', options);

        return ictDateStr;
    }

    return (
        <div>
            <div className="w-screen px-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems && currentItems.map((log, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{convertTime(log.created_at)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{log.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"> {log.content}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">  {log.level}</td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <ul>


                </ul>



            </div>
            <div className="flex justify-center gap-3">

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"  onClick={handlePrevClick} disabled={currentPage === 1}>
                Prev
            </button>
            {renderPageNumbers()}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleNextClick} disabled={currentPage === totalPages}>
                Next
            </button>
            </div>
        </div>
    );
};

// PaginationNoti.propTypes = {
//     items: PropTypes.arrayOf(PropTypes.string).isRequired,
//     itemsPerPage: PropTypes.number.isRequired,
// };