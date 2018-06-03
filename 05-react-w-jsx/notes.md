# Chapter 6: React with JSX

### Note taking in Jupyter Notebook
Yup. Trying to get Jupyter notebook to work with this is proving to be a massive pain in the ass. Vanilla stuff it is.

HOWEVER, I learned that if like installing NPM packages globally for the ease-of-use, but fucking **hate** dealing with permissions issues, you can set the <code>prefix</code> value to manually specify where packages installed with the <code>-g</code> will go.

For example, suppose your username is "Waffles". If you want all your codey bits to wind up in your <code>~/.local/</code> directory, you would run this command (assuming npm itself is installed in <code>/usr/bin/</code>, making it root-only):

    sudo npm config set prefix /home/waffles/.local

...and *voila*! Now, every NPM package installed with a <code>-g</code> flag will wind up in <code>~/.local/npm_modules/</code>. As long as <code>/home/waffles/.local/</code> is in the <code>PATH</code>, you should be good to go.

## Carry on!
I bet it would have been super useful for the earlier sections, though. :-/

Ok. So Babel is a transpiler that converts JSX (and other fancy-dan ES6 and ES7 syntax) into regular Javascript that browsers can read. I already sort of knew that. HOWEVER, I've only ever used it as part of a developer toolchain, not as a browser script tag. This will be a learning experience!
- Ok, I just need to mark script with 'type="text/babel"' and it automatically gets run through unbabelizer
- huh. Apparently Babel dropped support for in-browser transpiling with version 6.x. You have to use version 5.8 for the examples in this chapter to work.

## Webpack
Webpack occupies the same space as Browserify, Gulp, and Grunt. It is designed to bundle everything up into CommonJS modules (mentioned in Chapter 2).

It's billed as a 'module bundler'. This means it takes all of our different files (e.g. JS, LESS, Sass, CSS, JSX, ES6, etc) and turns them into a single file. This improves both the modularity of our code, and the network performance.

Webpack can also handle:
- Code Splitting
    - Splits code up into different chunks that can be loaded as needed. Chunks are sometimes called 'rollups' or 'layers'.
- Minification
    - Removes whitespace, line breaks, lengthy variable names, and any other bits of code that enhance readability for hoomans but serve no purpose to the machine. Minification helps reduce the final file size of our bundle, which improves network performance and load time.
- Feature Flagging
    - Sends code to one or more - but not all - environments when testing features.
- Hot Module Replacement (HMR)
    - Watches for changes in source code; changes only the updated modules immediately.

### Webpack Loaders
"A loader is a function that handles the transformations that we want to put our code through during the build process." Sounds kind of like a middleware handler in express, honestly. Ah, but it looks like they correspond to the particular language being transpiled (i.e. coffeescript, ES6, JSX, etc). Necessary loaders are specified in the *webpack.config.js* file, and, as one might guess, the most common use cases for loaders is transpiling from one 'dialect' into another.

Another popular category is *styling*. For example, the css-loader looks for .scss files and compiles them to CSS. It actually goes one further: css-loader will go ahead and bundle those suckers up *as javascript*, so there's no need for a link element with stylesheets in it!

### Recipes App with a Webpack Build
Incorporating Webpack (or another, similar build tool) into your project brings with it the following benefits:
- Modularity
    - Using the CommonJS module pattern makes source code more approachable. It also gives development teams an easy way to work on separate files that will be statically combined into a single file before being sent to production.
- Composing
    - Modules allow us to build small, simple, reusable React components that are efficiently composed into applications. Smaller components are also easier to comprehend, test, reuse, and replace down the line.
- Speed
    - One .js file to load -> one HTTP request -> less latency -> MO FASTUH MO BETTUH
- Consistency
    - We can use whatever the heck bleeding edge JS ESNext syntax we want, and Babel will handle making browsers understand it. The caveat here is that Babel has to have a loader written to do that, first, but chances are good that we won't have to wait long.

### Breaking Components into Modules
... some time later ...

Ok, so I've gone through the exercise of breaking everything down into separate components in separate files. Everything makes sense to me, *except* for using the spread operator to send things like <code>{...recipe}</code> in the <code>Menu</code> component or <code>{...ingredient}</code> in the <code>IngredientsList</code> component. If we're already using destructuring in the child components, why do we need to use the spread operator in the parent? Isn't the whole point of destructuring that we can just pass the entire honkin' object in and break it out at the child level?

I'll have to play with that once I get the webpack bundler up and running.

Some points of confusion I might want to touch on if I do a blarg pwost about this later: the different syntax in import statements (i.e. '<code>react</code>' and '<code>react-dom</code>' vs <code>'./components/Menu'</code> and './data/data', "<code>import React from 'react'</code>" vs "<code>import { render } from 'react-dom'</code>", etc).

When importing React to the index.js file, it helps to set <code>window.React = React</code>. This exposes React globally, meaning that all calls to <code>React.createElement</code> are assured to work.

Here's the list of babel loaders the book wanted me to install. It might be worth it to go through them and make a note of specifically what each one is designed to do:
- babel-core (I imagine this is the base Babel package)
- babel-loader
- babel-preset-env (This one the shorthand version for the loaders for ES2015, ES2016, and ES2017)
- babel-preset-react
- babel-preset-stage-0 (???)

Also, I just noticed this: the book recommends installing webpack globally, and not in your local project directory. This means it won't wind up in your <code>package.json</code> file, which means it won't be installed when someone clones your project, which means that *the book is assuming that if you are doing web development, you already have webpack or a similar bundler installed on your machine*. I suppose the other reason could be that the book doesn't want to make assumptions about *which* bundler a given developer is using (Gulp, Browserify, etc are still out there), but eh.

### Webpack Configuration
We need to specifically tell webpack how to bundle our source code into a single file. This is done through webpack's configuration file, *webpack.config.js*.

For our project, we're aiming both to transpile JSX to pure React elements and to convert ES6 syntax (such as our '<code>import</code>' statements) to ES5 syntax, so our build process will initially have three steps:
- JSX to React Elements
- Replace ES6 with ES5
- Export to a single file

It doesn't look like webpack.config.js is automatically creattificated, but it will have to live at the Project's root folder (right next to the '<code>index.js</code>' file).
- The webpack.config *entry* point tells it where to start building the dependency tree. In other words, this is our top level js module.
- *output* tells webpack where to put our final, single, js bundle. first we give it the path to write to (<code>path:</code>), and then we tell it what the filename will be (<code>filename:</code>)
- Finally, we tell webpack which loaders to run on specific files.
    - It uses regex (*gag*) to match on filenames and pass to the right loader
    - Ifn's yur gonna play with elm, might wanna take a closer gander at this'yur spesifikator...

DANGER: webpack now requires that the <code>path</code> value be an *absolute path*! You can solve this by doing the following in your <code>webpack.config.js</code> file:

    const path = require('path'); // import node's path module

    module.exports = {
        ...
        output: {
            path: path.resolve(__dirname, "dist"),
            ...
        }
        ...
    }

DANGER: It looks like the <code>loader:</code> value can't be an array if you are going to use <code>query:</code> (or its equivalent, <code>options:</code>).

DANGER: Make sure to set the <code>mode:</code> key in your config file! It can take one of three options: <code>none</code>, <code>development</code>, or <code>production</code>. Using 'none' seems to be easiest, since the other two come with defaults that it trys to load as well.

DANGER: webpack turns this into a compilation process so it takes all the fucking fun out of web development. :-/

### Source Mapping
*As you've now discovered*, putting all the JS into a single file makes debugging SUPER fun. -_-  Source mapping is a way to help make this less of a fucktastic shitstorm.

To do it, we need to add a few lines to our <code>webpack.config.js</code> file:
- in the "<code>output:</code>" object, add <code>sourceMapFilename: 'bundle.map'</code>
- at the top level of the object (the book lists it right after <code>output</code>), add <code>devtool: '#source-map',</code>.

So what does this junk actually do? Well, <code>'#source-map'</code> tells webpack to actually use source mapping in the first place. This is what requires the <code>sourceMapFilename</code> to be specified, which is what is loaded into the *browser's* developer tools under a folder called <code>webpack://</code>. This will let us debug from our *source files*, rather than the bundle.js file that's actually loaded. Crazy. Let's try it. (**Note:** The book says to look under the "Sources" tab in developer tools, but in Firefox it's the "Debugger" tab. That actually kind of makes more sense, considering debugging is our ultimate goal.)

Once you have access to that junk in the devtools, regular debugger rules apply. You can click a line to set a breakpoint, and refreshing the browser will pause the JS processing when the breakpoints are hit. You can also inspect scoped variables in the "Scope" panel or watch variables by adding them to the "Watch" panel.

### Optimizing the bundle
The bundle isn't uglified or minified or anything, so any further pruning we can do to that particular file will significantly improve load times and network latency.

Webpack has a built-in plugin that does that... but it has to be installed locally for us to use it (WHYYYYYYYYYY DID WE INSTALL IT GLOBALLY THEN FUUUUUUUU-).

Once we do, we have to add a new section to the top level of our <code>webpack.config.js</code> file called "<code>plugins</code>". It will look like this:

    ...,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: true
        })
    ],
    ...

The local installation is required because we need to "<code>require</code>" webpack so we can reference it directly.

"Mangling" will reduce variable names like "recipes" or "ingredients" to a single letter, which is why we'll need the source map to do any serious debugging (probably a good idea to nix it in production, though). Setting "Warnings" to <code>false</code> will remove any console warnings from the exported bundle.

LOL JUST KIDDING. You can't use the plugin like that as of webpack v4.x. UglifyJs is now included in webpack itself. If you want to minify your stuff now, run webpack with the <code>--optimize-minimize</code> flag instead. Except this doesn't seem to be working for me, soooooo... :-/

LOL DOUBLE JUST KIDDING. The only way I've been able to get this to work properly is to set the <code>mode</code> value to "production", which is bullshit. I don't know what other defaults are firing when I do that. But everything seems to work as described, and the size of <code>bundle.js</code> is reduced from 684 KB to 103 KB (!!!), so I guess that's the ticket.

You know, if we can use tools like <code>source-map</code> to view our source in the browser and debug and stuff, I don't know why a developer would ever *not* use <code>production</code> mode with webpack. The gains in file size are monstrous, and it affects debugging not at all.

### Bundling CSS
Webpack can bundle up CSS files, too! As metioned above, this means that your users will ultimately download only a single file that contains both all of your app's javascript code *and* all of the CSS!

in order for it to do this, you have to import your stylesheets into your components as well. Since they are not javascript files and js import statements assume a '.js' file extension by default, you will have to add that to the import statement. For example...

    import '../../stylesheets/Menu.css'

That could import the stylesheet associated with the Menu component, depending on your project directory structure.

In addition, you'll also need to install some css-specific loaders:

    npm install style-loader css-loader postcss-loader --save-dev

Finally, you have to add it to your webpack config file by adding another <code>rule</code> object in the <code>rules</code> array like this:

    {
        test: /\.css$/,
        use: ['style-loader','css-loader', {
            loader: 'postcss-loader',
            options: {
                plugins: () => [require('autoprefixer')]
            }}]
    }

...Given our trials and tribulations from the last section, though, it may be worth it to test that out a bit and figure out whether or not that really works for serious. :-/

### create-react-app
I know you're already familiar with this little feller, but it's probably worth it to jot some notes nonetheless. Create-react-app is a command-line tools that generates the scaffolding for a react project. It was inspired by the Ember CLI project, and automatically installs a lot of useful tools like Babel, ESLint, etc so the developer can focus on building their SUPER AWESOME WORLD-CHANGING APPERLIKASHUNS.

Once you have it installed globally (which I already do), you can use it by just calling it's name and provding the name of the project directory you'd like it to create (make sure you're in an appropriate parent directory for your project first).

    create-react-app <name-of-project>

This creates a React project there with just three dependencies: React, ReactDOM, and react-scripts. React-scripts is a Facebook invention that automatically installs Babel, ESLint, webpack, and other useful toolchain items. It also automatically creates a <code>src/</code> folder with an <code>App.js</code> file in it, which will serve as the root component for your project.

You also get a development server as part of the package. just run <code>npm start</code> or <code>yarn start</code> to get your app served up on <code>localhost</code> on port 3000.

Tests are run with <code>npm test</code> (or <code>yarn test</code>). This will run all of the test files in an interactive mode.

You can also run <code>npm/yarn build</code> to get a production-ready bundle for your project.