# Album Review Website

## How does it work?

This is a music review website which allows the user to find and view reviews as well as search through music and find something to review themselves. You have to be logged in to review however. Here is a link to the website that i deployed on heroku: https://album-review-website.herokuapp.com/

## How does the code work?

The framework Nextjs is used in this website with a database in mongodb. It has some of it written in typescript as well. I used the api functionality in nextjs to create apis which is how the front end converses with the database. I also have fetch from an api from a different website which allows the user to search up wahtever music they want. The api links are different for development and production. It has a database with a schema defined in the lib folder which basically stores reviews. The pictures seen on this website are actually just urls to webpages as i am hosting this website on heroku and heroku will not store picture files. The navigation bar is a component. 

To build this website please write 

``` 
  yarn build
  
```

and to run please write

```
  yarn dev 
  
```

or 

```
  npm run dev
```

Here is a link to the heroku deployed version of website: https://album-review-website.herokuapp.com/
