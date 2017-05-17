# Ticketmaster Innovations website

This is a Github Pages repo for the Ticketmaster Innovations website.

## To get started:

1. Clone the repo
2. `cd` to the project directory
3. Run `bundle install`
4. Run `npm install`

## To run the server locally:

1. Run `gulp watch`
2. In a separate shell, run `bundle exec jekyll serve`

## To do

* Add build script for production
* Consolidate dev script to a single command
* Slim down the dev stack (remove Bower?)
* Add instructions for deploying

## Development stack

* **[Bundler](http://bundler.io/)** for the [GitHub Pages](https://github.com/github/pages-gem) gem and its dependencies (including [Jekyll](https://jekyllrb.com/))
* **[npm](https://www.npmjs.com/)** for Gulp and Bower
* **[Gulp](http://gulpjs.com/)** for running tasks (minifying, building SCSS files, etc.)
* **[Bower](https://bower.io/)** for managing the [Foundation](http://foundation.zurb.com/) framework and its dependencies
