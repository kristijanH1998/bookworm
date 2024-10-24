# BookWorm - Book Reading Application (Frontend)
BookWorm - full-stack solo project for Bay Valley Tech Code Academy

## Table of Contents
- [Description](#description)
- [How to Run the Project](#how-to-run-the-project)
- [How to Use the Project](#how-to-use-the-project)
- [Tests](#tests)
- [Documentation](#documentation)

## Description
#### Overview and Technologies used
* This is the first full-stack software project I developed independently on my own.
* Full-Stack book reading web application that lets users browse and select books from the Google Books digital database by communicating with Google Books API. 
* Searching of book records can be performed by three criteria: title, author name(s), and ISBN.
* BookWorm employs Google's Embedded Viewer API to display selected book's text on the screen for reading, within an Embedded Viewer window.
* The application also provides information about literary works from Google's database, and lets users perform CRUD operations on their profiles by updating their account data.
* Books can be placed into one or more of three categories: Favorites, Finished Reading, and Wishlist for future reading.
* The application maintains high level of security by employing hashed passwords (using bcrypt library), SQL injection prevention by means of name placeholders in SQL queries of requests sent from backend to the MySQL database, JWT token for user authentication, and other important security aspects.
* BookWorm's frontend was built on Arch Linux system in TypeScript, React.js, HTML5, CSS3, and Bootstrap, with help of tools like VS Code (for code editing), Figma (for wireframes), and Git (for software version control).
* The backend portion was developed in JavaScript using Node.js, Express.js, MySQL (MariaDB) and the tools utilized were VS Code, Postman (for backend testing), and Git on a Linux system.
* React Router is used on the frontend for page routing, Axios HTTP client library is used for sending REST API requests to the backend web server, while Google Books API receives requests from the backend, which backend receives from the frontend.
* The backend handles data transfer to and from the MySQL relational database managed with MySQL Workbench. Backend utilizes Express.js as server framework, bcrypt library for password hashing, CORS for application integration, JWT keys for authentication, and body-parser libary for HTTP request parsing.

#### Challenges faced during development
* A particularly challenging part of development was including Google Books Embedded API viewer canvas on the Search Books page: TypeScript compiler initially threw errors indicating it does not recognize 'google' in 'google.books.load();' with messages 'Cannot find name 'google'' and 'google.books.load is not a function', and other errors with 'google' object's associated functions and classes ('.books' class, 'load()' method, etc.). 
This issue was mitigated by adding the following lines: <br>
``` 
<script type="text/javascript" src="https://www.google.com/books/jsapi.js"></script></xmp>
```
in index.html, and:
```
declare var google: any; 
```
in Home.tsx; It is not enough to just write these lines of code in Home.tsx before calling 'google.books.load();':
```
const script = document.createElement('script');
script.src = "https://www.google.com/books/jsapi.js";
script.type = "text/javascript"
document.body.appendChild(script);
```
it was necessary to also include the jsapi.js script in the script tag in index.html, and have 'declare var google: any;' in Home.tsx, as shown above.

* Another issue happened in this segment of code in Home.tsx (Search books webpage):
```
          "useEffect(() => {
                  if(page >= 0) {
                      acquireJwt();
                      // console.log(searchPhrase)
                      axios
                          .get("http://localhost:3000/search-books", {
                            headers: {"authorization": "Bearer " + jwt}, 
                            params: {"search-terms": searchPhrase, criteria: searchPlaceholder, page: page * 10}})
                          .then((res) => {
                              if (res.data.success) {
                                  // console.log(res.data.data.items)
                                  // console.log(typeof res.data.data.items)
                                  setBookList(res.data.data.items)
                                  console.log(bookList)
                              } 
                          })
                          .catch((error) => {
                              console.log(error.response.data.error)
                          });
                  }
                  console.log(page)
               
              }, [page])" 
```        
This threw an error from the backend complaining about jwt key not being provided, 
because jwt key could not be fetched from local storage before /search-books endpoint is called, 
as it is called immediately on page load since page=0 right from the start. 
This made it impossible to send the /search-books request above whenever the condition page>=0 was 
true; it was only functional when page>0 condition was required, since by the time user
clicks on 'Next' button and increments value of page, jwt is already fetched from local storage and 
available, and endpoint request can be successful. This bug was fixed by including 'jwt' as 
condition in the if statement (like this: "if(jwt && page >= 0)"), since jwt was now first checked 
for value inside it and whether it was undefined before the /search-books endpoint request is sent.
#### Features to be implemented in the future

#### Motivation

#### Things I learned

## How to Run the Project
### Frontend Installation

## How to Use the Project

## Tests

## Documentation
