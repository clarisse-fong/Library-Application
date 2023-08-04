// const { partitionBooksByBorrowedStatus, findAuthorById } = require("./books");

function getTotalBooksCount(books=[]) {
  return books.length;
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length;
}

function getBooksBorrowedCount(books=[]) {
  // use the partitionBooksByBorrowedStatus() function to get the two arrays: [checkedOutBooks, returnedBooks]
  //return length of the checkedOutBooks Length
  const [checkedOutBooks] = partitionBooksByBorrowedStatus(books);
  return checkedOutBooks.length;

}

function getMostCommonGenres(books=[]) {
  //use a lookup object to store genres so you avoid duplicates 
  const lookupGenres = {};

  //iterate through each book in the books array. do:
  for ({genre} of books) { 
    //check in the lookup object if the curr book genre exists
    //if it exists, increase the count by 1
    if (lookupGenres[genre]){
      lookupGenres[genre]++
      // if not, create a new key-value pair with the genre as the name and the value being 1
    } else {
      lookupGenres[genre] = 1;
    }
  }
  
  //move the genres in lookup to an array

  const genreArray = [];

  for (genreObj in lookupGenres) {
    genreArray.push(
      {
        name: genreObj,
        count: lookupGenres[genreObj]
      })
  }
  
  //sort the genre array by most common --> least
  
  const top5Genres = getTop5(genreArray);
  //return array 
  return top5Genres
      // [
      //   { name: "Nonfiction", count: 9 },
      //   { name: "Historical Fiction", count: 7 },
      //   { name: "Thriller", count: 7 },
      //   ...
      // ]
}

function getMostPopularBooks(books=[]) {
  //use getBooksByCount helper function to get an arry with each book's name, count, and author
  // const booksByCountAndAuthor = getBooksByCountAndAuthor(books);

  const booksByCountAndAuthor = [];

  for (bookObj of books) {
    //add book to array with count using .length
    const newBookObj = {name: bookObj.title, count: bookObj.borrows.length, authorId: bookObj.authorId}
    booksByCountAndAuthor.push(newBookObj);
    }
  
  //isolate booksByCountAndAuthor to just books (don't need author property
  const booksByCount = booksByCountAndAuthor.map(({name, count})=>{
    return {name, count}
  });
  
  return getTop5(booksByCount);  
  /*
  [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/
}

function getMostPopularAuthors(books=[], authors=[]) {
  //create var to hold onto authorname and total ammount of borrows an tuhor has
  const authorLookup = {};
  
  //get the title, borrows, and authorId  property from the books array
  for ({title, borrows, authorId} of books) {
    //match the authorID from books array to author name in authors array
    const {name: {first, last}} = findAuthorById(authors, authorId);
    //once author is found, correctly format it
    const authorName = `${first} ${last}`
    //NAME FORMAT NEEDED: "Chrystal Lester"
    
    //if author doesn't exist in lookup
    if (!authorLookup[authorName]){
      authorLookup[authorName] = borrows.length;
      //else add the book count to the author
    } else {
      //create a new object in author lookup: with author name and set book count to bookObj.count
      //{ "Cristina Buchanan": 112 }
      authorLookup[authorName] += borrows.length;
    }
        
  }

  const popularAuthors = [];
  //move objects from authorLookup into an array
  for (authorObj in authorLookup){
    popularAuthors.push({name: authorObj, count: authorLookup[authorObj]});
  }

  //use getTop5 helper method to get top 5 authors from authors array
  const top5Authors = getTop5(popularAuthors);
  
  return top5Authors
  
  //return array with top 5 authors
    //   *
    //   [
    //     { name: "Cristina Buchanan", count: 112 },
    //     { name: "Tami Hurst", count: 83 },
    //     { name: "Chrystal Lester", count: 80 },
    //     ...
    //   ]
    // */
}

function getTop5(counts = []){
  counts.sort((objA, objB)=>objA.count >= objB.count ? -1 : 1);
  //slice the array to 5 or less
  if (counts.length >5) counts = counts.slice(0,5);
  return counts;
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  getTop5,
};
