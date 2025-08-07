
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <article className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition duration-300 max-w-md mx-auto flex flex-col">
      <div className="relative">
        <img
          src={book.coverImage || "/placeholder.svg"}
          alt={`Cover of ${book.title}`}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full 
            ${book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {book.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600 italic">by {book.author}</p>
        <span className="inline-block text-xs text-blue-600 bg-blue-50 rounded px-2 py-1 w-fit">
          {book.category}
        </span>
        <p className="text-sm text-gray-700 ">{book.description}</p>
      </div>

      <div className="px-4 pb-4 mt-auto flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {book.availableCopies} of {book.totalCopies} available
        </span>
        <Link
          to={`/book/${book.id}`}
          className="text-blue-600 font-medium hover:underline"
          aria-label={`View details for ${book.title}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default BookCard;
