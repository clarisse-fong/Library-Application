function findAuthorById(authors=[], id=0) {
  return authors.find(({id: authorId})=>authorId === id);
}

function findBookById(books=[], id="") {
  const foundBook = books.find(({id: bookId})=> bookId === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books=[]) {
  //create two arrays: checkedOutBooks, returnedBooks
  const checkedOutBooks = [];
  const returnedBooks = [];

  //iterate through books array
  books.forEach((bookObj)=>{
    //access the 1st element of the borrows array. 
    //If returned === false, push the book to the checkedOutBooks array
    //Else, push the book to returnedBooks array
    const returned = bookObj.borrows[0].returned;
    if (!returned){
      checkedOutBooks.push(bookObj);
    } else {
      returnedBooks.push(bookObj)
    }
  });

  //returns [[],[]]
  return[checkedOutBooks, returnedBooks];

}

function getBorrowersForBook(book={}, accounts=[]) {
  // identify the 10(or less) most recent borrows
  const numBorrows = book.borrows.length;
  let totalBorrows = 10
  if (numBorrows < 10) {
    totalBorrows = numBorrows;
  }
  
  //create new array obj
  const bookBorrowers = [];

  // for loop: loop through each borrowObj borrows array, 
  for (let iterator = 0; iterator < totalBorrows; iterator++) {
    //find the borrow obj
    const currBorrowObj = book.borrows[iterator];
    
    //find the accountObj for the curr person borrowing
    const borrowerAccount = accounts.find((accountObj)=>accountObj.id === currBorrowObj.id);
    
    //combine currBorrowObj and account Obj using rest, then add to new Array
    bookBorrowers.push(  
    {...currBorrowObj, ...borrowerAccount}
    )
  }
  //return new array  
  return bookBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
