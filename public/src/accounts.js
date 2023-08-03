function findAccountById(accounts=[], id="") {
  //returns account obj with matching ID
  
  //use find function on accounts array to return the account object whose ID matches the given ID
  return accounts.find(({id:accountId})=>accountId === id);
}

function sortAccountsByLastName(accounts=[]) {
  //Use sort method on accounts. 
    //Pass in a callback function that sorts the objects alphabetically by last name using the name: last property
  accounts.sort((elemA,elemB)=>{
    const lastNameA = elemA.name.last;
    const lastNameB = elemB.name.last;
    
    return lastNameA < lastNameB ? -1 : 1;
  });
  
  //return accounts
  return accounts;
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  //use reduce method to iterate through books array to search through all book objects. 
    //Checks if the given account id is in currBook iteration's borrows property values.
    const totalNum = books.reduce((acc, bookObj)=>{
        const currBorrows = bookObj.borrows;
        
        //iterate through currBooks's borrows and check if some borrow is the givenAccounts'id
        const hasBorrowed = currBorrows.some((borrowerObj)=>{
              return borrowerObj.id === account.id;
            });
        
        //If a match is found, the totalNum var should increment ++.
        if (hasBorrowed) {
          return acc + 1;
        } else {
          return acc;
        }
    }, 0);

  //return totalNum var
  return totalNum;
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  //filter books that the given account currently has in posession ()
  const booksPossessed = books.filter((currBook)=>{
      const currBorrows = currBook.borrows;
      //iterate through currBook's borrows and if some id matches the account AND return is false, then add to filtered book list
      let inPosession = currBorrows.some((borrowObj)=>{
        return borrowObj.id === account.id && borrowObj.returned === false;
      });
      return inPosession;  
  });
  
  //after filtering, create new books array to include the author obj nested inside it. 
  const newBooksArray =[];

  //loop through each book, correctly format it, and add to newBooksArray
  booksPossessed.forEach((book)=>{
    //deconstruct book obj
    const {id, title, genre, authorId, borrows} = book;
    //get author object
    const author = authors.find((authorObj)=>{
      return authorObj.id === authorId;
    });
    
    //combine book and author obj using rest
    const newBookObj = 
    {
      id, 
      title, 
      genre,
      author,
      borrows
    }
    newBooksArray.push(newBookObj)
  });

  //return array of book objs. 
  return newBooksArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
