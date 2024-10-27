# BookWorm - Book Reading Application (Frontend)
BookWorm - full-stack solo project for Bay Valley Tech Code Academy

## Table of Contents
- [Description](#description)
- [How to Run the Project](#how-to-run-the-project)
- [How to Use the Project](#how-to-use-the-project)
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
        useEffect(() => {
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
        }, [page]) 
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

* Another obstacle was when GET HTTP requests worked normally, but POST HTTP requests would send 
authorization error saying the authorization header content was undefined. This was fixed by 
following rules for POST request type, stating that Authorization header must come after the 
data parameter, unlike in GET type requests.

#### Future Work
* Due to OpenAI API not offering free tier for developers, I decided to abandon my original idea of implementing an AI feature that would answer user's questions about a text they are reading. If I find an AI query API that is offered for free or simply requires an API key to process requests, I will try to implement such a feature in the future.
* BookWorm should have a forum page where users can leave their comments on books they read and give them a rating. This was also part of my original idea for the app, but due to time constraints I had to postpone it for future development.
* A notebook window could be implemented on the Home (Search Books) page, with a button next to the Embedded Viewer that would open a modal for the user to write their notes into while reading the book. Although part of the original functional outline, this feature was never attempted, even though it could be somewhat easily implemented with Bootstrap elements.

#### Motivation
* I decided to create this application to get more hands-on experience in full-stack 
software development, to explore the capabilities of integrating external (third-party) APIs
into my own applications, and to finish the Bay Valley Tech Code Academy learning path on which
I embarked in October 2023, with hopes of eventually obtaining a full-stack software development 
certificate. I saw this as a milestone which, once achieved, would enrich my CV and potentially 
kick-start my professional software engineering career.

#### Things I Learned
* Work on this app has taught me how much time and effort is required to build a full-stack
software project from ground up on one's own, without help from others. I had to be designer, developer,
engineer, database administrator, tester, and my own supervisor in order to bring this project to 
completion.

* I learned how stark a difference there can be between initial software project plans, functional 
outlines and design ideas, and actual implementation and practical realization of those plans, that is, the finished product.
BookWorm was according to my starting expectations supposed to incorporate OpenAI API feature which would answer
user's questions about books they are reading, a forum for users where they can share their opinions on books, 
and other elements which have not been implemented due to time constraints. Some day I might revisit this
project and include all those extra elements into it.

* Decision to build software in technologies and tools that require more technical considerations and
higher expertise should be made carefully. At a certain point of this project I decided to transform the 
frontend code from JavaScript to TypeScript, so to increase my knowledge of TypeScript development. I ended
up having to address a lot of data type issues with function parameters and React component props, and some
difficult to solve bugs which slowed the project down. But I think that learning a new skill is very
important in the start of one's career, and challenges should be welcomed, not feared.

## How to Run the Project
* ***Important:*** Please first follow installation instructions for the Backend part of this project, which can be found [here](https://github.com/kristijanH1998/bookworm-backend?tab=readme-ov-file#how-to-run-the-project). Once that is completed, proceed to Frontend installation steps described below.

### Frontend Installation
Assuming that all the steps for installing the environment for Backend part of BookWorm have been finished, the user should already have VS Code, Node.js, Git, and extensions for HTML/CSS/JavaScript installed on their machine, as well as MySQL (or MariaDB) and MySQL Workbench. Next, follow these steps:
1. Choose the location (directory) for the project's frontend repository, navigate to it with 'cd [directory-name]' terminal command and inside of it clone the project's frontend repository by running the command 'git clone https://github.com/kristijanH1998/bookworm.git' in your terminal
2. Open the newly cloned repository folder in VS Code and open the Bash shell (terminal). Navigate to 'BookWorm' folder by running 'cd BookWorm' in your terminal
3. Type and run the command 'npm i' to install all necessary packages (including software for Vite and React.js)
4. If you have not already started running the server for the Backend part of the project, do that now by opening Backend repository in another VS Code window (with its own Bash terminal instance), and run it by typing 'nodemon index.cjs' in the terminal
5. In the VS Code window for the Frontend part, type and run the command 'npm run dev' to start the local server for Vite with React. You should see this in your terminal:
![terminal after npm run dev (frontend)](/screenshots-readme/npm-run-dev-frontend.png?raw=true "terminal after npm run dev (frontend)")
6. Copy the 'http://localhost:5173/' URL address and paste it in the address bar of your internet browser. You should see the BookWorm's Login page appear.

## How to Use the Project
* After backend server has been run, and the frontend server has been started by pasting 'http://localhost:5173/' URL address in the address bar in the browser, you should see the Login page interface:
![Login page](/screenshots-readme/login.png?raw=true "Login page")
Here enter your email address and password if your account exists, if not create a new account by clicking 'Register', which will open Register page:
![Register page](/screenshots-readme/register.png?raw=true "Register page")
Make sure to enter username that is unique (is not already used by another user), and email address that has a valid email form. Also, passwords need to match.
* Once logged in, you will see the Home Page for searching book records from Google Books database. You can search by title, author, or ISBN of the book, and once the desired search phrase or value has been entered, click the Search button and you should see a list of records from Google Books like the one below:
![Search Books List](/screenshots-readme/home-page-list.png?raw=true "Home page")
* Find a book record whose text you want to read, and click on Read Now button in top right corner. Your interface should change into this:
![Embedded Viewer](/screenshots-readme/read-now-embedded.png?raw=true "Embedded Viewer window")
This is an Embedded Viewer from Google Books that lets you scroll up/down, zoom in/out and read the text you selected in its entirety.
* On the Search Books (Home) page, you can also add each book record into one of three special categories: Favorites, Finished Reading, and Wishlist. By clicking on any of the three buttons corresponding to these categories, the selected book will be placed into that particular category on the My Books page. Clicking on Favorite for some book will return this message:
![Favorite](/screenshots-readme/favorite.png?raw=true "Favoriting a book")
* To see lists of favorites, read books, and reading wishlist, navigate to My Books by clicking My Books button in the navigation bar at the top. You should now be taken to the My Books page:
![My Books](/screenshots-readme/my-books.png?raw=true "My Books page")
As you can see, three categories of books are shown in scrollable lists, and it is possible to remove books from each category by clicking on the trash icon in top right corner of each record. Removing a book will show this message:
![Book Deleted](/screenshots-readme/my-books-delete.png?raw=true "Book deleted on My Books")
* User can see their account information by clicking on My Profile button, which navigates to My Profile page shown below:
![My Profile](/screenshots-readme/my-profile.png?raw=true "My Profile page")
* To update account data, enter a valid value to the right of an attribute you want to change, and then click on Update. This will return the 'User successfully updated.' message:
![User Updated](/screenshots-readme/user-updated.png?raw=true "User Updated message")
* To Sign Out of BookWorm, click on Sign Out on the right side of the navigation bar at the top. This action will safely log you out of the application.

## Documentation
* The Demo Recording of the project can be found [here](https://drive.google.com/file/d/1DeE8MDEi9lq2i-ZW6j3mNCQl4SlSkJbm/view?usp=sharing) 
* The repository of the Backend part of the project can be found [here](https://github.com/kristijanH1998/bookworm-backend.git)
* Developer log for this project can be found [here](https://docs.google.com/document/d/1ieDdM0txky0wxEZ3w_PPIUdPI_pAFzgeKAzslnP2bsw/edit?usp=sharing)
* The Wireframes I made in Figma for this project can be found by clicking on [this link](https://www.figma.com/design/HyaA7HkQP4oVYABsiWcimn/BookWorm-Wireframe?node-id=0-1&t=0i8CE6GfiTgFVYkF-1)
* Functional Design Outline for BookWorm: [link](https://docs.google.com/document/d/1XoP50WMfJ7WNict0mYizXaeUk4Cqgh8SxsYhh9SBCIw/edit?usp=sharing)
* More screenshots of BookWorm can be seen on my [portfolio website](https://kristijanh1998.github.io/bookworm.html)