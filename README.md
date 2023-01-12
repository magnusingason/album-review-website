# Album Review Website

## How does it work?

This website allows users to view and create different reviews for different websites. It also has a search function so users can search different albums.

## How does the code work?

The framework Nextjs is used in this website with a database in mongodb. It has some of it written in typescript as well. I used the api functionality in nextjs to create apis which is how the front end converses with the database. The api links are different for development and production. It has a database with a schema defined in the lib folder which basically stores reviews. The pictures seen on this website are actually just urls to webpages as i am hosting this website on heroku and heroku will not store picture files. The navigation bar is a component. 
As this is a recent website, I have yet to put in functionality in the css so it will look good on mobile so please open this website only on pc.

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
