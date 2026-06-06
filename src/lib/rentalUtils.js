import { rentals } from "../data/rentalData";

//filter to only rentals that have been returned
export function getReturnedRentals() {
    return rentals.filter(rental => rental.isReturned === true)
}
// console.log(getReturnedRentals())

// take a single rental and return a new object with a cost property added. Cost is daysRented * dailyRate.
//  Gold members get 20% off, silver members get 10% off, everyone else pays full price.
export function calculateRentalCost(rental) {
    let cost = rental.daysRented * rental.dailyRate;

    if (rental.membershipTier === 'gold') {
        cost = (cost * (1 - (20 / 100)))
    }

    if (rental.membershipTier === 'silver') {
        cost = (cost * (1 - 10 / 100))
    }

    return {
        id: rental.id, customer: rental.customer, movie: rental.movie, genre: rental.genre, daysRented: rental.daysRented,
        dailyRate: rental.dailyRate, cost: parseFloat(cost.toFixed(2)), isReturned: rental.isReturned,
        membershipTier: rental.membershipTier

    }
}
// console.log(calculateRentalCost(rentals[]))

// take an array of rentals and return the total cost across all of them
export function getTotalRevenue(rentals) {
    return rentals.reduce((sum, rental) => sum + calculateRentalCost(rental).cost, 0)


}
// console.log(getTotalRevenue(rentals))

// take a genre name and an array of rentals and return only rentals matching that genre
export function getGenreRentals(rentals, genre) {
    return rentals.filter(rental => rental.genre === genre)

}
// console.log(getGenreRentals(rentals, "Drama"))

//get returned rentals, apply costs, and return the total revenue, total returned count, most expensive rental,
//and the full list of returned rentals with their costs
export function getRentalReport() {
    const returnedRentals = getReturnedRentals();
    const totalRevenue = getTotalRevenue(returnedRentals);
    const returnedRentalsCount = returnedRentals.length;
    const returnedRentalsCostAdded = returnedRentals.map(rental => calculateRentalCost(rental));
    const mostExpensive = returnedRentalsCostAdded.reduce((most, rental) => {
        return rental.cost > most.cost ? rental : most;
    });

    return {
        totalRevenue: totalRevenue,
        totalReturnedCount: returnedRentalsCount,
        mostExpensiveRental: mostExpensive,
        fullList: returnedRentalsCostAdded
    }
}
// console.log(getRentalReport())

export function getGenreReport(genre) {
    const genreList = getGenreRentals(rentals, genre);
    const totalRev = getTotalRevenue(genreList);

    return {
        genreList: genreList,
        totalRevenue: totalRev
    }
}

