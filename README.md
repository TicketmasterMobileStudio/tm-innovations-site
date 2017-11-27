# Ticketmaster Innovation website

This is a GitHub Pages repo for the Ticketmaster Innovation website. 

## Requirements

- [Bundler](http://bundler.io/) (`gem install bundler`)
- [npm](https://www.npmjs.com/) (If you have [Homebrew](https://brew.sh/), you can `brew install node`)

## Get started

1. Clone the repo
2. `cd` to the project directory
3. Run `bundle install`
4. Run `npm install`
5. Run `bower install`

## Run the server locally

1. Run `npm start` (or `gulp serve`)

## Build for production and deploy

1. `npm run build` (or `gulp`)
2. Commit any new files that appear in `assets/`
3. Merge your changes to `master` (you were working on a dev branch, right?)

## To do

* Slim down the dev stack (remove Bower?)

## Development stack

* **[Bundler](http://bundler.io/)** for the [GitHub Pages](https://github.com/github/pages-gem) gem and its dependencies (including [Jekyll](https://jekyllrb.com/))
* **[npm](https://www.npmjs.com/)** for Gulp, Bower, and other dev tools
* **[Gulp](http://gulpjs.com/)** for running tasks (minifying, building SCSS files, etc.)
* **[Bower](https://bower.io/)** for managing the [Foundation](http://foundation.zurb.com/) framework and other dependencies
