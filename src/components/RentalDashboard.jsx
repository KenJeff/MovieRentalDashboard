import { getRentalReport, getGenreReport } from "../lib/rentalUtils";

export default function RentalDashboard() {
  const totalReturnedRentals = getRentalReport().totalReturnedCount;
  const totalRevenue = getRentalReport().totalRevenue;
  const mostExpMovie = getRentalReport().mostExpensiveRental.movie;
  const expMovieCustomer = getRentalReport().mostExpensiveRental.customer;
  const returnedRentals = getRentalReport().fullList;
  ////////stretttch
  const sciRentals = getGenreReport("Sci-Fi").genreList.length;
  const sciRevenue = getGenreReport("Sci-Fi").totalRevenue;

  const actRentals = getGenreReport("Action").genreList.length;
  const actRevenue = getGenreReport("Action").totalRevenue;

  return (
    <div className="container mt-4">
      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4 ">
          <div className="card text-center shadow-sm h-100 ">
            <div className="card-body d-flex flex-column justify-content-center">
              <p className="text-muted mb-1 align-items-center justify-content-center">
                # of Returned Rentals
              </p>
              <h3 className="fw-bold">{totalReturnedRentals}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <p className="text-muted mb-1">Total Revenue</p>
              <h3 className="fw-bold">${totalRevenue}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <p className="text-muted mb-1">Most Expensive Movie</p>
              <h3 className="fw-bold">{mostExpMovie}</h3>
              <p className="text-muted mb-1">Bought By </p>
              <h3 className="fw-bold">{expMovieCustomer}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Returned Rentals</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Movie</th>
                <th>Genre</th>
                <th>Days Rented</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {returnedRentals.map((rental) => {
                return (
                  <tr key={rental.id}>
                    <td>{rental.customer}</td>
                    <td>{rental.movie}</td>
                    <td>{rental.genre}</td>
                    <td>{rental.daysRented}</td>
                    <td>${rental.cost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/*Stretch Goal */}
      <div className="row g-3 mb-4 mt-4">
        <div className="col-md-6">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h2>Sci-Fi Report</h2>
              <p className="text-muted mb-1">Sci-Fi Rentals</p>
              <h3 className="fw-bold">{sciRentals}</h3>
              <p className="text-muted mb-1">Sci-Fi Revenue </p>
              <h3 className="fw-bold">${sciRevenue}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h2>Action Report</h2>
              <p className="text-muted mb-1">Action Rentals</p>
              <h3 className="fw-bold">{actRentals}</h3>
              <p className="text-muted mb-1">Action Revenue </p>
              <h3 className="fw-bold">${actRevenue}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
